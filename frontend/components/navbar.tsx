import React from 'react';

export default function Navbar() {
  return (
    <nav className="h-16 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl leading-none">4</span>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">Stack</span>
        </div>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Hot Drops</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Insights</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Price Alerts</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Book Ride</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Scan It</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">More</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-400 hover:text-white hidden sm:block transition-colors">Log in</button>
          <button className="text-sm font-medium bg-white text-gray-900 px-5 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
