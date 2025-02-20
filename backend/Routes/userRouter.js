import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import AuthUser from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// Protected routes
userRouter.get("/profile", AuthUser, (req, res) => {
  // Example response for authenticated users
  res.json({
    success: true,
    message: "Access to profile is authorized",
    userId: req.user.id, // Access user ID from req.user
  });
});

export default userRouter;
