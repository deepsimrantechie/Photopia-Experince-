import React from "react";
import { useCart } from "../Context/CartContext";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiArrowLeft, FiShoppingBag } from "react-icons/fi";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Your Shopping Cart
          </h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Cart Total Summary */}
        <CartTotal />

        {/* Empty State */}
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <FiShoppingBag className="text-gray-300 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/"
              className="btn btn-primary px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0"
                  />
                  <div className="flex-1 sm:px-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-gray-500 mr-4">
                        Quantity: {item.quantity}
                      </span>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <button
                onClick={clearCart}
                className="btn btn-outline btn-error px-8 py-3 rounded-full"
              >
                Clear Cart
              </button>
              <Link
                to="/placeorder"
                className="btn btn-primary px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex-1 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
