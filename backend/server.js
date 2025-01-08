import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./Routes/userRouter.js"; // Correct import

import productRouter from "./Routes/productRoute.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();
connectCloudinary();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "https://photopia-experince-frontend.onrender.com" }));

// Make sure the path `/api/user` is used correctly
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API IS WORKING");
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
