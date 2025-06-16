import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from  '../assets/home.webp'
import About from './About';
const Home = () => {
  return (
    <main className="font-serif">

      {/* Hero Section */}
      <section className="bg-pink-100 text-gray-800 py-16 px-4 flex flex-col md:flex-row items-center justify-between md:px-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Fresh Flowers for Every Occasion</h1>
          <p className="text-lg">Delivering love, one bouquet at a time. Choose from a variety of fresh, handpicked flowers.</p>
          <Link to="/shop" className="inline-block bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-md transition duration-300">
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={heroImg}
            alt="Flowers"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

<About/>
      {/* Featured Products */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Bouquets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-pink-50 rounded-lg shadow hover:shadow-lg transition p-4">
              <img
                src={`https://source.unsplash.com/300x300/?flower,bouquet,${item}`}
                alt="Bouquet"
                className="rounded-md w-full h-64 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">Elegant Rose</h3>
              <p className="text-sm text-gray-600 mt-1">Flower</p>
              <p className="text-pink-600 font-bold">₹999</p>
              <button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-pink-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Why Choose Us</h2>
          <p className="text-gray-700">We handpick the freshest flowers and design stunning arrangements that leave a lasting impression. Fast delivery and quality you can trust.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Happy Customers</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-5xl mx-auto">
          {[1, 2].map((item) => (
            <div key={item} className="bg-pink-100 p-6 rounded-lg shadow max-w-sm">
              <p className="italic">"Absolutely loved the bouquet! Arrived fresh and beautifully wrapped."</p>
              <div className="mt-4 font-semibold">– Customer {item}</div>
            </div>
          ))}
        </div>
      </section>

      
    </main>
  );
};

export default Home;
