import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Tittle from "../Components/Tittle";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";
import SlideInLeft from "../Components/SlideInLeft";

const Cart = () => {
  const { products, currency, cartitem, updatequantity, navigate } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    const tempdata = [];

    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          tempdata.push({
            id: items,
            size: item,
            quantity: cartitem[items][item],
          });
        }
      }
    }

    setcartdata(tempdata);
  }, [cartitem]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Tittle text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartdata.map((item, index) => {
          const productsdata = products.find(
            (product) => product._id === item.id
          );
          return (
            <SlideInLeft key={index}>
              <div className="bg-white shadow-md rounded-lg p-4 my-4">
                <div
                  className="text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productsdata.image[0]}
                      alt=""
                    />

                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {productsdata.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {productsdata.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updatequantity(item.id, item.size, Number(e.target.value))
                    }
                    className="border w-10 sm:w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />

                  <img
                    onClick={() => updatequantity(item.id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt=""
                  />
                </div>
              </div>
            </SlideInLeft>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
