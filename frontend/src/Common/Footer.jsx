import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-gray-800 pt-12 pb-6 px-4 sm:px-8 mt-12 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-pink-700 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-pink-600">About</Link></li>
            <li><Link to="/products" className="hover:text-pink-600">Products</Link></li>
            <li><Link to="/reviews" className="hover:text-pink-600">Review</Link></li>
            <li><Link to="/contact" className="hover:text-pink-600">Contact</Link></li>
          </ul>
        </div>

        {/* Extra Links */}
        <div>
          <h3 className="text-lg font-bold text-pink-700 mb-4">Extra Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/account" className="hover:text-pink-600">My Account</Link></li>
            <li><span className="hover:text-pink-600">Locations</span></li>
            <li><span className="hover:text-pink-600">India</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-pink-700 mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-pink-600" /> 1234567890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-pink-600" /> baljinderkaur1230@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-600" /> Ludhiana, India - 141100
            </li>
          </ul>
        </div>

        {/* Branding or Quote */}
        <div>
          <h3 className="text-lg font-bold text-pink-700 mb-4">About Us</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            We create beautiful floral arrangements that brighten every occasion. Let your feelings bloom with us!
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-xs text-gray-600 border-t pt-4">
        Created by <span className="font-medium text-pink-700">Jashanpreet Kaur</span> & <span className="font-medium text-pink-700">Baljinder Kaur</span> | All rights reserved © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
