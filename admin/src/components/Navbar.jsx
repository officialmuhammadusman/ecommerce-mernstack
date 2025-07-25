import React from 'react';
import { assets } from '../assets/assets';
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ settoken }) => {
  return (
    <nav className="bg-[#F5F1EE] shadow-md px-4 sm:px-[5%] py-3 sm:py-4 border-b border-[#E0E0E0] rounded-b-2xl z-50 flex items-center justify-between">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-xl shadow-sm border border-[#E0E0E0]"
        />
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A1F36]">
          <span className="hidden sm:inline">Admin Panel</span>
          <span className="sm:hidden">Admin</span>
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => settoken('')}
        className="flex items-center gap-2 px-4 py-2 bg-[#D87A5C] hover:bg-[#c96b51] text-white font-medium rounded-full text-sm shadow transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D87A5C]/50 active:scale-95"
      >
        <FiLogOut className="text-base" />
        <span className="hidden xs:inline">Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
