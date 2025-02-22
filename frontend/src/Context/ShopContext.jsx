import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 20;
  const [cartItem, setCartItem] = useState({});

  // ✅ Load Cart from Local Storage on Startup
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Fetch cart from backend when user logs in
  const fetchUserCart = async (userId, token) => {
    if (!userId) {
      setCartItem({});
      localStorage.removeItem("cartItem");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/cart/get`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItem(response.data.cartData || {});
        localStorage.setItem(
          "cartItem",
          JSON.stringify(response.data.cartData || {})
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cart");
    }
  };

  // ✅ Add item to cart (Backend Sync + Local Storage)
  const addToCart = async (userId, itemId, token) => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/cart/add`,
        { userId, itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItem((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [itemId]: (prevCart[itemId] || 0) + 1,
        };
        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  // ✅ Update item quantity (Backend Sync + Local Storage)
  const updateQuantity = async (userId, itemId, quantity, token) => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/cart/update`,
        { userId, itemId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItem((prevCart) => {
        const updatedCart = { ...prevCart, [itemId]: quantity };
        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  // ✅ Get total cart count
  const getCartCount = () => {
    return Object.values(cartItem).reduce((total, count) => total + count, 0);
  };

  // ✅ Get cart total amount (Handles undefined argument)
  const getCartAmount = (listProducts) => {
    if (!listProducts) return 0;

    let totalAmount = 0;
    for (const itemId in cartItem) {
      const itemInfo = listProducts.find(
        (product) => String(product._id) === String(itemId)
      );
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItem[itemId];
      }
    }
    return totalAmount;
  };

  // ✅ Context values passed down
  const value = {
    currency,
    delivery_fee,
    cartItem,
    addToCart,
    updateQuantity,
    getCartAmount,
    getCartCount,
    fetchUserCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
