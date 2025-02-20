import bcrypt from "bcryptjs"; // Make sure this is being used
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug: Log incoming request data
    console.log("Login Request:", { email, password });

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Debug: Log successful authentication
    console.log("Authentication successful for user:", user.username);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Send response with token and user details
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        userName: user.username, // Make sure frontend expects 'userName'
        email: user.email,
      },
    });

    // Debug: Log response data
    console.log("Login Response Sent:", {
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, userName: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Debug: Log incoming registration request
  console.log("Registration Request:", { username, email, password });

  // Validate input
  if (!username || !email || !password) {
    console.log("Registration failed due to missing fields.");
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("Email already in use:", email);
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    // Debug: Log user saved to database
    console.log("User registered:", user);

    // Generate JWT token for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Send success response with token and user details
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

    // Debug: Log response data
    console.log("Registration Response Sent:", {
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, adminLogin };
