import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";
import razorpay from "razorpay";
//global variables
const CURRENCY = "usd";
const DELIVERY_CHARGES = 50;

//gateway init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address, items } = req.body;
    const orderData = {
      userId,
      amount,
      items,
      paymentMethod: "COD",
      address,
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });
    return res
      .status(200)
      .json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

//placing order using stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, amount, address, items } = req.body;
    const origin = req.headers.origin;
    const orderData = {
      userId,
      amount,
      items,
      paymentMethod: "Stripe",
      address,
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: CURRENCY,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: DELIVERY_CHARGES * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({
      success: true,
      session_url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

//verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({ success: true, message: "Payment Successful" });
  } else {
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ success: true, message: "Payment Failed" });
  }
};

//placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, amount, address, items } = req.body;
    const orderData = {
      userId,
      amount,
      items,
      paymentMethod: "RAZORPAY",
      address,
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    const options = {
      amount: amount * 100,
      currency: CURRENCY.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: `Internal Server Error ${err.message}`,
        });
      } else {
        res.json({ success: true, order });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

//verify razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, userId } = req.body;
    console.log(req.body);
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

//all order data for admin
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch orders: ", error.message);
  }
};

//get order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};
