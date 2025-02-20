import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Exclusive = () => {
  const [currentSection, setCurrentSection] = useState("section1");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  }, []); // Fetch the list when the component mounts

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/shop/list");
      console.log("Fetched list data", response.data);
      if (response.data.success) {
        setList(response.data.ShopProduct || []);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log("Error fetching data", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-black flex flex-col">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl ml-4 sm:ml-8 md:ml-10 mt-8 sm:mt-10">
          Explore Our Exclusive <br />
          Camera Collections.
        </h1>
        <div className="ml-4 sm:ml-8 md:ml-10 mt-8 sm:mt-10">
          <nav className="space-x-2 sm:space-x-4">
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
            {/* Latest Camera Section */}
            {/* Latest Camera Section */}
            {currentSection === "section1" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-10">
                  {list.length > 0 ? (
                    list.map((item) => (
                      <div key={item._id} className="bg-white p-4 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <p className="text-black font-semibold text-xl mt-4">
                          {item.name}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                        <div className="flex justify-between">
                          <p className="text-red-600 text-2xl font-bold">
                            ${item.price}
                          </p>
                          <button className="btn mb-4 btn-primary">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No products available</p>
                  )}
                </div>
              </div>
            )}

            {/* Most Viewed Section */}
            {currentSection === "section2" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-10">
                  {list.length > 0 ? (
                    list.map((item) => (
                      <div key={item._id} className="bg-white p-4 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <p className="text-black font-semibold text-xl mt-4">
                          {item.name}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                        <div className="flex justify-between">
                          <p className="text-red-600 text-2xl font-bold">
                            ${item.price}
                          </p>
                          <button className="btn mb-4 btn-primary">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No products available</p>
                  )}
                </div>
              </div>
            )}

            {/* Hot Deals Section */}
            {currentSection === "section3" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-10">
                  {list.length > 0 ? (
                    list.map((item) => (
                      <div key={item._id} className="bg-white p-4 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <p className="text-black font-semibold text-xl mt-4">
                          {item.name}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                        <div className="flex justify-between">
                          <p className="text-red-600 text-2xl font-bold">
                            ${item.price}
                          </p>
                          <button className="btn mb-4 btn-primary">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No products available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Below */}
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
