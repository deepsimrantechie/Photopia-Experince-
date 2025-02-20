import { v2 as cloudinary } from "cloudinary";
import shopModel from "../models/shopmodel.js";

// Function to add a new product
const ShopAddProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file;

    if (!image) {
      return res.json({ success: false, message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const imageUrl = result.secure_url;

    const shopData = {
      name,
      description,
      price: Number(price),
      image: imageUrl,
    };

    const shop = new shopModel(shopData);
    await shop.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//function for listing data
const shopListProduct = async (req, res) => {
  try {
    const ShopProduct = await shopModel.find({});
    res.json({ success: true, ShopProduct });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function for removing product

const ShopRemoveProduct = async (req, res) => {
  try {
    await shopModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "product removed " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single product

const ShopSingleProduct = async (req, res) => {
  try {
    const { ShopId } = req.body;
    const shop = await shopModel.findById(ShopId);
    res.json({ success: true, shop });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  shopListProduct,
  ShopAddProduct,
  ShopRemoveProduct,
  ShopSingleProduct,
};
