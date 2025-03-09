import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, BACKEND_URL } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentState, setCurrentState] = useState("Login");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (currentState === "Sign Up") {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Signed up successfully.");
        } else {
          toast.error(`Error Signing Up: ${response.data.message}`);
        }
      } catch (error) {
        console.log(error);
        toast.error(`Sign Up error: ${error.response.data.message}`);
      }
    } else {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, {
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(`Logged in successfully: ${response.data.message}`);
        } else {
          toast.error(
            "Invalid credentials, please try again!",
            response.data.message
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(`Failed to login: ${error.response.data.message}`);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center w-[90] sm:max-w-96 m-auto mt-14 gap-4 text-gray-500"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl text-gray-800">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-600" />
      </div>
      {currentState === "Sign Up" ? (
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border border-gray-600"
          placeholder="Name"
          required
        />
      ) : (
        ""
      )}
      <input
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-600"
        placeholder="Email"
        required
      />
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-600"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] text-gray-500">
        <p
          className="cursor-pointer
      "
        >
          forgot password
        </p>
        {currentState === "Login" ? (
          <p
            className="text-center text-gray-800 cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create New Account
          </p>
        ) : (
          <p
            className="text-center text-gray-800 cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login
          </p>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <button type="submit" className="bg-black text-white px-8 py-2">
          {currentState === "Sign Up" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default Login;
