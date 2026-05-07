import React from 'react';
import { Star, ShoppingCart, TrendingUp } from 'lucide-react';
import Image from "next/image";

const deals = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    originalPrice: '$399',
    price: '$299',
    discount: '25% OFF',
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1757946718516-fddeb8d3ed9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwc2hvdHxlbnwxfHx8fDE3NzcwMzc0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 'In Stock'
  },
  {
    id: 2,
    name: 'Samsung Galaxy Watch 6 Classic - 43mm Bluetooth',
    originalPrice: '$349',
    price: '$279',
    discount: '20% OFF',
    rating: 4.6,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1771838414303-67b51cb845e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwcHJvZHVjdCUyMHNob3R8ZW58MXx8fHwxNzc3MTI3NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 'Only 3 left'
  },
  {
    id: 3,
    name: 'Keychron Q1 Pro Custom Mechanical Keyboard',
    originalPrice: '$199',
    price: '$159',
    discount: '20% OFF',
    rating: 4.9,
    reviews: 2150,
    image: 'https://images.unsplash.com/photo-1570944887446-890d62d87293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBwcm9kdWN0JTIwc2hvdHxlbnwxfHx8fDE3NzcxMjc0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 'In Stock'
  },
  {
    id: 4,
    name: 'LG 27" UltraFine 4K UHD IPS Monitor',
    originalPrice: '$499',
    price: '$349',
    discount: '30% OFF',
    rating: 4.5,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1604611364011-706e9e1f2573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHw0ayUyMG1vbml0b3IlMjBwcm9kdWN0JTIwc2hvdHxlbnwxfHx8fDE3NzcxMjc0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 'In Stock'
  }
];

export default function HotDeals() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hot Deals
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {deals.map((deal) => (
            <div 
              key={deal.id}
              className="group relative bg-[#141414] rounded-2xl border border-gray-800 p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col"
            >
              {/* Discount Badge */}
              <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {deal.discount}
              </div>

              {/* Image Container */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-[#1a1a1a]">
                <Image 
                  src={deal.image} 
                  alt={deal.name}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-lighten"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-300">{deal.rating}</span>
                  <span className="text-sm text-gray-500">({deal.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold leading-tight mb-3 line-clamp-2">
                  {deal.name}
                </h3>

                {/* Bottom area (Prices & Add to Cart) */}
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through mb-1">
                      {deal.originalPrice}
                    </span>
                    <span className="text-xl font-bold text-white">
                      {deal.price}
                    </span>
                  </div>

                  {/* Add to Cart button - hidden initially, scales in on hover */}
                  <button className="bg-blue-600 text-white p-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-500 shadow-lg shadow-blue-900/50">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
