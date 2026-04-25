export default function Navbar() {
  return (
    <nav className="h-16 w-full bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl leading-none">S</span>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Searchly</span>
        </div>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Products</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Categories</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">Log in</button>
          <button className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
