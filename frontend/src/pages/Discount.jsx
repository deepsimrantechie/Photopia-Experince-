import React from "react";
import { assets } from "../assets/assets";

const Discount = () => {
  return (
    <div>
      <div className="bg-black mt-20 mx-20 px-10 mb-28  rounded-3xl flex flex-col lg:flex-row items-center lg:justify-between">
        {/** the divisiona */}
        <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start justify-between w-full">
          {/** the right side */}
          <div className="lg:w-1/2 mt-20">
            <h1 className="text-white text-4xl lg:text-5xl">
              GET 10% Off On The <br />
              Polaroid Land Camera
            </h1>
            <p className="text-white mt-4 text-lg lg:text-xl">
              Take a step back in time and capture memories with the <br />
              iconic Polaroid Land Camera. Enjoy an exclusive 10% <br />
              discount and relive the magic of instant photography!
            </p>
            <button className="bg-red-700 px-5 py-3 rounded-lg text-white mt-4">
              Discount
            </button>
          </div>

          {/** the left side */}
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <img
              src={assets.Discount1}
              alt="Polaroid Land Camera"
              className="h-96 w-96 mx-auto rounded-xl mb-20 mt-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
