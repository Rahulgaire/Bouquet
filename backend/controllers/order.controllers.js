// controllers/cartController.js
const Cart = require("../models/order.models");
const Product = require("../models/product.models");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity: quantity || 1 }],
      });
    } else {
      // Update existing cart
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity || 1;
      } else {
        cart.products.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

// ✅ New: Get Cart by userId
const getCart = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
};


// POST /order/remove
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
};


module.exports = { addToCart,getCart ,removeFromCart};
