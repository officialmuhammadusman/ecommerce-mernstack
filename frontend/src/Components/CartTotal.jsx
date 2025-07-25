import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Tittle from './Tittle'
import SlideInLeft from './SlideInLeft' // Import animation wrapper

const CartTotal = () => {
  const { currency, delivery_fee, cartamount } = useContext(ShopContext)

  return (
    <SlideInLeft>
      <div className="w-full max-w-md mx-auto bg-[#F5F1EE] rounded-2xl p-6 shadow-lg border border-[#D87A5C]">
        <div className="text-2xl mb-6">
          <Tittle text1={"CART"} text2={"TOTALS"} />
        </div>

        <div className="flex flex-col gap-4 text-sm text-[#333333]">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{currency}{cartamount()}.00</p>
          </div>
          <hr className="border-gray-300" />

          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
          </div>
          <hr className="border-gray-300" />

          <div className="flex justify-between text-[#1A1F36] font-semibold text-lg">
            <p>Total</p>
            <p>{currency}{cartamount() === 0 ? 0 : cartamount() + delivery_fee}.00</p>
          </div>
        </div>
      </div>
    </SlideInLeft>
  )
}

export default CartTotal
