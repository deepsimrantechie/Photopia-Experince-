import React from "react";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Exclusive from "./Exclusive";
import Discount from "./Discount";
import Footer from "./Footer";

const Practise = () => {
  return (
    <div>
      <div className="bg-yellow-100">
        <Navbar />
        <Home />
      </div>
      <Exclusive />
      <Discount />
      <Footer />
    </div>
  );
};

export default Practise;
