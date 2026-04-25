"""
Product scraping utilities for 4Stack.

This module is intentionally self-contained and uses only the Python
standard library so it can run without extra dependencies.

What it can do:
- Search DuckDuckGo's HTML results page for a product query
- Visit result pages and extract likely product title / price / description
- Return structured product data for downstream use

It is not tied to the Next.js frontend yet. You can call it from:
- a Python backend
- a script
- a future API route

Example:
    python scraper.py "wireless mouse" --limit 5
"""

from __future__ import annotations

import argparse
import dataclasses
import html
import json
import re
import sys
import time
from dataclasses import dataclass
from html.parser import HTMLParser
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import quote_plus, urljoin, urlparse
from urllib.request import Request, urlopen


USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)
DEFAULT_TIMEOUT_SECONDS = 15
DEFAULT_LIMIT = 5
DEFAULT_DELAY_SECONDS = 0.7
MAX_PAGE_BYTES = 1_500_000

PRICE_PATTERNS = [
    re.compile(r"(?:₹|INR)\s?([\d,]+(?:\.\d{1,2})?)"),
    re.compile(r"\$([\d,]+(?:\.\d{1,2})?)"),
    re.compile(r"€\s?([\d,]+(?:\.\d{1,2})?)"),
    re.compile(r"£\s?([\d,]+(?:\.\d{1,2})?)"),
]

TITLE_HINTS = (
    "product",
    "title",
    "name",
    "item",
)

DESCRIPTION_HINTS = (
    "description",
    "summary",
    "details",
    "product description",
)


@dataclass(slots=True)
class SearchResult:
    title: str
    url: str
    snippet: str = ""


@dataclass(slots=True)
class ProductListing:
    query: str
    title: str
    url: str
    price: str | None
    currency: str | None
    description: str
    source: str
    fetched_at: str


class DuckDuckGoSearchParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.results: list[SearchResult] = []
        self._in_result = False
        self._capture_title = False
        self._capture_snippet = False
        self._current_link = ""
        self._current_title_parts: list[str] = []
        self._current_snippet_parts: list[str] = []
        self._current_result_id = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        css_class = attr_map.get("class", "") or ""
        href = attr_map.get("href", "") or ""
        element_id = attr_map.get("id", "") or ""

        if tag == "article" and "result" in css_class:
            self._in_result = True
            self._current_link = ""
            self._current_title_parts = []
            self._current_snippet_parts = []
            self._current_result_id = element_id

        if not self._in_result:
            return

        if tag == "a" and href and "result__a" in css_class:
            self._capture_title = True
            self._current_link = href

        if tag in {"div", "span"} and (
            "result__snippet" in css_class
            or "result__snippet" in element_id
            or "snippet" in css_class
        ):
            self._capture_snippet = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "article" and self._in_result:
            title = _clean_text("".join(self._current_title_parts))
            snippet = _clean_text("".join(self._current_snippet_parts))
            if title and self._current_link:
                self.results.append(
                    SearchResult(
                        title=title,
                        url=self._current_link,
                        snippet=snippet,
                    )
                )
            self._in_result = False
            self._capture_title = False
            self._capture_snippet = False
            self._current_link = ""
            self._current_title_parts = []
            self._current_snippet_parts = []
            self._current_result_id = ""
            return

        if tag == "a":
            self._capture_title = False
        if tag in {"div", "span"}:
            self._capture_snippet = False

    def handle_data(self, data: str) -> None:
        if self._capture_title:
            self._current_title_parts.append(data)
        if self._capture_snippet:
            self._current_snippet_parts.append(data)


class HtmlMetaParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.meta: dict[str, str] = {}
        self.title_text_parts: list[str] = []
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)

        if tag == "meta":
            key = attr_map.get("property") or attr_map.get("name")
            value = attr_map.get("content")
            if key and value and key not in self.meta:
                self.meta[key.strip().lower()] = value.strip()

        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_text_parts.append(data)

    @property
    def title(self) -> str:
        return _clean_text("".join(self.title_text_parts))


