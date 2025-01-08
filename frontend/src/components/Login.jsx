import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Use the environment variable or a fallback for development
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/login`, // Use the dynamic API base URL here
        { email, password }
      );

      if (response.data.success) {
        setMessage(response.data.message);

        const userName = response.data.user.userName || "User";
        const token = response.data.token;

        // Store token and username in localStorage
        window.localStorage.setItem("username", userName);
        window.localStorage.setItem("authToken", token);

        console.log(
          "Stored username in localStorage:",
          window.localStorage.getItem("username")
        );
        console.log(
          "Stored authToken in localStorage:",
          window.localStorage.getItem("authToken")
        );

        // Navigate to profile page
        navigate("/profile");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-black w-96 p-6 rounded-lg shadow-lg">
        <h1 className="text-white text-center text-2xl font-semibold mb-6">
          Welcome Again
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 rounded-lg shadow-inner text-black"
              aria-label="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 rounded-lg shadow-inner text-black"
              aria-label="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
          >
            Login
          </button>
        </form>
        {message && <p className="text-white mt-4">{message}</p>}
        <div className="flex justify-around mt-4">
          <button
            className="bg-red-700 text-white px-6 py-2 rounded-lg"
            aria-label="Login with Google"
          >
            Google
          </button>
          <button
            className="bg-blue-700 text-white px-6 py-2 rounded-lg"
            aria-label="Login with Facebook"
          >
            Facebook
          </button>
        </div>
        <p className="text-white text-center mt-4 text-xl">
          Don't Have an account?{" "}
          <Link to="/Signup">
            {" "}
            <a className="text-blue-600 cursor-pointer">Sign up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
