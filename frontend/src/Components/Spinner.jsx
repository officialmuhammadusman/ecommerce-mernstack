/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#F9F9F9] via-[#F5F1EE] to-[#F9F9F9] backdrop-blur-sm">
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 1.2,
        }}
      >
        {/* Subtle spinning ring with theme colors */}
        <div className="absolute w-full h-full rounded-full
          border-4 border-t-[#1A1F36] border-b-[#A0A9BF] border-l-transparent border-r-transparent shadow-xl" />

        {/* Bouncing accent dot */}
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-[#D87A5C]"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, ease: 'easeInOut', duration: 1.2 }}
        />
      </motion.div>

      {/* Professional loading text */}
      <div className="absolute bottom-16 text-center text-[#1A1F36] font-medium text-base animate-pulse">
        Loading, please wait...
      </div>
    </div>
  );
};

export default Spinner;
