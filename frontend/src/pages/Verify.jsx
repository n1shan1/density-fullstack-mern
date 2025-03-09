import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Verify = () => {
  const { navigate, token, setCartItems, BACKEND_URL } =
    useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        `${BACKEND_URL}/api/order/verify-stripe`,
        { orderId, success },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/order");
        toast.success(response.data.message);
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify payment: ", error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Verify;
