// routes/cartRoutes.js
const express = require("express");
const orderRouter = express.Router();
const { addToCart, getCart ,removeFromCart} = require("../controllers/order.controllers");

orderRouter.post("/add", addToCart);
orderRouter.get("/:userId", getCart);
orderRouter.post("/remove", removeFromCart);

module.exports = orderRouter;
