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

const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://photopia-experince-frontend.onrender.com", // Production
];

// Middleware
app.use(express.json());
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
