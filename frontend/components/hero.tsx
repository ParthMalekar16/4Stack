"use client";
import { useState } from "react";

export default function Hero() {
  const [showProduct, setShowProduct] = useState(false);

  return (
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
    </section>
  );
}