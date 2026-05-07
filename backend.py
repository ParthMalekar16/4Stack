from flask import Flask, request, jsonify

app = Flask(__name__)

def get_amazon_price(product):
    return 1500  # dummy value

def get_flipkart_price(product):
    return 1400  # dummy value

@app.route('/compare', methods=['GET'])
def compare_prices():
    product = request.args.get('product')

    prices = {
        "Amazon": get_amazon_price(product),
        "Flipkart": get_flipkart_price(product)
    }

    best = min(prices, key=prices.get)

    return jsonify({
        "product": product,
        "prices": prices,
        "best": {
            "platform": best,
            "price": prices[best]
        }
    })

if __name__ == "__main__":
    app.run(debug=True)
