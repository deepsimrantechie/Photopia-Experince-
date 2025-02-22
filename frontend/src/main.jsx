import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Import correctly
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Make sure this is correct
import { CartProvider } from "./Context/CartContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
