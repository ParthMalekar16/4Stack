export default function Navbar(){
    return (<nav className="w-full px-8 py-4 flex justify-between items-center bg-white/60 backdrop-blur-md shadow-sm">
          <h1 className="text-xl font-bold">4Stack 🚀</h1>

          <div className="flex gap-6 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </nav>
    );
}