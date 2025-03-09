import React, { useContext, useState } from "react";
import Title from "../components/UI/Title";
import CartTotal from "../components/Cart/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const {
    navigate,
    BACKEND_URL,
    delivery_fee,
    currency,
    token,
    cartItems,
    getCartAmount,
    products,
    setCartItems,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("COD");
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFromData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemsInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemsInfo) {
              itemsInfo.productSize = item;
              itemsInfo.quantity = cartItems[items][item];
              orderItems.push(itemsInfo);
            }
          }
        }
      }
      console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "COD":
          const response = await axios.post(
            `${BACKEND_URL}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/cart");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "STRIPE":
          const responseStripe = await axios.post(
            `${BACKEND_URL}/api/order/place-stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const session_url = responseStripe.data.session_url;
            window.location.replace(session_url).then((response) => {
              console.log(response);
            });
            // setCartItems({});
            // navigate("/cart");
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case "RAZORPAY":
          const responseRazorpay = await axios.post(
            `${BACKEND_URL}/api/order/place-razorpay`,
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order: ", error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async function (response) {
        console.log(response);
        try {
          const { data } = await axios.post(
            `${BACKEND_URL}/api/order/verify-razorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/cart");
            setCartItems({});
          } else {
            toast.error(data.message);
            console.log(error);
          }
        } catch (error) {}
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First Name"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last Name"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>
        <input
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email Address"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zip Code"
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            required
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>
        <input
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("STRIPE")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "STRIPE" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="logo" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("RAZORPAY")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "RAZORPAY" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="logo" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("COD")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "COD" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
