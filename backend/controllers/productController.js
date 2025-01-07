import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  console.log("Received file:", req.file); // Should display the uploaded file object
  console.log("Received body:", req.body); // Should display the form data

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image file uploaded" });
  }

  try {
    // Upload image to Cloudinary
    let result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image", // Ensure it's an image
    });

    // Save product data to database with Cloudinary image URL
    const product = new productModel({
      image: result.secure_url, // Store single image URL
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
    });

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error during product addition:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error listing products:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error removing product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct };
