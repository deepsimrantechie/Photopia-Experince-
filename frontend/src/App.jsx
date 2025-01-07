import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exclusive from "./pages/Exclusive";
import Discount from "./pages/Discount";
import Footer from "./pages/Footer";
import Picture from "./pages/Picture";
import Adding from "./pages/Adding";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";

// Utility function to check if the user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  return token ? true : false;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn()); // Track user login status

  useEffect(() => {
    // You can recheck login status on app load
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Exclusive />
                  <Discount />
                </>
              }
            />
            <Route path="/picture" element={<Picture />} />
            <Route path="/adding" element={<Adding />} />
            {/* If not logged in, redirect to Login page */}
            <Route
              path="/login"
              element={!loggedIn ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/Signup"
              element={!loggedIn ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/profile" element={<UserProfile />} />

            {/* Protected Route */}
            <Route
              path="/exclusive"
              element={loggedIn ? <Exclusive /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
