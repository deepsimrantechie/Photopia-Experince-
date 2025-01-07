import React, { useState } from "react";
import { assets } from "../assets/assets";

const Exclusive = () => {
  const [currentSection, setCurrentSection] = useState("section1");

  return (
    <div>
      <div className="bg-black flex flex-col">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl ml-4 sm:ml-8 md:ml-10 mt-8 sm:mt-10">
          Explore Our Exclusive <br />
          Camera Collections.
        </h1>
        <div className="ml-4 sm:ml-8 md:ml-10 mt-8 sm:mt-10">
          <nav className="space-x-2 sm:space-x-4">
            {/* Buttons with dynamic underline */}
            <button
              onClick={() => setCurrentSection("section1")}
              className={`text-white ${
                currentSection === "section1"
                  ? "text-lg sm:text-xl underline decoration-red-700 decoration-4 underline-offset-2"
                  : ""
              }`}
            >
              Latest Camera
            </button>
            <button
              onClick={() => setCurrentSection("section2")}
              className={`text-white ${
                currentSection === "section2"
                  ? "text-lg sm:text-xl underline decoration-red-700 decoration-4 underline-offset-2"
                  : ""
              }`}
            >
              Most Viewed
            </button>
            <button
              onClick={() => setCurrentSection("section3")}
              className={`text-white ${
                currentSection === "section3"
                  ? "text-lg sm:text-xl underline decoration-red-700 decoration-4 underline-offset-2"
                  : ""
              }`}
            >
              Hot Deals
            </button>
          </nav>
          <div>
            {/* The first section */}
            {currentSection === "section1" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="mt-6">
                    <img
                      src={assets.blackcamera}
                      alt=""
                      className="w-96 h-96 bg-black"
                    />
                    <div className="text-white flex items-center justify-between mt-14">
                      <div>
                        <h1>Pro Capture Series</h1>
                        <p>$73,844</p>
                      </div>
                      <button className="bg-red-700 text-white px-2 py-2 rounded-xl">
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <img
                      src={assets.Camera2}
                      alt=""
                      className="w-full h-auto bg-black"
                    />
                    <div className="text-white flex items-center justify-between mt-2">
                      <div>
                        <h1>Pro Capture Series</h1>
                        <p>$73,844</p>
                      </div>
                      <button className="bg-red-700 text-white px-2 py-2 rounded-xl">
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <img
                      src={assets.Camera3}
                      alt=""
                      className="w-full h-auto bg-black mt-16"
                    />
                    <div className="text-white flex items-center justify-between mt-6">
                      <div>
                        <h1>Pro Capture Series</h1>
                        <p>$73,844</p>
                      </div>
                      <button className="bg-red-700 text-white px-2 py-2 rounded-xl">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* The second section */}
            {currentSection === "section2" && (
              <div>
                <p className="text-white text-lg sm:text-xl">
                  Most Viewed Content
                </p>
              </div>
            )}

            {/* The third section */}
            {currentSection === "section3" && (
              <div>
                <p className="text-white text-lg sm:text-xl">
                  Hot Deals Content
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Section below */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-20 sm:mt-36 mb-20 px-4 sm:px-8 md:px-10">
          <div className="text-center md:text-left">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl mt-8">
              Preserve Memories, <br />
              Embrace Classics.
            </h1>
            <p className="text-white text-base sm:text-lg mt-4">
              Capture timeless moments and cherish the classics that never fade.
              <br />
              Keep the essence of the past alive while celebrating what endures
              through time.
            </p>
            <button className="bg-red-700 text-white rounded-lg px-4 py-2 mt-4">
              Memories
            </button>
          </div>
          <div>
            <img
              src={assets.photo}
              alt="Photography"
              className="w-full sm:max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exclusive;
