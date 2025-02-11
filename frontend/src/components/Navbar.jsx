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
      <div className="flex justify-between items-center px-6">
        {/** The first section */}
        <section>
          <Link to="/">
            <a className="btn btn-ghost text-xl">Photopia</a>
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
                    Add on
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/** The third section */}
        <section className="flex space-x-2 items-center">
          <Link to="/profile">
            {" "}
            <div class="avatar online placeholder">
              <div class="bg-neutral text-neutral-content w-16 rounded-full">
                <span class="text-xl">PF</span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
