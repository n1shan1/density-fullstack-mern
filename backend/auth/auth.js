import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token_decoded);
    req.body.userId = token_decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

export default authUser;
