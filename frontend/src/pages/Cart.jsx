import React from "react";
import { useCart } from "../Context/CartContext";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiArrowLeft,
  FiShoppingBag,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary bg-opacity-10 p-3 rounded-full mb-4"
          >
            <FiShoppingBag className="text-primary w-6 h-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Your Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-md"
          >
            {cart.length > 0
              ? "Review your items before checkout"
              : "Your cart is waiting to be filled"}
          </motion.p>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center"
              >
                <FiShoppingBag className="text-gray-300 text-6xl mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                  Your cart feels lonely
                </h2>
                <p className="text-gray-500 mb-8 max-w-md">
                  You haven't added any items yet. Start shopping to fill your
                  cart with amazing products!
                </p>
                <Link
                  to="/"
                  className="btn btn-primary px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center"
                >
                  <FiArrowLeft className="mr-2 transform rotate-180" />
                  Browse Products
                </Link>
              </motion.div>
            ) : (
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48 bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md text-red-500 hover:text-red-600 transition-all"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-gray-500 mb-4">
                              {item.category}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mb-6">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-full overflow-hidden bg-gray-50">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus size={16} />
                              </button>
                              <span className="px-4 font-medium text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm sticky top-8 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <CartTotal />

              {cart.length > 0 && (
                <>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₹
                        {cart
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes</span>
                      <span className="font-medium">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-6"></div>

                  <div className="flex justify-between mb-8">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold">
                      ₹
                      {cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <Link
                      to="/placeorder"
                      className="btn btn-primary w-full py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg font-medium"
                    >
                      Proceed to Checkout
                    </Link>
                    <button
                      onClick={clearCart}
                      className="btn btn-outline w-full py-4 rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Clear Cart
                    </button>
                    <Link
                      to="/"
                      className="flex items-center justify-center text-gray-600 hover:text-primary transition-colors mt-4"
                    >
                      <FiArrowLeft className="mr-2" />
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recommended for empty cart */}
        {cart.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mt-3 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
