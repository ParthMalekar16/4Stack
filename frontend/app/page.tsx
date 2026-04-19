"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-200 flex items-center justify-center">
      <div className="text-center space-y-6">
        
        <h1 className="text-5xl font-bold text-black">
          4Stack TypeShi (Name to be changed later)
        </h1>

        <p className="text-5xl font-bold text-black">
          Building something awesome with my team
        </p>

        <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition">
          Get Started
        </button>
        <div className="flex gap-4 justify-center">
  <button className="text-5xl font-bold text-black">
    Learn More
  </button>
</div>

      </div>
    </main>
  );
}