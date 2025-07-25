import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl, currency } from "../App";
import { toast } from "react-toastify";
import {
  Package,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle,
  ClipboardList,
  Box,
  User,
  ShoppingBag,
  Phone,
  MapPin,
  CalendarDays,
  CreditCard
} from "lucide-react";

const Orders = ({ token }) => {
  const [order, setorder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchallorders = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        backendurl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setorder(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const statushandler = async (e, orderid) => {
    try {
      const response = await axios.post(
        backendurl + "/api/order/status",
        { orderid, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchallorders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status: " + (error.response?.data?.message || error.message));
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    fetchallorders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Custom status colors based on your palette
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-[#D1E8FF] text-[#3B82F6] border-[#93C5FD]";       // Soft blue tones
      case "Packing":
        return "bg-[#FFF4E5] text-[#D87A5C] border-[#FBB6B6]";          // Your accent for packing
      case "Shipped":
        return "bg-[#E7D5FF] text-[#9F7AEA] border-[#C4B5FD]";         // Purple tones
      case "Out for Delivery":
        return "bg-[#FFE7D6] text-[#F97316] border-[#FDBA74]";          // Orange tones
      case "Delivered":
        return "bg-[#D1FAE5] text-[#22C55E] border-[#86EFAC]";          // Green tones
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <p className="flex items-center gap-1.5 text-[#333333] text-xs xs:text-sm sm:text-base">
      {Icon && <Icon size={14} className="flex-shrink-0 text-[#B1AFAF]" />}
      <span className="font-semibold text-[#1A1F36]">{label}:</span>
      <span className="text-[#1A1F36]">{value}</span>
    </p>
  );

  return (
    <div className="min-h-screen bg-[#F5F1EE] py-4 xs:py-6 sm:py-8 md:py-12 px-2 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#F5F1EE] rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8 mb-4 xs:mb-6 sm:mb-8 md:mb-10 transform transition-all duration-300 hover:shadow-[0_10px_30px_rgba(216,122,92,0.3)]">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#D87A5C] rounded-lg xs:rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="text-white w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1F36] tracking-tight">
                Order Management
              </h1>
              <p className="text-[#333333] text-sm xs:text-base sm:text-lg md:text-xl mt-1 xs:mt-1 sm:mt-2">
                Track and manage customer orders with ease
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8">
          {isLoading ? (
            <div className="py-6 xs:py-8 sm:py-10 text-center">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 border-4 border-[#D87A5C] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-[#333333] mt-2 text-sm xs:text-base sm:text-lg font-medium">Loading orders...</p>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-6">
              {order.length === 0 ? (
                <div className="py-6 xs:py-8 sm:py-10 text-center text-[#333333] flex flex-col items-center gap-1.5 xs:gap-2 sm:gap-3">
                  <AlertCircle size={32} className="text-[#B1AFAF] animate-pulse" />
                  <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-medium">No orders available</p>
                  <p className="text-sm xs:text-base text-[#B1AFAF]">Looks like a quiet day. Check back later!</p>
                </div>
              ) : (
                order.map((orderItem) => (
                  <div
                    key={orderItem._id}
                    className="border border-[#E0E0E0] rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 bg-gradient-to-r from-white to-[#FDEDE7]/30 hover:shadow-[0_6px_20px_rgba(216,122,92,0.2)] transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div
                      className="flex flex-col sm:flex-row justify-between items-center cursor-pointer gap-2 sm:gap-4"
                      onClick={() => toggleOrderDetails(orderItem._id)}
                    >
                      <div className="flex items-center gap-2 xs:gap-3">
                        {/* Dynamic icon based on status */}
                        {orderItem.status === "Order Placed" && (
                          <ClipboardList className="text-[#3B82F6] w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        {orderItem.status === "Packing" && (
                          <Box className="text-[#D87A5C] w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        {orderItem.status === "Shipped" && (
                          <Truck className="text-[#9F7AEA] w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        {orderItem.status === "Out for Delivery" && (
                          <Truck className="text-[#F97316] w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        {orderItem.status === "Delivered" && (
                          <CheckCircle className="text-[#22C55E] w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        <div>
                          <p className="text-sm xs:text-base sm:text-lg font-bold text-[#1A1F36] truncate">
                            Order #{orderItem._id.slice(-6)}
                          </p>
                          <p className="text-[#333333] text-xs xs:text-sm sm:text-base">
                            <CalendarDays size={12} className="inline mr-1 text-[#B1AFAF]" />
                            {new Date(orderItem.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 xs:gap-3 mt-2 sm:mt-0">
                        <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-[#D87A5C]">
                          {currency}
                          {orderItem.amount}
                        </p>
                        {expandedOrder === orderItem._id ? (
                          <ChevronUp className="text-[#333333] w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronDown className="text-[#333333] w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                    </div>

                    {expandedOrder === orderItem._id && (
                      <div className="mt-4 xs:mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2.5fr_1.5fr_1fr] gap-4 xs:gap-5 sm:gap-6 animate-[fadeIn_0.4s_ease-out]">
                        {/* Items Section */}
                        <div className="space-y-2 xs:space-y-3 p-3 border-t border-[#E0E0E0] md:border-t-0 md:border-r md:pr-4">
                          <p className="text-xs xs:text-sm sm:text-base font-semibold text-[#1A1F36] mb-1 xs:mb-2 flex items-center gap-1.5">
                            <ShoppingBag size={16} className="text-[#D87A5C]" /> Items ({orderItem.items.length})
                          </p>
                          <ul className="space-y-1 xs:space-y-1.5">
                            {orderItem.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-[#1A1F36] font-medium text-xs xs:text-sm sm:text-base"
                              >
                                {item.name} x {item.quantity} {item.size ? `(${item.size})` : ""}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Customer & Address Section */}
                        <div className="space-y-2 xs:space-y-3 p-3 border-t border-[#E0E0E0] md:border-t-0 md:border-r lg:pr-4">
                          <p className="text-xs xs:text-sm sm:text-base font-semibold text-[#1A1F36] mb-1 xs:mb-2 flex items-center gap-1.5">
                            <User size={16} className="text-[#22C55E]" /> Customer
                          </p>
                          <div className="space-y-0.5">
                            <InfoRow
                              label="Name"
                              value={orderItem.address.firstname + " " + orderItem.address.lastname}
                            />
                            <InfoRow
                              icon={MapPin}
                              label="Address"
                              value={`${orderItem.address.street}, ${orderItem.address.city}, ${orderItem.address.state}, ${orderItem.address.country}, ${orderItem.address.zipcode}`}
                            />
                            <InfoRow icon={Phone} label="Phone" value={orderItem.address.phone} />
                          </div>
                        </div>

                        {/* Order Summary & Status Section */}
                        <div className="space-y-2 xs:space-y-3 p-3 border-t border-[#E0E0E0] lg:border-t-0">
                          <p className="text-xs xs:text-sm sm:text-base font-semibold text-[#1A1F36] mb-1 xs:mb-2">Summary</p>
                          <InfoRow icon={ShoppingBag} label="Total Items" value={orderItem.items.length} />
                          <InfoRow icon={CreditCard} label="Payment Method" value={orderItem.paymentMethod} />
                          <InfoRow label="Payment Status" value={orderItem.payment ? "Paid" : "Pending"} />
                          <InfoRow
                            icon={CalendarDays}
                            label="Order Date"
                            value={new Date(orderItem.date).toLocaleDateString()}
                          />

                          <p className="text-xs xs:text-sm sm:text-base font-semibold text-[#1A1F36] mb-1 xs:mb-2 mt-3">
                            Update Status
                          </p>
                          <select
                            onChange={(e) => statushandler(e, orderItem._id)}
                            value={orderItem.status}
                            className={`w-full px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#D87A5C] text-xs xs:text-sm sm:text-base transition-all duration-300 ${getStatusColor(orderItem.status)}`}
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Orders;
