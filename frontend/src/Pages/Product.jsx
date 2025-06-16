import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/get-products");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        alert("Could not load products.");
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!userId) {
      alert("Please login to add to cart.");
      return navigate("/login");
    }

    try {
      const res = await axios.post("http://localhost:5000/order/add", {
        userId,
        productId,
        quantity: 1,
      });

      alert("Product added to cart!");
      window.location.reload()
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };

  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6">Featured Bouquets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="bg-pink-50 rounded-lg shadow hover:shadow-lg transition p-4">
              <img
                src={item.image || `https://source.unsplash.com/300x300/?flower,bouquet`}
                alt={item.name}
                className="rounded-md w-full h-64 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-pink-600 font-bold">₹{item.price}</p>
              <button
                onClick={() => addToCart(item._id)}
                className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3">No products available.</p>
        )}
      </div>
    </section>
  );
};

export default Product;
