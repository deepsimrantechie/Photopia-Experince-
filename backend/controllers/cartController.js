{
  /**const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const updateQuery = {
      [`cartData.${itemId}.${size}`]: 1,
    };

    await userModel.findByIdAndUpdate(
      userId,
      { $inc: updateQuery }, // Increment the quantity
      { new: true, upsert: true } // Return updated doc, create if missing
    );

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
 */
}

import express from "express";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = { ...userData.cartData }; // Copy cart data

    cartData[itemId] = (cartData[itemId] || 0) + 1; // Increment item count

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = { ...userData.cartData };

    if (!cartData[itemId]) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cartData[itemId] = quantity; // Update quantity

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
