import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const dummyUserId = "6660eaf52f5b7e3d1c5fbc33"; // 🔁 Replace with real userId

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/order/${dummyUserId}`);
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
      alert("Could not load cart.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Quantity
  const updateQuantity = async (productId, delta) => {
    try {
      await axios.post(`http://localhost:5000/order/add`, {
        userId: dummyUserId,
        productId,
        quantity: delta
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Delete Product from Cart
  const deleteProduct = async (productId) => {
    try {
      await axios.post(`http://localhost:5000/order/remove`, {
        userId: dummyUserId,
        productId
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart && cart.products.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cart.products.map((item) => (
              <li
                key={item.productId._id}
                className="flex items-center justify-between border p-4 rounded shadow-sm"
              >
                <img
                  src={item.productId.image || 'https://source.unsplash.com/100x100/?product'}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 ml-4 text-left">
                  <h3 className="font-semibold">{item.productId.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.productId.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId._id, -1)}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, 1)}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(item.productId._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
};

export default Cart;
