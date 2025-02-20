import {
  ShopAddProduct,
  shopListProduct,
  ShopRemoveProduct,
  ShopSingleProduct,
} from "../controllers/shopController.js";
import express from "express";
import multer from "multer";
import adminAuth from "../middleware/adminAuth.js";

const ShopRouter = express.Router();

// Configure multer for image uploads
const upload = multer({ dest: "uploads/" });

// Route for adding a product with image upload
ShopRouter.post("/add", upload.single("image"), ShopAddProduct);

ShopRouter.post("/remove", adminAuth, ShopRemoveProduct);

// Fixing an extra space in the route URL
ShopRouter.post("/single", ShopSingleProduct);

ShopRouter.get("/list", shopListProduct);

export default ShopRouter;
