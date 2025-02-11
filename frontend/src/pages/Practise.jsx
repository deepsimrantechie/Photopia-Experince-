import React from "react";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Exclusive from "./Exclusive";
import Discount from "./Discount";
import Footer from "./Footer";
import { useThemeStore } from "../../store/useThemeStore";

const Practise = () => {
  const { theme } = useThemeStore();
  return (
    <div className="cursor-pointer" data-theme={theme}>
      <div className="">
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
