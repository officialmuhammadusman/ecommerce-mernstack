import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import ReleatedProduct from '../Components/ReleatedProduct';

const Product = () => {
  const { id } = useParams();
  const { products, currency, addtocart } = useContext(ShopContext);

  const [size, setsize] = useState('');
  const [productdata, setproductdata] = useState(false);
  const [image, setimg] = useState('');

  useEffect(() => {
    const found = products.find((item) => item._id === id);
    if (found) {
      setproductdata(found);
      setimg(found.image[0]);
    }
  }, [id, products]);

  return productdata ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100 space-y-12 bg-[#F5F1EE] text-[#333333]">

      {/* Image & Info Section */}
      <div className="flex flex-col sm:flex-row gap-8">

        {/* Images Card */}
        <div className="bg-[#FFFFFF] shadow-md rounded-2xl p-4 flex-1">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-[20%]">
              {productdata.image.map((item, index) => (
                <img
                  onClick={() => setimg(item)}
                  className="w-20 h-20 object-cover cursor-pointer border border-[#E0E0E0] rounded-md"
                  src={item}
                  key={index}
                  alt=""
                />
              ))}
            </div>
            <div className="flex-1">
              <img className="w-full h-full object-contain rounded-xl" src={image} alt="" />
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#FFFFFF] shadow-md rounded-2xl p-6 flex-1 space-y-4">
          <h1 className="font-semibold text-xl">{productdata.name}</h1>

          <div className="flex items-center gap-1">
            {Array(4).fill().map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <span className="pl-2 text-gray-500 text-sm">(122)</span>
          </div>

          <p className="text-3xl font-bold">{currency}{productdata.price}</p>
          <p className="text-sm">{productdata.description}</p>

          {/* Size Selection */}
          <div>
            <p className="font-semibold">Select Size:</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {productdata.size.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  key={index}
                  className={`border px-4 py-1.5 rounded-full text-sm transition-transform duration-200 ${
                    size === item
                      ? 'bg-[#D87A5C] text-white border-[#D87A5C]'
                      : 'bg-[#F9F9F9] text-[#333333] border-[#E0E0E0] hover:border-[#D87A5C]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addtocart(productdata._id, size)}
            className="mt-4 bg-[#D87A5C] text-white px-6 py-2 rounded-md shadow hover:scale-105 transition-transform duration-200"
          >
            ADD TO CART
          </button>

          <hr className="my-4 border-[#E0E0E0]" />
          <div className="text-sm space-y-1 text-[#555]">
            <p>✔ 100% Original product</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#FFFFFF] shadow-md rounded-2xl p-6">
        <div className="flex border-b border-[#E0E0E0] mb-4">
          <button className="px-4 py-2 border-r border-[#E0E0E0] text-sm font-semibold text-[#D87A5C]">Description</button>
          <button className="px-4 py-2 text-sm text-gray-500">Reviews (122)</button>
        </div>
        <div className="text-sm text-[#333333] space-y-3">
          <p>Discover top-quality, stylish, and comfortable products designed to elevate your everyday experience.</p>
          <p>Each item is carefully curated and thoroughly tested to ensure maximum satisfaction.</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-[#FFFFFF] shadow-md rounded-2xl p-6">
        <ReleatedProduct
          category={productdata.category}
          subcatogory={productdata.subcatogory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
