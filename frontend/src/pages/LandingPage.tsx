import { useNavigate } from "react-router-dom";

export    default   function LandingPage() {

const navigate = useNavigate()

  return (
    <div className="bg-[#fefcf9] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold">Medium</h1>
        <div className="space-x-6 flex items-center">
     
          <a href="/signup" className="text-sm font-medium">Write</a>
          <a href="/Signin" className="text-sm font-medium">Sign in</a>
          <button onClick={()=>navigate("/signin")}  className="bg-black text-white text-sm font-medium py-2 px-4 rounded-full">Get started</button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-between px-10 py-20">
        <div className="max-w-xl">
          <h2 className="text-6xl font-serif leading-tight mb-6">
            Human <br /> stories & ideas
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            A place to read, write, and deepen your understanding
          </p>
          <button className="bg-black text-white text-lg py-2 px-6 rounded-full">
            Start reading
          </button>
        </div>
        <div className="relative">
          {/* Replace these with actual images or SVGs */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-48 h-32 bg-green-500"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-10 py-6 text-sm text-gray-500 border-t border-gray-300 flex justify-center space-x-4">
        <a href="#">Help</a>
       
      </footer>
    </div>
  );
}
