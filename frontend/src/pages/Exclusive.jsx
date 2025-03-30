import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
//localhost
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const Exclusive = () => {
  const { addToCart } = useCart();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/shop/list`);
      if (response.data.success) {
        setList(response.data.ShopProduct || []);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500 leading-tight">
          Explore Our Exclusive <br className="hidden sm:block" />
          Camera Collections
        </h1>
        <p className="text-gray-300 mt-6 text-lg max-w-3xl mx-auto">
          Discover premium photography equipment that transforms moments into
          timeless memories. Professional-grade cameras for enthusiasts and
          experts alike.
        </p>
      </motion.div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {list.length > 0 ? (
            list.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700 hover:border-red-500 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      New
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-white">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(item);
                        toast.success(`${item.name} added to cart!`, {
                          position: "bottom-right",
                          autoClose: 2000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                      className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-900 transition-all duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-12"
            >
              <div className="text-gray-400 text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>No products available at the moment</p>
                <button
                  onClick={fetchList}
                  className="mt-4 text-red-500 hover:text-red-400 flex items-center justify-center mx-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Memories Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-28 md:mt-36 mb-16 md:mb-24"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
                Preserve Memories,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
                Embrace Classics.
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Our cameras are more than just tools - they're time machines that
              capture the essence of moments, transforming them into cherished
              memories. The classic designs we offer blend timeless aesthetics
              with cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-full hover:from-red-700 hover:to-red-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:shadow-red-900/20">
                Explore Memories
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={assets.photo}
                alt="Photography"
                className="w-full h-auto object-cover rounded-2xl transform transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-yellow-400 rounded-lg opacity-70 hidden lg:block"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-red-500 rounded-full opacity-70 hidden lg:block"></div>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Join Our Photography Community
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Subscribe to get exclusive offers, photography tips, and early access
          to new collections.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exclusive;
