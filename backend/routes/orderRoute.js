import express from "express";
import adminAuth from "../auth/adminAuth.js";
import authUser from "../auth/auth.js";
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  allOrders,
  userOrders,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/place-stripe", authUser, placeOrderStripe);
orderRouter.post("/place-razorpay", authUser, placeOrderRazorpay);

//user features
orderRouter.post("/user-orders", authUser, userOrders);

// /verify payment

orderRouter.post("/verify-stripe", authUser, verifyStripe);
orderRouter.post("/verify-razorpay", authUser, verifyRazorpay);

export default orderRouter;
