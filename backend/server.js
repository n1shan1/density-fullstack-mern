import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/Cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
// Create express app
const app = express();

// PORT
const PORT = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order/", orderRouter);

app.get("/", (req, res) => {
  res.json("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`[server]: Server is running on port: ${PORT}`);
});
