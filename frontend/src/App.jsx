import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ❌ Removed BrowserRouter
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exclusive from "./pages/Exclusive";
import Discount from "./pages/Discount";
import Footer from "./pages/Footer";
import Picture from "./pages/Picture";
import Adding from "./pages/Adding";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import { useThemeStore } from "../store/useThemeStore";
import Cart from "./pages/Cart";
import PlaceOrder from "./components/PlaceOrder";
import CartTotal from "./components/CartTotal";
import ShopContextProvider from "./Context/ShopContext";

// Utility function to check if the user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // Returns true if the token exists
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn()); // Track user login status
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply the theme to the <html> tag globally
    document.documentElement.setAttribute("data-theme", theme);

    // Update login status on component mount
    setLoggedIn(isLoggedIn());
  }, [theme]); // Runs whenever `theme` changes

  return (
    <ShopContextProvider>
      <Navbar />
      <div className="cursor-pointer">
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
          <Route
            path="/login"
            element={!loggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!loggedIn ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cartTotal" element={<CartTotal />} />

          {/* Protected Route */}
          <Route
            path="/exclusive"
            element={loggedIn ? <Exclusive /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Footer />
    </ShopContextProvider>
  );
};

export default App;
