"use client";
import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDERS = [
  "Enter a product link...",
  "Enter website...",
  "Search by keywords...",
  "Find what you're looking for..."
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      alert(`Searching for: ${query}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative w-full max-w-3xl mx-auto bg-white rounded-full flex items-center p-1.5 sm:p-2 border transition-all duration-300 ${
        isFocused 
          ? 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' 
          : 'border-gray-200 shadow-md hover:shadow-lg'
      }`}
    >
      {/* Magnifying Glass Icon (Leftmost) */}
      <div className="pl-4 sm:pl-5 text-gray-400 shrink-0">
        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Input & Animated Placeholder */}
      <div className="relative flex-1 h-full mx-3 sm:mx-4 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full min-h-[44px] sm:min-h-[52px] bg-transparent text-gray-800 placeholder-transparent outline-none text-base sm:text-lg z-10"
        />
        
        {/* Animated Placeholder Layer */}
        <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            {!query && (
              <motion.span
                key={placeholderIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="text-gray-400 absolute w-full truncate text-base sm:text-lg font-light"
              >
                {PLACEHOLDERS[placeholderIndex]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mic and Search Button (Rightmost) */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 pr-1">
        <button 
          type="button"
          onClick={() => alert("Voice search activated")}
          className="p-2.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50"
          title="Search by voice"
          aria-label="Search by voice"
        >
          <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base shadow-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
}
