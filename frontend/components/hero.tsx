"use client";
import { useState } from "react";
import React from 'react';
import { SearchBar } from "./SearchBar";
//import { SearchBar } from './SearchBar';

export default function Hero() {
  const [showProduct, setShowProduct] = useState(false);

  return (
<<<<<<< HEAD
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#261CC1]">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-[#FFFFFF] leading-tight">
        Buy the same products, but for the best prices 
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-lg text-white max-w-xl">
        We will compare the same products across various platforms for you 
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
           onClick={() => setShowProduct(!showProduct)}
           className="px-6 py-3 bg-[#3A9AFF] text-white rounded-full hover:opacity-80 transition"
  >         Get Started
        </button>


        <button className="px-6 py-3 border border-black/20 rounded-full bg-[#3A9AFF] hover:opacity-80 transition">
          Learn More
        </button>
      </div>

    {/* learn more */}
    {showProduct && (
  <div className="mt-10 bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
    
    <img
      src="/phone.jpg"
      alt="product"
      className="rounded-lg shadow-lg w-64"
    />

    <h2 className="text-2xl font-bold mt-4 text-black">
      EK BKL PARTH
    </h2>

    <p className="text-lg text-gray-700">
      VERY MADARCHOD ,CHUTIYA ,HARAMI, PUSSY, GOONER PRO MAX ,SMALL PENIS
    </p>

    <p className="text-xl font-semibold mt-2 text-green-600">
      RS 2 OR 2 KODI BHE CHALEGHA BC
    </p>

  </div>
)}
=======
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
>>>>>>> 8ceae407654cb52cef6663d2aec4606ebe11eb7c
    </section>
  );
}
