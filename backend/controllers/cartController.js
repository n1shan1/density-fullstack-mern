import User from "../models/User.js";

//add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, productSize } = req.body;
    // console.log(productSize);
    // console.log(req.body);
    const userData = await User.findById(userId);

    const cart_Data = await userData.cartData;
    if (cart_Data[itemId]) {
      if (cart_Data[itemId][productSize]) {
        cart_Data[itemId][productSize] += 1;
      } else {
        cart_Data[itemId][productSize] = 1;
      }
    } else {
      cart_Data[itemId] = { [productSize]: 1 };
    }
    await User.findByIdAndUpdate(userId, { cartData: cart_Data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//update products to user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, productSize, quantity } = req.body;
    const userData = await User.findById(userId);
    const cart_Data = await userData.cartData;

    cart_Data[itemId][productSize] = quantity;
    await User.findByIdAndUpdate(userId, { cartData: cart_Data });
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get products from user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId);
    const cart_Data = await userData.cartData;
    res.json({ success: true, cartData: cart_Data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateCart, getUserCart };
