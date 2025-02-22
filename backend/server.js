import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./Routes/userRouter.js"; // Correct import

import productRouter from "./Routes/productRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import ShopRouter from "./Routes/shopRouter.js";
import cartRouter from "./Routes/CartRoute.js";

dotenv.config();
connectCloudinary();
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173", // Development
  "http://localhost:5174",
  "https://photopia-experince-frontend.onrender.com", // Production
  "https://photopia-experince-admin.onrender.com",
];

// Middleware
app.use(express.json());
app.use(express.static("build"));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true, // Enable sending cookies, auth headers, etc.
  })
);

// Make sure the path `/api/user` is used correctly
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/shop", ShopRouter);
app.use("/api/cart", cartRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to start the server", error);
  }
};

startServer();
