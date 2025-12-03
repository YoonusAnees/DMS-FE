import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-100 transition"
        >
          Anything Sri Lanka
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/request"
            className="hover:text-blue-100 transition font-medium"
          >
            Request Goods
          </Link>

          {token ? (
            <>
              <Link
                to="/adminDasboard"
                className="hover:text-blue-100 transition font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Burger Icon */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-blue-700/50 backdrop-blur-lg">

          <Link
            to="/request"
            onClick={() => setIsOpen(false)}
            className="block font-medium hover:text-blue-200 transition"
          >
            Request Goods
          </Link>

          {token ? (
            <>
              <Link
                to="/adminDasboard"
                onClick={() => setIsOpen(false)}
                className="block font-medium hover:text-blue-200 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold"
              >
                Dashboard
              </Link>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
