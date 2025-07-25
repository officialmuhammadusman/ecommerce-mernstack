import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { backendurl, currency } from "../App";
import { toast } from "react-toastify";
import { ShoppingCart, Box, Users, DollarSign, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    productsInStock: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [dailySummary, setDailySummary] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const statsResponse = await axios.post(
        backendurl + "/api/dashboard/stats",
        {},
        { headers: { token } }
      );
      if (statsResponse.data.success) {
        setStats(statsResponse.data.stats);
      } else {
        toast.error(statsResponse.data.message);
      }

      const dailyResponse = await axios.post(
        backendurl + "/api/dashboard/daily-summary",
        {},
        { headers: { token } }
      );
      if (dailyResponse.data.success) {
        setDailySummary(dailyResponse.data.dailySummary);
      } else {
        toast.error(dailyResponse.data.message);
      }

      const productsResponse = await axios.post(
        backendurl + "/api/dashboard/top-products",
        {},
        { headers: { token } }
      );
      if (productsResponse.data.success) {
        setTopProducts(productsResponse.data.topProducts);
      } else {
        toast.error(productsResponse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statItems = [
    { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart size={28} /> },
    { title: "Products in Stock", value: stats.productsInStock, icon: <Box size={28} /> },
    { title: "Total Customers", value: stats.totalCustomers, icon: <Users size={28} /> },
    { title: "Total Revenue", value: `${currency}${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EE] py-4 xs:py-6 sm:py-8 md:py-12 px-2 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#F5F1EE] rounded-2xl xs:rounded-3xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8 mb-4 xs:mb-6 sm:mb-8 md:mb-10 transform transition-all duration-500 hover:shadow-[0_10px_40px_rgba(216,122,92,0.3)]">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 bg-[#D87A5C] rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1F36] tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-[#333333] text-sm xs:text-base sm:text-lg md:text-xl mt-1 xs:mt-1 sm:mt-2">
                Monitor and manage your store performance
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-8 xs:py-10 sm:py-12 text-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 border-4 border-[#D87A5C] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-[#333333] mt-2 text-sm xs:text-base sm:text-lg font-medium">
              Loading dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mb-4 xs:mb-6 sm:mb-8 md:mb-10">
              {statItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3 xs:p-4 sm:p-5 flex items-center gap-2 xs:gap-3 transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(216,122,92,0.2)] transition-all duration-300"
                >
                  <div className="text-[#D87A5C] bg-[#FDEDE7] p-2 rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="text-[#333333] text-xs xs:text-sm font-medium">{item.title}</h4>
                    <p className="text-xl xs:text-2xl sm:text-2xl font-extrabold text-[#1A1F36]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Orders and Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-4 xs:mb-6 sm:mb-8 md:mb-10">
              <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-xl shadow-lg col-span-2 transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(216,122,92,0.2)] transition-all duration-300">
                <h2 className="text-lg xs:text-xl sm:text-xl font-bold text-[#1A1F36] mb-2 xs:mb-3 sm:mb-4">
                  Daily Orders & Revenue
                </h2>
                {dailySummary.length === 0 ? (
                  <div className="py-4 xs:py-5 sm:py-6 text-center text-[#333333] flex flex-col items-center gap-1 xs:gap-2">
                    <AlertCircle size={24} className="text-[#B1AFAF]" />
                    <p className="text-base xs:text-lg">No data available</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dailySummary}>
                      <XAxis dataKey="day" stroke="#7C7C7C" />
                      <YAxis stroke="#7C7C7C" />
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E0E0E0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="orders" fill="#D87A5C" radius={[4, 4, 0, 0]} barSize={30} />
                      <Bar dataKey="revenue" fill="#F5A96A" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Top Products */}
              <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(216,122,92,0.2)] transition-all duration-300">
                <h2 className="text-lg xs:text-xl sm:text-xl font-bold text-[#1A1F36] mb-2 xs:mb-3 sm:mb-4">
                  Top Products
                </h2>
                {topProducts.length === 0 ? (
                  <div className="py-4 xs:py-5 sm:py-6 text-center text-[#333333] flex flex-col items-center gap-1 xs:gap-2">
                    <AlertCircle size={24} className="text-[#B1AFAF]" />
                    <p className="text-base xs:text-lg">No products available</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-[#FDEDE7] rounded-lg hover:bg-[#F9E6DA] transition-all duration-200"
                      >
                        <p className="text-[#1A1F36] font-medium text-sm xs:text-base truncate">{product.name}</p>
                        <p className="text-[#D87A5C] font-semibold text-sm xs:text-base">{product.sold} sold</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
