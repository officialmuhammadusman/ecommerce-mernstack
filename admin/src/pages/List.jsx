import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl, currency } from "../App";
import { toast } from "react-toastify";
import { Package, Trash2, ImageOff, AlertCircle } from "lucide-react";

const List = ({ token }) => {
  const [list, setlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchlist = async () => {
    setIsLoading(true);
    try {
      const responce = await axios.get(backendurl + "/api/product/list");
      if (responce.data.success) {
        setlist(responce.data.product);
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeproduct = async (id) => {
    try {
      const responce = await axios.post(
        backendurl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (responce.data.success) {
        toast.success(responce.data.message);
        await fetchlist();
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProductId) {
      await removeproduct(selectedProductId);
      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1EE] py-4 xs:py-6 sm:py-8 md:py-12 px-2 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#F5F1EE] rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8 mb-4 xs:mb-6 sm:mb-8 md:mb-10 transform transition-all duration-300 hover:shadow-[0_10px_30px_rgba(216,122,92,0.3)]">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-[#D87A5C] rounded-lg xs:rounded-xl flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-extrabold text-[#1A1F36] tracking-tight">
                Product Catalog
              </h1>
              <p className="text-[#333333] text-sm xs:text-base sm:text-lg md:text-lg mt-1 xs:mt-1 sm:mt-2">
                Effortlessly manage your product inventory
              </p>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[100px_2fr_1fr_1fr_120px] items-center px-4 py-2 sm:px-6 sm:py-3 bg-[#FDEDE7] rounded-lg text-xs sm:text-sm font-bold text-[#D87A5C] border border-[#E0E0E0]">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Actions</span>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="py-6 xs:py-8 sm:py-10 text-center">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 border-4 border-[#D87A5C] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-[#333333] mt-2 text-sm xs:text-base sm:text-lg">Loading products...</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E0E0E0]">
              {list.length === 0 ? (
                <div className="py-6 xs:py-8 sm:py-10 text-center text-[#333333] flex flex-col items-center gap-1 xs:gap-2">
                  <AlertCircle size={24} className="text-[#B1AFAF]" />
                  <p className="text-base xs:text-lg sm:text-xl">No products available</p>
                </div>
              ) : (
                list.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[100px_2fr_1fr_1fr_120px] items-center px-2 py-3 sm:px-4 sm:py-4 hover:bg-[#FDEDE7] transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-lg xs:rounded-xl overflow-hidden bg-gray-100 border border-[#E0E0E0]">
                      {item.image && item.image[0] ? (
                        <img
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                          src={item.image[0]}
                          alt={item.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#B1AFAF]">
                          <ImageOff size={16} />
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-[#1A1F36] truncate mt-1 sm:mt-0">{item.name}</p>
                    <p className="text-[#333333] mt-1 sm:mt-0">{item.cateogory}</p>
                    <p className="text-[#333333] font-medium mt-1 sm:mt-0">{currency}{item.price}</p>
                    <div className="text-center mt-2 sm:mt-0">
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="p-1 sm:p-2 rounded-full bg-[#FDEDE7] text-[#D87A5C] hover:bg-[#F9E6DA] hover:text-[#BE6241] transition-all duration-300 transform hover:scale-110"
                        title="Remove Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-md w-full mx-2 sm:mx-4 shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
              <AlertCircle className="text-[#D87A5C]" size={20} />
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1F36]">Confirm Deletion</h3>
            </div>
            <p className="text-[#333333] text-sm sm:text-base mb-4 sm:mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-[#E0E0E0] text-[#333333] hover:bg-[#CFCFCF] transition-all duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-[#D87A5C] text-white hover:bg-[#BE6241] transition-all duration-200 text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