def _clean_text(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def _request(url: str, timeout: int = DEFAULT_TIMEOUT_SECONDS) -> str:
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept-Language": "en-US,en;q=0.9"})
    with urlopen(req, timeout=timeout) as response:
        body = response.read(MAX_PAGE_BYTES)
    return body.decode("utf-8", errors="replace")


def search_duckduckgo(query: str, limit: int = DEFAULT_LIMIT) -> list[SearchResult]:
    url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
    try:
        html_text = _request(url)
    except (HTTPError, URLError, TimeoutError):
        return []

    parser = DuckDuckGoSearchParser()
    parser.feed(html_text)
    results: list[SearchResult] = []
    seen_urls: set[str] = set()

    for result in parser.results:
        normalized = result.url.strip()
        if normalized in seen_urls:
            continue
        seen_urls.add(normalized)
        results.append(
            SearchResult(
                title=_clean_text(result.title),
                url=normalized,
                snippet=_clean_text(result.snippet),
            )
        )
        if len(results) >= limit:
            break

    return results


def _extract_json_ld_objects(parser: HtmlMetaParser, html_text: str) -> list[dict]:
    objects: list[dict] = []
    scripts = re.findall(
        r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>",
        html_text,
        flags=re.IGNORECASE | re.DOTALL,
    )
    for raw_script in scripts:
        raw_script = raw_script.strip()
        if not raw_script:
            continue
        try:
            loaded = json.loads(raw_script)
        except json.JSONDecodeError:
            continue

        if isinstance(loaded, dict):
            objects.append(loaded)
        elif isinstance(loaded, list):
            objects.extend(item for item in loaded if isinstance(item, dict))
    return objects


def _guess_currency_from_price(price_text: str | None) -> str | None:
    if not price_text:
        return None
    if "₹" in price_text or "INR" in price_text.upper():
        return "INR"
    if "$" in price_text:
        return "USD"
    if "€" in price_text:
        return "EUR"
    if "£" in price_text:
        return "GBP"
    return None


def _extract_price_from_text(text: str) -> tuple[str | None, str | None]:
    for pattern in PRICE_PATTERNS:
        match = pattern.search(text)
        if match:
            price = match.group(1)
            currency = _guess_currency_from_price(match.group(0))
            return price, currency
    return None, None


def _is_likely_product_page(meta: HtmlMetaParser, html_text: str, url: str) -> bool:
    candidates = [
        meta.meta.get("og:type", ""),
        meta.meta.get("product:price:amount", ""),
        meta.meta.get("twitter:data1", ""),
        meta.title,
        url,
    ]
    lower_blob = " ".join(candidates).lower()
    if any(hint in lower_blob for hint in TITLE_HINTS):
        return True
    if "product" in html_text.lower():
        return True
    return False


def scrape_product_page(url: str, query: str = "") -> ProductListing | None:
    try:
        html_text = _request(url)
    except (HTTPError, URLError, TimeoutError):
        return None

    parser = HtmlMetaParser()
    parser.feed(html_text)

    meta = parser.meta
    page_title = parser.title or meta.get("og:title") or meta.get("twitter:title") or ""
    description = (
        meta.get("og:description")
        or meta.get("description")
        or meta.get("twitter:description")
        or ""
    )

    json_ld_objects = _extract_json_ld_objects(parser, html_text)
    price: str | None = None
    currency: str | None = None

    for obj in json_ld_objects:
        obj_type = obj.get("@type")
        if isinstance(obj_type, list):
            obj_type = " ".join(str(item) for item in obj_type)
        type_text = str(obj_type or "").lower()

        if "product" in type_text:
            offers = obj.get("offers")
            if isinstance(offers, dict):
                price = str(offers.get("price") or offers.get("lowPrice") or "").strip() or None
                currency = str(offers.get("priceCurrency") or "").strip() or None
            elif isinstance(offers, list):
                for offer in offers:
                    if not isinstance(offer, dict):
                        continue
                    price = str(offer.get("price") or offer.get("lowPrice") or "").strip() or None
                    currency = str(offer.get("priceCurrency") or "").strip() or None
                    if price:
                        break

            if not page_title:
                name = obj.get("name")
                if isinstance(name, str):
                    page_title = name.strip()

            if not description:
                desc = obj.get("description")
                if isinstance(desc, str):
                    description = desc.strip()

            if price:
                break

    if not price:
        text_price, text_currency = _extract_price_from_text(
            " ".join([page_title, description, html_text[:50000]])
        )
        price = text_price
        currency = text_currency

    if not page_title:
        page_title = urlparse(url).netloc or url

    if not description:
        description = "No description found."

    if query and query.lower() not in page_title.lower():
        if query.lower() in description.lower():
            pass

    source = urlparse(url).netloc or url
    fetched_at = time.strftime("%Y-%m-%dT%H:%M:%S%z")

    if not _is_likely_product_page(parser, html_text, url) and not price:
        return None

    return ProductListing(
        query=query,
        title=_clean_text(page_title),
        url=url,
        price=price,
        currency=currency,
        description=_clean_text(description),
        source=source,
        fetched_at=fetched_at,
    )


def scrape_products(query: str, limit: int = DEFAULT_LIMIT, delay_seconds: float = DEFAULT_DELAY_SECONDS) -> list[ProductListing]:
    search_results = search_duckduckgo(query, limit=max(limit * 3, limit))
    listings: list[ProductListing] = []
    seen_titles: set[str] = set()
    seen_domains: set[str] = set()

    for search_result in search_results:
        listing = scrape_product_page(search_result.url, query=query)
        if listing is None:
            continue

        title_key = listing.title.lower().strip()
        domain_key = listing.source.lower().strip()

        if title_key in seen_titles:
            continue
        if domain_key in seen_domains:
            continue

        seen_titles.add(title_key)
        seen_domains.add(domain_key)
        listings.append(listing)

        if len(listings) >= limit:
            break

        if delay_seconds > 0:
            time.sleep(delay_seconds)

    return listings


def to_dict(listing: ProductListing) -> dict[str, str | None]:
    return dataclasses.asdict(listing)


def print_results(listings: Iterable[ProductListing]) -> None:
    for idx, listing in enumerate(listings, start=1):
        print(f"{idx}. {listing.title}")
        print(f"   Source   : {listing.source}")
        print(f"   URL      : {listing.url}")
        print(f"   Price    : {listing.currency + ' ' if listing.currency else ''}{listing.price or 'N/A'}")
        print(f"   Desc     : {listing.description}")
        print(f"   Fetched  : {listing.fetched_at}")
        print()


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Scrape product results for 4Stack.")
    parser.add_argument("query", help="Product search query, e.g. 'wireless mouse'")
    parser.add_argument("--limit", type=int, default=DEFAULT_LIMIT, help="Maximum product listings to return")
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print the results as JSON instead of a human-readable list",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    if args.limit < 1:
        parser.error("--limit must be at least 1")

    listings = scrape_products(args.query, limit=args.limit)

    if args.json:
        print(json.dumps([to_dict(item) for item in listings], indent=2))
    else:
        if not listings:
            print("No product listings found.")
            return 0
        print_results(listings)

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
