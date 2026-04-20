export default function Navbar(){
    return (<nav className="w-full px-20 py-3 flex items-center bg-white text-black/80 backdrop-blur-md shadow-sm">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">4Stack </h1>

          <div className="flex gap-6 text-sm font-medium mx-auto">
            <a href="#">Deals</a>
            <a href="#">Compare Products</a>
            <a href="#">Deals Under</a>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm hover:text-red-500 transition bg-blue-500 text-white rounded-full">
              Login/Sign Up
            </button>
          </div>
        </nav>
    );
}