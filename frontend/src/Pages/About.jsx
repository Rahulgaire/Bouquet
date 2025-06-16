import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../assets/img3.webp'
const About = () => {
  return (
    <main className="font-serif text-gray-800">
      {/* Hero / Intro Section */}
      <section className="bg-pink-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Bouquet</h1>
        <p className="max-w-2xl mx-auto text-lg">
          At <span className="font-semibold">Bouquet</span>, we believe flowers are not just gifts—they’re emotions wrapped in petals. Whether it's love, celebration, or sympathy, we craft floral stories for every moment.
        </p>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p>
              Our goal is to bring happiness and smiles through premium, handpicked flowers delivered straight to your door. We partner with top growers and local florists to ensure quality, freshness, and unique designs.
            </p>
          </div>
          <img
            src={aboutImg}
            alt="Florist arranging bouquet"
            className="rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-pink-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Freshness Guaranteed</h3>
            <p>We ensure your flowers arrive fresh and vibrant, every time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>Same-day and next-day delivery options available for all major cities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Custom Bouquets</h3>
            <p>Tell us your story and we’ll craft a bouquet just for you.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4">Want to Surprise Someone?</h2>
        <p className="mb-6">Send them love wrapped in a bouquet. Explore our wide range of flowers and gifts.</p>
        <Link to="/shop" className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-md transition">
          Shop Now
        </Link>
      </section>

     
    </main>
  );
};

export default About;
