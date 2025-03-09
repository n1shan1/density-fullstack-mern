import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../App";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(BACKEND_URL);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/admin-login`,
        {
          email: email,
          password: password,
        }
      );
      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login Success");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-3">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium mb-3">Email Address</p>
            <input
              className="rounded w-full px-4 py-2  border border-gray-400 outline-none"
              type="email"
              placeholder="your@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="tex-sm font-medium mb-3">Password</p>
            <input
              className="rounded w-full px-4 py-2 border border-gray-400 outline-none"
              type="password"
              placeholder="1234567890"
              required
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <button
            className="bg-black text-white px-4 py-2 mt-2 w-full"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
