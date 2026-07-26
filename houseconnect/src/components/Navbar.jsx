import { Menu, X, Home, Briefcase, Users, Info, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleDashboard = () => {
    setMenuOpen(false);
    if (user && userRole) {
      navigate(`/${userRole}/dashboard`);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <button onClick={() => goTo("/")} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold text-lg">
            HC
          </div>
          <div>
            <h1 className="font-bold text-xl text-green-700">HouseConnect</h1>
            <p className="text-xs text-gray-500">Kenya</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <li>
            <button onClick={() => goTo("/")} className="hover:text-green-700 cursor-pointer flex items-center gap-1">
              <Home size={18} />
              Home
            </button>
          </li>
          <li>
            <button onClick={() => goTo("/worker/jobs")} className="hover:text-green-700 cursor-pointer flex items-center gap-1">
              <Briefcase size={18} />
              Find Jobs
            </button>
          </li>
          <li>
            <button onClick={() => goTo("/employer/find-workers")} className="hover:text-green-700 cursor-pointer flex items-center gap-1">
              <Users size={18} />
              House Helps
            </button>
          </li>
          <li>
            <button onClick={() => goTo("/about")} className="hover:text-green-700 cursor-pointer flex items-center gap-1">
              <Info size={18} />
              About
            </button>
          </li>
          <li>
            <button onClick={() => goTo("/contact")} className="hover:text-green-700 cursor-pointer flex items-center gap-1">
              <Phone size={18} />
              Contact
            </button>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          {user ? (
            <>
              <button
                onClick={handleDashboard}
                className="px-5 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 transition"
              >
                Dashboard
              </button>
              <button
                onClick={signOut}
                className="px-5 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => goTo("/login")}
                className="px-5 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => goTo("/register")}
                className="px-5 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col p-6 gap-6">
            <li><button onClick={() => goTo("/")} className="w-full text-left">Home</button></li>
            <li><button onClick={() => goTo("/worker/jobs")} className="w-full text-left">Find Jobs</button></li>
            <li><button onClick={() => goTo("/employer/find-workers")} className="w-full text-left">House Helps</button></li>
            <li><button onClick={() => goTo("/about")} className="w-full text-left">About</button></li>
            <li><button onClick={() => goTo("/contact")} className="w-full text-left">Contact</button></li>
            {user ? (
              <>
                <button onClick={handleDashboard} className="border border-green-700 rounded-lg py-2 text-green-700 w-full">
                  Dashboard
                </button>
                <button onClick={signOut} className="bg-green-700 rounded-lg py-2 text-white w-full">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => goTo("/login")} className="border border-green-700 rounded-lg py-2 text-green-700 w-full">
                  Login
                </button>
                <button onClick={() => goTo("/register")} className="bg-green-700 rounded-lg py-2 text-white w-full">
                  Register
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
