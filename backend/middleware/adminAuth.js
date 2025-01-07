import jwt from "jsonwebtoken";
const adminAuth = async (req, resizeBy, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        Message: "not authorised",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, Message: error.Message });
  }
};
export default adminAuth;
