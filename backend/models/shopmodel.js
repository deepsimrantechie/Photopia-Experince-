import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
});

const shopModel = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
export default shopModel;
