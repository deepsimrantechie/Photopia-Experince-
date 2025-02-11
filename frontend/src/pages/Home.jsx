import React from "react";
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto pt-20">
        <h1 className="text-center text-4xl font-semibold">
          Discover And Capture The <br />
          Best Moments Through <br />
          Your Eyes Lens
        </h1>
        <p className="text-center text-2xl mt-6">
          Redefine Your Perspective, Experience The Extraordinary <br />
          In The Ordinary
        </p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button className="px-4 py-2 bg-red-700 rounded-xl text-white">
            Show Your Preview
          </button>
          <button className="px-4 py-2 bg-white text-red-700">
            View Other Product
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <img src={assets.photo} alt="Preview" />
        </div>
      </div>
    </div>
  );
};

export default Home;
