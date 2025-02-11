import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Call-to-Action Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Join Our Journey</h1>
            <p className="text-base sm:text-lg mt-2">
              We are here to provide you an incredible experience.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg w-full sm:w-auto"
            />
            <button className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-800">
              Send
            </button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div>
            <a className="btn btn-ghost text-xl">Photopia</a>
            <h1 className="text-lg text-center md:text-left">We are here</h1>
            <p className="mt-4 text-center md:text-left">Let's connect on:</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <img
                src={assets.instagram}
                alt="Instagram"
                className="w-8 h-8 hover:opacity-75"
              />
              <img
                src={assets.linkdin}
                alt="LinkedIn"
                className="w-8 h-8 hover:opacity-75"
              />
              <img
                src={assets.twitter}
                alt="Twitter"
                className="w-8 h-8 hover:opacity-75"
              />
              <img
                src={assets.facebook}
                alt="Facebook"
                className="w-8 h-8 hover:opacity-75"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <ul className="space-y-2 text-center md:text-left">
              <li>Home</li>
              <li>Portfolio</li>
              <li>Services</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <ul className="space-y-2 text-center md:text-left">
              <li>Our Blog</li>
              <li>Our Partners</li>
              <li>Our Team</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Address and Contact */}
          <div>
            <p className="font-semibold text-center md:text-left">Address:</p>
            <p className="text-center md:text-left">
              123 Shutter Street, Frameville, Snapshot City, Imagistan - 456789
            </p>
            <p className="mt-4 font-semibold text-center md:text-left">
              Contact:
            </p>
            <p className="text-center md:text-left">+92 388 4789</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm border-t border-gray-700 pt-4">
          &copy; 2025 Photopiya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
