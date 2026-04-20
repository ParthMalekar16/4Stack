import { ShoppingCart } from "lucide-react";
export default function Navbar(){
    return (<nav className="w-full px-20 py-3 flex items-center bg-white text-black/80 backdrop-blur-md shadow-sm">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            4Stack </h1>

          <div className="flex gap-3 text-sm font-medium mx-auto ml-10">
            <a href="#">Deals</a>
            <a href="#">Compare Products</a>
            <a href="#">Deals Under</a>
            <a href="#">Shop by Brand</a>
            <a href="#">Today's Deals</a>
            <a href="#">Lowest Prices</a>
            <a href="#">Quick Buy</a>
          </div>

          <div className="flex gap-4">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-purple-500 transition mt-1.5" />
            <button className="px-4 py-2 text-sm hover:text-red-500 transition bg-[#1C0770] text-white rounded-full">
              Login/Sign Up
            </button>
          </div>
        </nav>
    );
}