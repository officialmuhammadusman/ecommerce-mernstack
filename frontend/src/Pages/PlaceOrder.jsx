import React, { useContext, useState } from "react";
import Tittle from "../Components/Tittle";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { backendurl } from "../../../admin/src/App";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setmethod] = useState("cod");
  const {
    navigate,
    token,
    cartitem,
    setcartitem,
    delivery_fee,
    cartamount,
    products,
  } = useContext(ShopContext);

  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangehandlet = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();

    try {
      let orderitem = [];
      for (const items in cartitem) {
        for (const item in cartitem[items]) {
          if (cartitem[items][item] > 0) {
            const iteminfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (iteminfo) {
              iteminfo.size = item;
              iteminfo.quantity = cartitem[items][item];
              orderitem.push(iteminfo);
            }
          }
        }
      }

      const orderData = {
        address: formdata,
        items: orderitem,
        amount: cartamount() + delivery_fee,
        paymentMethod: method,
      };

      let response;

      switch (method) {
        case "stripe":
          response = await axios.post(backendurl + "/api/order/stripe", orderData, {
            headers: { token },
          });

          if (response.data.success) {
            const { session_url } = response.data;
            if (session_url) {
              window.location.replace(session_url);
            } else {
              toast.error(response.data.message);
            }
          } else {
            toast.error(response.data.message);
          }
          break;

        case "cod":
          response = await axios.post(`${backendurl}/api/order/place`, orderData, {
            headers: { token },
          });
          if (response.data.success) {
            setcartitem({});
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          toast.error("Invalid payment method.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onsubmithandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] bg-[#F5F1EE]"
    >
      {/* Left - Delivery Info */}
      <div className="w-full sm:w-[480px]">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="text-xl sm:text-2xl text-[#333]">
            <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="flex gap-3">
            <input required type="text" name="firstname" value={formdata.firstname} onChange={onchangehandlet} placeholder="First name" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
            <input required type="text" name="lastname" value={formdata.lastname} onChange={onchangehandlet} placeholder="Last name" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
          </div>

          <input required type="email" name="email" value={formdata.email} onChange={onchangehandlet} placeholder="Email address" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
          <input required type="text" name="street" value={formdata.street} onChange={onchangehandlet} placeholder="Street" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />

          <div className="flex gap-3">
            <input required type="text" name="city" value={formdata.city} onChange={onchangehandlet} placeholder="City" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
            <input required type="text" name="state" value={formdata.state} onChange={onchangehandlet} placeholder="State" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
          </div>

          <div className="flex gap-3">
            <input required type="number" name="zipcode" value={formdata.zipcode} onChange={onchangehandlet} placeholder="Zipcode" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
            <input required type="text" name="country" value={formdata.country} onChange={onchangehandlet} placeholder="Country" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
          </div>

          <input required type="text" name="phone" value={formdata.phone} onChange={onchangehandlet} placeholder="Phone" className="border border-[#E0E0E0] rounded-xl py-2 px-4 w-full bg-[#F9F9F9] text-[#333]" />
        </div>
      </div>

      {/* Right - Cart Summary + Payment */}
      <div className="mt-8 w-full sm:w-[480px] flex flex-col gap-8">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm">
          <CartTotal />
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-sm">
          <Tittle text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            <div
              onClick={() => setmethod("stripe")}
              className={`flex items-center gap-3 border border-[#E0E0E0] p-3 px-4 cursor-pointer rounded-xl transition duration-150 ${
                method === "stripe" ? "bg-[#F9F9F9]" : ""
              }`}
            >
              <p className={`w-3 h-3 border-2 rounded-full ${method === "stripe" ? "bg-[#D87A5C]" : "border-[#ccc]"}`} />
              <img className="h-5 mx-2" src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div
              onClick={() => setmethod("cod")}
              className={`flex items-center gap-3 border border-[#E0E0E0] p-3 px-4 cursor-pointer rounded-xl transition duration-150 ${
                method === "cod" ? "bg-[#F9F9F9]" : ""
              }`}
            >
              <p className={`w-3 h-3 border-2 rounded-full ${method === "cod" ? "bg-[#D87A5C]" : "border-[#ccc]"}`} />
              <p className="text-sm font-medium text-[#333]">Cash on Delivery</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-[#D87A5C] text-white px-10 py-3 text-sm font-medium rounded-xl shadow hover:bg-[#c1674f] hover:scale-105 transition duration-200"
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
