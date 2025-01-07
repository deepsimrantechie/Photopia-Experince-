import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Using useNavigate hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!username || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        { username, email, password }
      );

      if (response.data.success) {
        // Store the JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);

        // Show success message or redirect user
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/"); // Redirect after signup
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-black w-96 p-6 rounded-lg shadow-lg">
        <h1 className="text-white text-center text-2xl font-semibold mb-6">
          Create New Account
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Name
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)} // Fixed username handler
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 rounded-lg shadow-inner text-black"
            />
          </div>
          {/* Email Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 rounded-lg shadow-inner text-black"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 rounded-lg shadow-inner text-black"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-white text-center mt-4">{message}</p>}
        <div className="flex justify-around mt-4">
          <button className="bg-red-700 text-white px-6 py-2 rounded-lg">
            Google
          </button>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-lg">
            Facebook
          </button>
        </div>
        <p className="text-white text-center mt-4 text-xl">
          Already have an account?{" "}
          <a href="/login" className="cursor-pointer text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
