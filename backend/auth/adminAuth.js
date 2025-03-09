import jwt, { decode } from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "[auth/adminAuth]: Not authorized to access this route",
      });
    }
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "[auth/adminAuth] :Not authorized to access this route",
      });
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: `[auth/adminAuth]: ${error.message}` });
  }
};

export default adminAuth;
