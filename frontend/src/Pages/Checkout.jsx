import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart count after checkout
    localStorage.removeItem("cartCount");

    // Optionally reset or clear cart data in DB here via API call
    // Example: await axios.post(`http://localhost:5000/order/clear`, { userId })
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for shopping with us. Your order is being processed.
      </p>
      <button
        onClick={() => navigate('/shop')}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </section>
  );
};

export default CheckoutSuccess;
