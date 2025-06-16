const Product = require("../models/product.models.js");
const {uploadToCloudinary} = require('../config/cloudinary.js')

//Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "Name, description, and price are required fields.",
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Please upload a product image.",
      });
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    const imageUrl = await uploadToCloudinary(file);
    const newProduct = new Product({
      name,
      description,
      price: priceNumber,
      image: imageUrl || "",
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      message: "Unable to add product",
      error: error.message,
    });
  }
};

//Get All Product
const getAllProduct = async (req,res) => {
    try {
        const newProduct = await Product.find()
        if(newProduct===0){
            return res.status(201).json({
                message:"No Product available",
                data:[]
            })
        }
        res.status(200).json({
            message:"Products Available ",
            data:newProduct
        })
    } catch (error) {
        res.status(500).json({
            message:"Unable to Get Product Data .Oops ! Something went wrong",
            error:error.message
        })
    }
}

//delete All Product
const deleteAllProduct = async (req,res) => {
    try {
        await Product.deleteMany()
        res.status(200).json({
            message:"All Product deleted Successfully" 
        })
    } catch (error) {
        res.status(500).json({
            message:"Error deleting Products",
            error:error.message
        })
    }
}

//delete single product 
const deleteOneProduct = async (req,res) =>{
    try {
        const {id}=req.params
        const products = await Product.findByIdAndDelete(id)
        if (!products) {
            return res.status(404).json({
                message:"No Product Available"
            })
        }
        res.status(200).json({
            message:"Product Deleted Successfully",
            data:products
        })
    } catch (error) {
        res.status(500).json({
            message:"Oops Something went wrong",
            error:error.message
        })
    }
}

//Update products 
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, description, price } = req.body;
    if (!name || !description || !price ) {
      return res.status(400).json({ message: "All fields are required" });
    }
        let imageUrl = product.image
    if (req.file) {
       imageUrl = await uploadToCloudinary(req.file);
    }
    const existingProduct = await Product.findByIdAndUpdate(
       id ,
      { name, description, price, image:imageUrl },
      { new: true }
    );
    
    res.status(200).json({
      message: "Product Updated successfully",
      data: existingProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update products",
      error: error.message,
    });
  }
};

module.exports = {createProduct,getAllProduct,deleteAllProduct,deleteOneProduct,editProduct}