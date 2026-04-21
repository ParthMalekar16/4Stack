import React from 'react';
import { SearchBar } from "./SearchBar";
//import { SearchBar } from './SearchBar';

export default function Hero() {
  return (
    <section className="w-full min-h-[65vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-white to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-50 z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute -bottom-8 left-[40%] w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-12 mt-[-5vh]">
        {/* Upper Area: Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Discover What You <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Need Instantly</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 font-light leading-relaxed px-4">
            Search across thousands of products, websites, and resources in one centralized place. Find anything in seconds.
          </p>
        </div>

        {/* Below Part: Search Bar */}
        <SearchBar />
        <div className="w-full pt-4 px-2 sm:px-4">
          
        </div>
      </div>
    </section>
  );
}
