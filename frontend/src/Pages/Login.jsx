import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import ScrollReveal from "../Components/ScrollReveal";

const Login = () => {
  const [currentsate, setcurrentstate] = useState("Login");
  const { token, settoken, backendurl, navigate } = useContext(ShopContext);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const onsubmithnadler = async (e) => {
    e.preventDefault();
    try {
      if (currentsate === 'Sign Up') {
        const response = await axios.post(backendurl + '/api/user/register', { name, email, password });
        if (response.data.sucess) {
          settoken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("User is Successfully Registered");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendurl + '/api/user/login', { email, password });
        if (response.data.sucess) {
          settoken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={onsubmithnadler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-5 bg-[#F5F1EE] text-[#333333] rounded-xl p-6 shadow-md"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-6">
        <p className="text-3xl font-semibold">{currentsate}</p>
        <hr className="border-none h-[1.5px] w-8 bg-[#333333]" />
      </div>

      {currentsate === "Login" ? null : (
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D87A5C]"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setemail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D87A5C]"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D87A5C]"
        placeholder="Password"
        required
      />

      <div className="flex w-full justify-between text-sm mt-2 text-[#333333]">
        <p className="cursor-pointer hover:underline">Forgot your password?</p>
        {currentsate === "Login" ? (
          <p className="cursor-pointer hover:underline" onClick={() => setcurrentstate("Sign Up")}>
            Create account
          </p>
        ) : (
          <p className="cursor-pointer hover:underline" onClick={() => setcurrentstate("Login")}>
            Login Here
          </p>
        )}
      </div>

      <button
        className="w-full bg-[#D87A5C] text-white font-semibold px-6 py-2 mt-4 rounded-lg hover:bg-[#c26c51] transition-all duration-200"
      >
        {currentsate === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
