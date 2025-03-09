import User from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

//Route for logging in the user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "[userController/loginUser]: User with email does not exist.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "[userController/loginUser]: Invalid password, please enter a valid password or create a new account.",
      });
    }
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({
        success: true,
        token,
        message: "[userController/loginUser]: User logged in successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `[userController/loginUser]: ${error.message}`,
    });
  }
};

//Route for registering a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "[userController/registerUser]: User with email already exists.",
      });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "[userController/registerUser]: Invalid email format.",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "[userController/registerUser]: Password should be at least 8 characters long.",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);

    return res.json({
      success: true,
      token,
      message: "[userController/registerUser]: User registered successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `[userController/registerUser]: ${error.message}`,
    });
  }
};

//Route for logging in the admin
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token,
        message: "[userController/adminLogin]: Admin logged in successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "[userController/adminLogin]: Invalid email or password.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `[userController/adminLogin]: ${error.message}`,
    });
  }
};

export { loginUser, registerUser, adminLogin };
