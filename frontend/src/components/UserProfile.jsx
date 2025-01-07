import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check if the user is logged in by looking for auth token
  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return token ? true : false;
  };

  useEffect(() => {
    const loggedInStatus = isLoggedIn();
    console.log("Logged In Status:", loggedInStatus); // Debugging
    setLoggedIn(loggedInStatus);

    if (loggedInStatus) {
      const storedName = localStorage.getItem("username"); // Ensure the correct key name
      console.log("Stored Name:", storedName); // Debugging
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName("User");
      }
    } else {
      setUserName(""); // Clear userName if not logged in
    }
  }, []); // Only run once when the component mounts

  const handleLogout = () => {
    console.log("Logging out..."); // Debugging
    localStorage.removeItem("authToken");
    localStorage.removeItem("username"); // Ensure the correct key name
    setLoggedIn(false);
    setUserName("");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center">
      {/* Top Divider */}
      <hr className="border-t-4 border-gray-700 w-11/12 my-4" />

      {/* Section 1 */}
      <section className="bg-white rounded-lg shadow-md px-10 py-8 w-11/12 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          {userName || "User"} {/* Display userName or fallback to "User" */}
        </h1>
        <p className="text-lg text-gray-600">
          Dear {userName || "User"}, welcome to our website. We're excited to
          have you here!
        </p>
      </section>

      {/* Middle Divider */}
      <hr className="border-t-4 border-red-700 w-11/12 my-8" />

      {/* Section 2 */}
      <section className="bg-white rounded-lg shadow-md px-10 py-8 w-11/12 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Features</h2>
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Contact Us
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
            Support Us
          </button>

          {/* Conditional rendering of Sign Up and Logout buttons */}
          {loggedIn && (
            <>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition">
                Sign Up
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
