import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import Tittle from '../Components/Tittle';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  const { products, showsearch, search } = useContext(ShopContext);
  const [showfilter, setshowfilter] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setcategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handlesubcategory = (e) => {
    const value = e.target.value;
    setsubcategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyfilter = () => {
    let productCopy = products.slice();

    if (showsearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item =>
        category.includes(item.cateogory)
      );
    }

    if (subcategory.length > 0) {
      productCopy = productCopy.filter(item =>
        subcategory.includes(item.subcategory)
      );
    }

    setfilterproduct(productCopy);
  };

  useEffect(() => {
    applyfilter();
  }, [category, subcategory, search, showsearch, products]);

  const sortProduct = () => {
    const fpcopy = filterproduct.slice();

    switch (sortType) {
      case "low-high":
        setfilterproduct(fpcopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setfilterproduct(fpcopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyfilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="bg-[#F5F1EE] text-[#333333] min-h-screen px-4 py-6">
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t border-[#E0E0E0]'>
        {/* Filter Section */}
        <div className='min-w-60'>
          <p
            onClick={() => setshowfilter(prev => !prev)}
            className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold'
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showfilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>

          {/* Category Filter */}
          <div className={`border border-[#E0E0E0] bg-white rounded-xl pl-5 py-3 my-6 shadow-sm ${showfilter ? "" : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-normal text-[#333333]'>
              {['Men', 'Women', 'Kids'].map((label, idx) => (
                <label key={idx} className='flex items-center gap-2'>
                  <input className='w-3 h-3' type="checkbox" value={label} onChange={toggleCategory} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className={`border border-[#E0E0E0] bg-white rounded-xl pl-5 py-3 my-6 shadow-sm ${showfilter ? "" : "hidden"} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-normal text-[#333333]'>
              {['Topwear', 'Bottomwear', 'Winterwear'].map((label, idx) => (
                <label key={idx} className='flex items-center gap-2'>
                  <input className='w-3 h-3' type="checkbox" value={label} onChange={handlesubcategory} />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Display Section */}
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-base sm:text-xl mb-6'>
            <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className='border border-[#E0E0E0] rounded-xl text-sm px-3 py-2 bg-white text-[#333333] shadow-sm'
            >
              <option value="relavent">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterproduct.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
