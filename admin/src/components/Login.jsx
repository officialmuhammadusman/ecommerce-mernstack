import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = ({ settoken }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendurl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        settoken(response.data.token);
        toast.success("Admin logged in successfully");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (settoken && localStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [settoken, navigate]);

  return (
    <div className="min-h-screen bg-[#F5F1EE] flex items-center justify-center px-4 py-10">
      <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-md border border-[#E0E0E0]">
        <h1 className="text-3xl font-bold text-center text-[#1A1F36] mb-6">
          Admin Login
        </h1>
        <form onSubmit={onsubmithandler} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-[#333333] mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#D87A5C] outline-none shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#333333] mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#D87A5C] outline-none shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#D87A5C] text-white font-semibold tracking-wide hover:bg-[#c96b51] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;