const express = require('express');
const {
  createProduct,
  getAllProduct,
  deleteAllProduct,
  deleteOneProduct,
  editProduct,
} = require("../controllers/product.controllers.js");
const uploadSingleImage = require('../middlewares/upload.middleware.js');
const productRouter = express.Router();

productRouter.get('/get-products',getAllProduct)
productRouter.post('/add-product',uploadSingleImage('image') ,createProduct)
productRouter.delete('/delete-product',deleteAllProduct)
productRouter.delete('/delete-product/:id',deleteOneProduct)
productRouter.delete('/edit-product/:id',editProduct)


module.exports = productRouter