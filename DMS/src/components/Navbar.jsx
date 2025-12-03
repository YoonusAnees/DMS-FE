import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-100 transition">
          Anything Sri Lanka
        </Link>

        <div className="flex items-center space-x-8">
          <Link to="/request" className="hover:text-blue-100 transition font-medium">
            Request Goods
          </Link>

          {token ? (
            <>
              <Link to="/adminDasboard" className="hover:text-blue-100 transition font-medium">
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
               Dasboard  
            </Link>

             <Link
              to="/login"
               className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
            >
               Login  
            </Link>
           
           </>

            
          )
          
          }
        </div>
      </div>
    </nav>
  );
}