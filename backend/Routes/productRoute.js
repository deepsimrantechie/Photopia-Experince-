import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js"; // Ensure correct import

const productRouter = express.Router();

// Add product
productRouter.post(
  "/add",
  upload.single("image"), // Ensure this matches the frontend field name
  addProduct
);

// Remove product
productRouter.delete("/remove", removeProduct);

// List products
productRouter.get("/list", listProducts);

export default productRouter;
