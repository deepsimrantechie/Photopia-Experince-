import React, { useState } from "react";
import CartTotal from "./CartTotal";

const PlaceOrder = () => {
  const [method, setMethod] = useState("");

  const paymentMethods = [
    { id: "stripe", label: "Stripe" },
    { id: "razorpay", label: "Razorpay" },
    { id: "cod", label: "Cash on Delivery" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!method) {
      alert("Please select a payment method");
      return;
    }
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-8 p-6 bg-gray-100">
      {/** Left side - Delivery Information */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Delivery Information</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Street</label>
            <input
              type="text"
              placeholder="Enter your street address"
              className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">City</label>
              <input
                type="text"
                placeholder="Enter your city"
                className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">State</label>
              <input
                type="text"
                placeholder="Enter your state"
                className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                placeholder="Enter your zip code"
                className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="input input-bordered w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
        </form>
      </div>
      {/** Right side - Order Summary & Payment */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <CartTotal />
        <h1 className="font-bold text-2xl mt-4">Payment Method</h1>
        <div className="mt-6 flex flex-col lg:flex-row gap-4">
          {paymentMethods.map(({ id, label }) => (
            <div
              key={id}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-lg hover:bg-gray-200 ${
                method === id ? "bg-green-200" : ""
              }`}
              onClick={() => setMethod(id)}
            >
              <p
                className="w-4 h-4 border rounded-full"
                style={{ background: method === id ? "green" : "transparent" }}
              ></p>
              <p className="text-gray-700 font-medium">{label}</p>
            </div>
          ))}
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm rounded-lg"
            onClick={handleSubmit}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
