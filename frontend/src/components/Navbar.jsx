import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return token ? true : false; // If token exists, the user is logged in
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Remove the JWT token
    localStorage.removeItem("authToken");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-yellow-100  px-6">
        {/** The first section */}
        <section>
          <Link to="/">
            <img src={assets.logo} alt="Company Logo" className="w-40 mt-2" />
          </Link>
        </section>

        {/** The second section */}
        <section className="md:block hidden">
          <div className="flex items-center justify-center">
            <div className="bg-black rounded-2xl h-12 px-6 flex items-center">
              <div className="text-white flex space-x-8">
                <h1 className="cursor-pointer hover:text-gray-300">Feature</h1>
                <Link to="/picture">
                  <h1 className="cursor-pointer hover:text-gray-300">
                    Picture
                  </h1>
                </Link>
                <h1 className="cursor-pointer hover:text-gray-300">Company</h1>
                <Link to="/adding">
                  <button className="bg-white text-black rounded-lg py-1 px-4 hover:bg-gray-200">
                    Enquiry
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/** The third section */}
        <section className="flex space-x-2 items-center">
          {isLoggedIn() ? (
            // Show logout button if user is logged in
            <button
              onClick={handleLogout}
              className="w-28 h-12 mt-2 bg-red-700 text-white rounded-lg"
            >
              Logout
            </button>
          ) : (
            // Show login button if user is not logged in
            <Link to="/login">
              <button className="w-28 h-12 mt-2 bg-red-700 text-white rounded-lg">
                Login
              </button>
            </Link>
          )}
          <Link to="/profile">
            {" "}
            <img
              src={assets.p}
              alt=""
              className="w-14 h-14 rounded-full border-black border mt-1"
            />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
