import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      alert("Please login to view your cart.");
      navigate('/login');
      return;
    }

    fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/order/${userId}`);
      
      // Filter out items with missing productId
      const validProducts = res.data.cart.products.filter(item => item.productId);
      const updatedCart = { ...res.data.cart, products: validProducts };

      setCart(updatedCart);

      // Save total item count to localStorage
      const totalCount = validProducts.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", totalCount.toString());
    } catch (err) {
      console.error("Error fetching cart:", err);
      alert("Could not load cart.");
    }
  };

  const updateQuantity = async (productId, delta) => {
    try {
      await axios.post(`http://localhost:5000/order/add`, {
        userId,
        productId,
        quantity: delta,
      });
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.post(`http://localhost:5000/order/remove`, {
        userId,
        productId,
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const getTotalPrice = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((total, item) => {
      return total + (item.productId?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart && cart.products.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cart.products.map((item) => (
              <li
                key={item.productId?._id || item._id}
                className="flex items-center justify-between border p-4 rounded shadow-sm"
              >
                <img
                  src={item.productId?.image || 'https://source.unsplash.com/100x100/?product'}
                  alt={item.productId?.name || 'Product'}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 ml-4 text-left">
                  <h3 className="font-semibold">{item.productId?.name || 'Unnamed Product'}</h3>
                  <p className="text-sm text-gray-600">₹{item.productId?.price || 0}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId?._id, -1)}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId?._id, 1)}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(item.productId?._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6">
            <p className="text-lg font-semibold mb-2">
              Total: ₹{getTotalPrice()}
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </section>
  );
};

export default Cart;
