import React, { useState } from "react";
import { backendurl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Upload, DollarSign, Tag, Star, X, Check, Camera } from "lucide-react";

const Add = ({ token }) => {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Men");
  const [subcategory, setsubcategory] = useState("Topwear");
  const [bestseller, setbestseller] = useState(false);
  const [size, setsize] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onsubmithandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("cateogory", category);
      formdata.append("subcategory", subcategory);
      formdata.append("bestseller", bestseller);
      formdata.append("size", JSON.stringify(size));
      image1 && formdata.append("image1", image1);
      image2 && formdata.append("image2", image2);
      image3 && formdata.append("image3", image3);
      image4 && formdata.append("image4", image4);

      const responce = await axios.post(backendurl + "/api/product/add", formdata, {
        headers: { token },
      });

      if (responce.data.sucess) {
        toast.success(responce.data.message);
        setname("");
        setdescription("");
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setprice("");
        setsize([]);
        setbestseller(false);
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ImageUpload = ({ image, setImage, id, label }) => (
    <div className="relative group">
      <label htmlFor={id} className="cursor-pointer block">
        <div className="relative w-16 h-16 xs:w-18 sm:w-20 md:w-24 lg:w-28 xs:h-18 sm:h-20 md:h-24 lg:h-28 rounded-lg border-2 border-dashed border-[#E0E0E0] hover:border-[#D87A5C] transition-colors duration-300 overflow-hidden bg-[#F5F1EE] hover:bg-[#F9F9F9]">
          {image ? (
            <>
              <img
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                src={URL.createObjectURL(image)}
                alt={label}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <Camera className="text-[#D87A5C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#333333]">
              <Upload className="w-4 h-4 xs:w-5 sm:w-5 md:w-6" />
              <span className="text-[10px] xs:text-xs sm:text-sm mt-1 text-center leading-tight">{label}</span>
            </div>
          )}
        </div>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id={id}
          className="hidden"
          accept="image/*"
        />
      </label>
      {image && (
        <button
          type="button"
          onClick={() => setImage(false)}
          className="absolute -top-2 -right-2 w-5 h-5 xs:w-6 sm:w-6 md:w-7 bg-[#D87A5C] hover:bg-[#c66a4e] text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-md"
        >
          <X className="w-3 h-3 xs:w-3 sm:w-3 md:w-4" />
        </button>
      )}
    </div>
  );

  const SizeButton = ({ sizeLabel }) => (
    <button
      type="button"
      onClick={() =>
        setsize((prev) =>
          prev.includes(sizeLabel)
            ? prev.filter((item) => item !== sizeLabel)
            : [...prev, sizeLabel]
        )
      }
      className={`px-2 py-1.5 xs:px-3 xs:py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-lg border-2 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs xs:text-sm sm:text-sm md:text-base ${
        size.includes(sizeLabel)
          ? "bg-[#D87A5C] border-[#D87A5C] text-white shadow-md"
          : "bg-[#F5F1EE] border-[#E0E0E0] text-[#333333] hover:border-[#D87A5C] hover:bg-[#F9F9F9]"
      }`}
    >
      {sizeLabel}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F5F1EE] py-4 xs:py-6 sm:py-8 md:py-10 px-2 xs:px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#F5F1EE] rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl shadow-lg p-3 xs:p-4 sm:p-5 md:p-6 mb-4 xs:mb-6 sm:mb-8 md:mb-10 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#D87A5C] rounded-lg xs:rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="text-white w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1F36] tracking-tight truncate">Add New Product</h1>
              <p className="text-[#333333] text-xs xs:text-sm sm:text-base md:text-lg mt-0.5 xs:mt-1 truncate">Create and manage your product catalog</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-[#F5F1EE] rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl shadow-lg p-3 xs:p-4 sm:p-5 md:p-6">
          <form className="space-y-4 xs:space-y-5 sm:space-y-6" onSubmit={onsubmithandler}>
            {/* Image Upload Section */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 xs:gap-2 sm:gap-2 md:gap-3">
                <Camera className="text-[#D87A5C] w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#1A1F36]">Product Images</h2>
              </div>
              <p className="text-[#333333] text-xs xs:text-sm sm:text-sm">Upload up to 4 high-quality images</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                <ImageUpload image={image1} setImage={setimage1} id="image1" label="Main" />
                <ImageUpload image={image2} setImage={setimage2} id="image2" label="Side" />
                <ImageUpload image={image3} setImage={setimage3} id="image3" label="Back" />
                <ImageUpload image={image4} setImage={setimage4} id="image4" label="Detail" />
              </div>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
              <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                <div>
                  <label className="flex items-center gap-1 xs:gap-1 sm:gap-2 text-xs xs:text-sm sm:text-sm font-medium text-[#333333] mb-1 xs:mb-1 sm:mb-2">
                    <Tag className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                    Product Name
                  </label>
                  <input
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    className="w-full px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#D87A5C] focus:border-transparent transition-all duration-300 bg-[#F5F1EE] hover:bg-[#F9F9F9] text-sm xs:text-sm sm:text-base text-[#333333]"
                    type="text"
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 xs:gap-1 sm:gap-2 text-xs xs:text-sm sm:text-sm font-medium text-[#333333] mb-1 xs:mb-1 sm:mb-2">
                    <DollarSign className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                    Price
                  </label>
                  <input
                    onChange={(e) => setprice(e.target.value)}
                    value={price}
                    className="w-full px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#D87A5C] focus:border-transparent transition-all duration-300 bg-[#F5F1EE] hover:bg-[#F9F9F9] text-sm xs:text-sm sm:text-base text-[#333333]"
                    type="number"
                    placeholder="25"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs xs:text-sm sm:text-sm font-medium text-[#333333] mb-1 xs:mb-1 sm:mb-2 block">Category</label>
                    <select
                      onChange={(e) => setcategory(e.target.value)}
                      value={category}
                      className="w-full px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#D87A5C] transition-all duration-300 bg-[#F5F1EE] hover:bg-[#F9F9F9] text-sm xs:text-sm sm:text-base text-[#333333]"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs xs:text-sm sm:text-sm font-medium text-[#333333] mb-1 xs:mb-1 sm:mb-2 block">Sub Category</label>
                    <select
                      onChange={(e) => setsubcategory(e.target.value)}
                      value={subcategory}
                      className="w-full px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#D87A5C] transition-all duration-300 bg-[#F5F1EE] hover:bg-[#F9F9F9] text-sm xs:text-sm sm:text-base text-[#333333]"
                    >
                      <option value="Topwear">Topwear</option>
                      <option value="Bottomwear">Bottomwear</option>
                      <option value="Winterwear">Winterwear</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs xs:text-sm sm:text-sm font-medium text-[#333333] mb-1 xs:mb-1 sm:mb-2 block">Description</label>
                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  className="w-full px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#D87A5C] resize-none transition-all duration-300 bg-[#F5F1EE] hover:bg-[#F9F9F9] text-sm xs:text-sm sm:text-base text-[#333333]"
                  rows="5"
                  required
                  placeholder="Write a detailed product description..."
                />
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h3 className="text-lg xs:text-lg sm:text-xl font-bold text-[#1A1F36]">Available Sizes</h3>
              <div className="flex gap-1 xs:gap-2 sm:gap-3 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((sizeLabel) => (
                  <SizeButton key={sizeLabel} sizeLabel={sizeLabel} />
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 p-2 xs:p-3 sm:p-4 bg-[#D87A5C]/10 rounded-lg border border-[#D87A5C]/30">
              <input
                onChange={() => setbestseller((prev) => !prev)}
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#D87A5C] border-[#E0E0E0] rounded focus:ring-[#D87A5C] flex-shrink-0"
              />
              <label htmlFor="bestseller" className="flex items-center gap-1 xs:gap-1 sm:gap-2 text-xs xs:text-sm sm:text-sm md:text-base text-[#D87A5C] font-medium cursor-pointer">
                <Star className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                Mark as Bestseller
              </label>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-3 xs:pt-4 sm:pt-6 border-t border-[#E0E0E0]">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center gap-1 xs:gap-2 sm:gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#D87A5C] hover:bg-[#c66a4e] shadow-md xs:shadow-md sm:shadow-lg transform hover:scale-105 active:scale-95"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs xs:text-sm sm:text-sm md:text-base">Adding Product...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span className="text-xs xs:text-sm sm:text-sm md:text-base">Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
