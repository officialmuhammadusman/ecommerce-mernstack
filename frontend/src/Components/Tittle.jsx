import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Tittle = ({ text1, text2 }) => {
  return (
    <motion.div
      className="inline-flex gap-2 items-center mb-3"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Use Deep Navy for text1 */}
      <p className="text-[#1A1F36]">
        {text1} <span className="text-[#D87A5C] font-medium">{text2}</span>
      </p>
      {/* Accent line in Rust / Terracotta */}
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#D87A5C]"></p>
    </motion.div>
  );
};

export default Tittle;
