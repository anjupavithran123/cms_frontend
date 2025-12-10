export default function Navbar() {
    return (
      <header className="w-full py-4 bg-black text-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="font-bold text-xl">My Portfolio</h1>
  
          <nav className="space-x-6 text-lg hidden md:flex">
            <a href="#about" className="hover:text-gray-300">About</a>
            <a href="#skills" className="hover:text-gray-300">Skills</a>
            <a href="#projects" className="hover:text-gray-300">Projects</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
          </nav>
        </div>
      </header>
    );
  }
  