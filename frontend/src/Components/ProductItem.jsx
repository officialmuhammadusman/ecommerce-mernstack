import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SlideInLeft from './SlideInLeft';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <SlideInLeft>
      <div
        // w-full is already applied here, which ensures equal width in a grid layout.
        className="w-full bg-[#fffaf5] rounded-3xl shadow-lg overflow-hidden
                   border border-[#e7dcd2] flex flex-col h-full
                   hover:shadow-xl hover:-translate-y-1
                   transition-all duration-300 ease-in-out"
      >
        <div onClick={() => navigate(`/product/${id}`)} className="cursor-pointer h-full flex flex-col">
          <div className="overflow-hidden rounded-t-3xl flex-shrink-0">
            <img
              className="w-full h-auto object-cover transition-transform ease-in-out duration-300"
              src={image[0]}
              alt={name}
            />
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-base font-semibold mb-2 leading-tight line-clamp-1 text-[#333]">
              {name}
            </h3>
            <p className="text-lg font-bold text-[#333]">
              {currency} {price}
            </p>

            <motion.button
              whileHover={{ x: 6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 bg-[#D87A5C] text-white text-sm py-2 px-5 rounded-full
                         hover:bg-[#b35a42] transition-colors duration-300 w-max
                         flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${id}`);
              }}
            >
              View Details <HiArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </SlideInLeft>
  );
};

export default ProductItem;