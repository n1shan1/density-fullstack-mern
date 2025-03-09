import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
export const ShopContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ShopContextProvider = (props) => {
  const currency = "$";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const delivery_fee = 50;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/list`);
      if (response.data.success) {
        // console.log(response.data.product);
        setProducts(response.data.product);
      } else {
        toast.error("Failed to fetch products: ", response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products: ", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const addToCart = async (itemId, productSize) => {
    let cartData = structuredClone(cartItems);
    if (productSize === "" || itemId === "") {
      toast.info("Please select a size before adding item to Cart.");
      return null;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][productSize]) {
        cartData[itemId][productSize] += 1;
      } else {
        cartData[itemId][productSize] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][productSize] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        // console.log(token);
        // console.log(productSize);
        const response = await axios.post(
          `${BACKEND_URL}/api/cart/add`,
          { itemId, productSize },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to add item to cart: ", error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error("Failed to fetch cart items: ", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cart items: ", error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          throw new Error("getCartCount has some error!");
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const updateQuantity = (itemId, productSize, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][productSize] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        axios.post(
          `${BACKEND_URL}/api/cart/update`,
          { itemId, productSize, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to add item to cart: ", error.message);
      }
    }
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    BACKEND_URL,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
