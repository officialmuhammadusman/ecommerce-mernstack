import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Tittle from './Tittle'
import ProductItem from './ProductItem'
import SlideInLeft from './SlideInLeft' // Import animation wrapper

const LatestCollection = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(() => products.slice(0, 10))
  }, [products])

  return (
    <div className='my-10 px-4 py-6 bg-[#F5F1EE] text-[#333333] rounded-2xl'>

      {/* Title and Subtitle */}
      <SlideInLeft>
        <div className='text-center py-6 text-3xl'>
          <Tittle text1={"Latest"} text2={"Collection"} />
          <p className='w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#D87A5C] mt-2'>
            "Discover the style of the season — shop our latest arrivals now!"
          </p>
        </div>
      </SlideInLeft>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-2 sm:px-4'>
        {
          latestProducts.map((item, index) => (
            <SlideInLeft key={index}>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </SlideInLeft>
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection
