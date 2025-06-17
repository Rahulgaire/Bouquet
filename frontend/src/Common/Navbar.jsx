import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      axios
        .get(`http://localhost:5000/order/count/${parsedUser._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setCartCount(res.data.count || 0);
        })
        .catch(() => {
          setCartCount(0);
        });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem('user');
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white text-gray-800 shadow-md font-serif sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger for mobile */}
        <div className="md:hidden text-2xl" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold mx-auto md:mx-0">
          <h1 className="hidden md:block">Bouquet</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/shop" className="hover:text-yellow-400">Product</Link></li>
          <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4 text-xl relative">
          {/* Cart */}
          <Link to='/cart' className="relative">
            <FaShoppingCart className="hover:text-green-600 cursor-pointer text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="ml-2 px-4 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b shadow-md">
          <h1 className="text-2xl font-bold">Bouquet</h1>
          <FaTimes className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
        </div>

        {/* Sidebar Navigation */}
        <ul className="flex flex-col text-lg px-6 pt-6">
          <li><Link to="/" onClick={() => setIsSidebarOpen(false)} className="block px-2 py-2 hover:bg-gray-100">Home</Link></li>
          <li><Link to="/shop" onClick={() => setIsSidebarOpen(false)} className="block px-2 py-2 hover:bg-gray-100">Product</Link></li>
          <li><Link to="/about" onClick={() => setIsSidebarOpen(false)} className="block px-2 py-2 hover:bg-gray-100">About</Link></li>
          <li><Link to="/contact" onClick={() => setIsSidebarOpen(false)} className="block px-2 py-2 hover:bg-gray-100">Contact</Link></li>
        </ul>

        {/* Sidebar Cart and Auth */}
        <div className="flex flex-col px-6 pt-6 gap-4 text-xl">
          <div className="flex gap-4 items-center">
            <Link to='/cart' className="relative">
              <FaShoppingCart className="text-green-600 cursor-pointer text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsSidebarOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded text-sm">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
