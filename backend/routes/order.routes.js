// routes/cartRoutes.js
const express = require("express");
const orderRouter = express.Router();
const { addToCart, getCart ,removeFromCart , getCartCount} = require("../controllers/order.controllers");

orderRouter.post("/add", addToCart);
orderRouter.get("/:userId", getCart);
orderRouter.post("/remove", removeFromCart);
orderRouter.get("/count/:userId", getCartCount);
module.exports = orderRouter;
