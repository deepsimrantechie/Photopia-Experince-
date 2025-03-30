import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between mt-4 items-center px-6">
        {/** First section */}
        <section>
          <Link to="/" className="btn btn-ghost text-xl">
            Photopia
          </Link>
        </section>

        {/** Second section */}
        <section className="md:block hidden">
          <div className="flex items-center justify-center">
            <div className="bg-black rounded-2xl h-12 px-6 flex items-center">
              <div className="text-white flex space-x-8">
                <Link to="/">
                  <h1 className="cursor-pointer hover:text-gray-300">Home</h1>
                </Link>
                <Link
                  to="/picture"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Picture
                </Link>
                <Link to="/cart">
                  <h1 className="cursor-pointer hover:text-gray-300">Cart</h1>
                </Link>
                <Link to="/adding">
                  <button className="bg-white text-black rounded-lg py-1 px-4 hover:bg-gray-200">
                    Add on
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/** Third section - Improved Profile Button Only */}
        <section className="flex space-x-2 items-center">
          <Link to="/profile">
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                <FiUser className="text-gray-700 text-lg" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              <span className="absolute top-full mt-2 right-0 w-max bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                View Profile
              </span>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
