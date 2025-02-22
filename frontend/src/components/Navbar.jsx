import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Returns true if token exists
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the JWT token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <div className="flex justify-between items-center px-6">
        {/** First section */}
        <section>
          <Link to="/" className="btn btn-ghost text-xl">
            Photopia
          </Link>{" "}
          {/* ✅ Removed <a> inside <Link> */}
        </section>

        {/** Second section */}
        <section className="md:block hidden">
          <div className="flex items-center justify-center">
            <div className="bg-black rounded-2xl h-12 px-6 flex items-center">
              <div className="text-white flex space-x-8">
                <Link to="/">
                  {" "}
                  <h1 className="cursor-pointer hover:text-gray-300">Home</h1>
                </Link>
                <Link
                  to="/picture"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Picture
                </Link>
                <Link to="/cart">
                  {" "}
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

        {/** Third section */}
        <section className="flex space-x-2 items-center">
          <Link to="/profile">
            <div className="avatar online placeholder">
              {" "}
              {/* ✅ Changed 'class' to 'className' */}
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <span className="text-xl">PF</span>{" "}
                {/* ✅ Changed 'class' to 'className' */}
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
