import React from 'react';
import { SearchBar } from './SearchBar';

export function Hero() {
  return (
    <section className="w-full min-h-[65vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
      {/* Dynamic Dot Grid Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      {/* Modern Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-pink-600/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-12 mt-[-5vh]">
        {/* Upper Area: Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Find the same product <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pay the LOWEST price</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 font-light leading-relaxed px-4">
            We compare prices across multiple platforms so you always get the best deal
          </p>
        </div>

        {/* Below Part: Search Bar */}
        <div className="w-full pt-4 px-2 sm:px-4">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
