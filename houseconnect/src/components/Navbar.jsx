import { Menu, X, Home, Briefcase, Users, Info, Phone } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold text-lg">
            HC
          </div>

          <div>
            <h1 className="font-bold text-xl text-green-700">
              HouseConnect
            </h1>
            <p className="text-xs text-gray-500">
              Kenya
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <li className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <Home size={18} />
            Home
          </li>

          <li className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <Briefcase size={18} />
            Find Jobs
          </li>

          <li className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <Users size={18} />
            House Helps
          </li>

          <li className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <Info size={18} />
            About
          </li>

          <li className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <Phone size={18} />
            Contact
          </li>

        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">

          <button className="px-5 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 transition">
            Login
          </button>

          <button className="px-5 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition">
            Register
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">

          <ul className="flex flex-col p-6 gap-6">

            <li>Home</li>
            <li>Find Jobs</li>
            <li>House Helps</li>
            <li>About</li>
            <li>Contact</li>

            <button className="border border-green-700 rounded-lg py-2 text-green-700">
              Login
            </button>

            <button className="bg-green-700 rounded-lg py-2 text-white">
              Register
            </button>

          </ul>

        </div>
      )}
    </nav>
  );
};

export default Navbar;