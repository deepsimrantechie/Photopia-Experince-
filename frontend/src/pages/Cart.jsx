import React from "react";
import { useCart } from "../Context/CartContext";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      <CartTotal />

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1 px-4">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">₹{item.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                onClick={() => removeFromCart(item.id)} // ✅ Now works!
              >
                Remove
              </button>
            </div>
          ))}
          <Link to="/placeorder">
            {" "}
            <button className="btn glass w-full text-xl py-2 mt-4 border border-black">
              Place Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
