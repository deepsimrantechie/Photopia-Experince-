import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import List from "./pages/List";
import Order from "./pages/Order";
import Add from "./pages/Add";

export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {!token ? (
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
          </Routes>
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />

            {/* Added flex container for sidebar and content */}
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-6 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/orders" element={<Order />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
