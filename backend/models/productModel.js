import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Change this to String to store a single image
  description: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
