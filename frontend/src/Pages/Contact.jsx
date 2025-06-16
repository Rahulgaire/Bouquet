import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { PiBuildingOfficeLight } from "react-icons/pi";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/contact/create-contact", form);
      toast.success(data.message || "Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send message.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-10 md:py-16 bg-gradient-to-br from-white to-pink-50 font-serif">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Contact Info Section */}
        <div className="lg:w-1/2 flex flex-col gap-10 bg-white shadow-lg p-8 rounded-xl">
          
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-pink-700">
              <FaPhoneAlt /> Get in Touch
            </h1>
            <p className="text-gray-700 mt-2 leading-relaxed">
              We'd love to hear from you! Whether you’re placing a bouquet order or just want to know more about our flowers, our friendly team is here to help.
            </p>
          </div>
                
          <div>
            <h2 className="flex items-center gap-3 text-xl font-semibold text-pink-700">
              <PiBuildingOfficeLight /> Flower Shop Location
            </h2>
            <p className="text-gray-700 mt-2 leading-relaxed">
              <span className="font-medium">Bouquet Flower Studio</span><br />
              23 Bloom Street, Floral Market<br />
              Ludhiana – 141001, Punjab
            </p>
          </div>
                

          <div>
               
            <h2 className="text-xl font-semibold text-pink-700 mb-3">📱 Phone & Email</h2>
            <p className="flex items-center gap-3 text-gray-700 mb-2">
              <FaPhoneAlt className="text-pink-700" />
              <span className="text-sm sm:text-base">+91 99883 14040</span>
            </p>
            
            <p className="flex items-center gap-3 text-gray-700 text-sm sm:text-base break-words">
              <FaEnvelope className="text-pink-700" />
              <span className="break-words">contact@bouquetflowers.in</span>
            </p>
          </div>

        
        </div>

        {/* Contact Form Section */}
        <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg w-full">
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className="w-full mt-2 rounded-md bg-pink-50 px-4 py-2.5 text-base text-gray-900 shadow-sm outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-pink-500 transition"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full mt-2 rounded-md bg-pink-50 px-4 py-2.5 text-base text-gray-900 shadow-sm outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-pink-500 transition"
                placeholder="Your Email"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-900">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full mt-2 rounded-md bg-pink-50 px-4 py-2.5 text-base text-gray-900 shadow-sm outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-pink-500 transition"
                placeholder="Order, Delivery, Custom Bouquet etc."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="w-full mt-2 rounded-md bg-pink-50 px-4 py-2.5 text-base text-gray-900 shadow-sm outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-pink-500 transition"
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full rounded-md bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 transition border border-transparent hover:border-pink-700"
            >
              {loading ? (
                <>
                  <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending...
                </>
              ) : "Send Message"}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Contact;
