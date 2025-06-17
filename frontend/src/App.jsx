import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './Common/Navbar';
import Footer from './Common/Footer';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Product from './Pages/Product';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Dashboard/Dashboard';
import CheckoutSuccess from './Pages/Checkout';
// Sub-component (must be called AFTER BrowserRouter)
const AppRoutes = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuth =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||  location.pathname.startsWith('/cart')

      useEffect(()=>{
        window.scrollTo(0,0)
      })

  return (
    <>
      {!isDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<CheckoutSuccess />} />
      </Routes>

      {!isDashboard && !isAuth && <Footer />}
    </>
  );
};

// ✅ FIXED: useLocation is called AFTER BrowserRouter is mounted
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
