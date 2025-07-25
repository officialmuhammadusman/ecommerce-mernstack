import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plus, List, ShoppingBag } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-16 sm:w-20 md:w-[18%] lg:w-[15%] xl:w-[18%] min-h-screen bg-[#F5F1EE] border-r border-[#E0E0E0] shadow-md rounded-tr-3xl rounded-br-3xl py-6 px-2 sm:px-4 md:px-6 flex flex-col gap-4 text-sm text-[#1A1F36] transition-all duration-300">
      
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? 'bg-[#D87A5C] text-white shadow-md'
              : 'hover:bg-[#F9F9F9] hover:text-[#D87A5C]'
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
        <span className="hidden md:inline truncate">Dashboard Overview</span>
      </NavLink>

      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? 'bg-[#D87A5C] text-white shadow-md'
              : 'hover:bg-[#F9F9F9] hover:text-[#D87A5C]'
          }`
        }
      >
        <Plus className="w-5 h-5 flex-shrink-0" />
        <span className="hidden md:inline truncate">Add New Items</span>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? 'bg-[#D87A5C] text-white shadow-md'
              : 'hover:bg-[#F9F9F9] hover:text-[#D87A5C]'
          }`
        }
      >
        <List className="w-5 h-5 flex-shrink-0" />
        <span className="hidden md:inline truncate">Manage Item List</span>
      </NavLink>

      <NavLink
        to="/order"
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-2 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? 'bg-[#D87A5C] text-white shadow-md'
              : 'hover:bg-[#F9F9F9] hover:text-[#D87A5C]'
          }`
        }
      >
        <ShoppingBag className="w-5 h-5 flex-shrink-0" />
        <span className="hidden md:inline truncate">Order Management</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
