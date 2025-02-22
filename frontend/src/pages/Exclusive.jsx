import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";

import { assets } from "../assets/assets";

const Exclusive = () => {
  const { addToCart } = useCart(); // Get addToCart function
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/shop/list");
      if (response.data.success) {
        setList(response.data.ShopProduct || []);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-black flex flex-col px-4 sm:px-8 md:px-10 py-10">
      {/* Title Section */}
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
        Explore Our Exclusive <br />
        Camera Collections.
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-10">
        {list.length > 0 ? (
          list.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 object-cover rounded-lg"
              />
              <p className="text-black font-semibold text-xl mt-4">
                {item.name}
              </p>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-red-600 text-2xl font-bold">${item.price}</p>
                <button
                  onClick={() => addToCart(item)} // Add item to cart
                  className="bg-red-700 text-white rounded-lg px-4 py-2 hover:bg-red-800 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-lg">
            No products available
          </p>
        )}
      </div>

      {/* Memories Section - Added Back */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-20 sm:mt-36 mb-20">
        <div className="text-center md:text-left">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
            Preserve Memories, <br />
            Embrace Classics.
          </h1>
          <p className="text-white text-base sm:text-lg mt-4">
            Capture timeless moments and cherish the classics that never fade.
            <br />
            Keep the essence of the past alive while celebrating what endures
            through time.
          </p>
          <button className="bg-red-700 text-white rounded-lg px-6 py-3 mt-4 hover:bg-red-800 transition">
            Memories
          </button>
        </div>
        <div>
          <img
            src={assets.photo} // Corrected Image Import
            alt="Photography"
            className="w-full sm:max-w-md h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Exclusive;
