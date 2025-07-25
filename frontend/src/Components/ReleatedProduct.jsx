import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Tittle from './Tittle'
import ProductItem from './ProductItem'
import SlideInLeft from './SlideInLeft'  // ✅ Import your animation component

const ReleatedProduct = ({ category, subcatogory }) => {
  const { products } = useContext(ShopContext)
  const [releated, setReleated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productcopy = products.slice()
      productcopy = productcopy.filter((item) => category === item.category)
      productcopy = productcopy.filter((item) => subcatogory === item.subcatogory)
      setReleated(productcopy.slice(0, 5))
    }
  }, [products, category, subcatogory])

  return (
    <SlideInLeft>
      <div className="my-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#F5F1EE] rounded-2xl py-8">
        <div className="text-center text-3xl text-[#1A1F36] mb-8">
          <Tittle text1={"RELEATED"} text2={"PRODUCTS"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {releated.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </SlideInLeft>
  )
}

export default ReleatedProduct
