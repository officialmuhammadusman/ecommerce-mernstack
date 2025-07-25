import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Tittle from './Tittle'
import ProductItem from './ProductItem'
import SlideInLeft from '../Components/SlideInLeft'  // Import the animation wrapper

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <SlideInLeft>
      <div className='my-10 px-4 py-6 bg-[#F5F1EE] text-[#333333] rounded-2xl'>
        
        {/* Title Section */}
        <div className='text-center text-3xl py-6'>
          <Tittle text1={"BEST"} text2={"SELLERS"} />
          <p className='w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#D87A5C] mt-2'>
            "These best-selling brands have set the standard for excellence — discover why everyone loves them!"
          </p>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-2 sm:px-4'>
          {
            bestSeller.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          }
        </div>
      </div>
    </SlideInLeft>
  )
}

export default BestSeller
