{
  /*import jwt from "jsonwebtoken";
const adminAuth = async (req, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        Message: "not authurized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, Message: error.Message });
  }
};
export default adminAuth;
*/
}
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // ✅ Extract token correctly

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing or invalid format",
      });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract actual token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // ✅ Attach decoded data to request

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token or expired",
    });
  }
};

export default adminAuth;
