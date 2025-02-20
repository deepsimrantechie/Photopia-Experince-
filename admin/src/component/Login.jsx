import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/api/user/admin",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        setToken(response.data.success);
      } else {
        setMessage("error in login");
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl text-gray-900 text-center font-bold mb-6">
          Admin Panel
        </h1>
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              required
              placeholder="Enter your email"
              className="w-full border text-black border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full border text-black border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit "
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-red-700">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
