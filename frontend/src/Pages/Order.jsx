import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Tittle from '../Components/Tittle';
import SlideInLeft from '../Components/SlideInLeft';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = () => {
  const { backendurl, token, currency } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);

  const loadorderdata = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendurl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allorderitem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allorderitem.push(item);
          });
        });
        setorderdata(allorderitem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadorderdata();
  }, [token]);

  return (
    <div className="border-t border-[#E0E0E0] pt-16 bg-[#F5F1EE] min-h-screen px-4 sm:px-8 text-[#333333]">
      <SlideInLeft>
        <div className="text-2xl">
          <Tittle text1={"MY"} text2={"ORDERS"} />
        </div>
      </SlideInLeft>

      <div className="mt-8">
        {orderdata.map((item, index) => (
          <SlideInLeft key={index}>
            <div className="py-5 border-y border-[#E0E0E0] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20 rounded-xl shadow-sm" src={item.image[0]} alt="" />

                <div>
                  <p className="sm:text-base font-semibold">{item.name}</p>
                  <div className="flex items-center flex-wrap gap-4 mt-1 text-base">
                    <p>{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1 text-sm">
                    Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="text-sm">
                    Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm md:text-base">{item.status}</span>
                </div>

                <button
                  onClick={loadorderdata}
                  className="border border-[#E0E0E0] text-sm font-medium px-4 py-2 rounded-md hover:bg-[#D87A5C] hover:text-white hover:scale-105 transition-all duration-200"
                >
                  TRACK ORDER
                </button>
              </div>
            </div>
          </SlideInLeft>
        ))}
      </div>
    </div>
  );
};

export default Order;
