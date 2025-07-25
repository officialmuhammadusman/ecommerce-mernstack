/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import SlideInLeft from './SlideInLeft';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowButton(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={footerRef} className="relative my-10 mt-40 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#F5F1EE] text-[#1A1F36]">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
        {/* Left Section */}
        <SlideInLeft>
          <div>
            <img className="w-32 mb-5" src={assets.logo} alt="Logo" />
            <p className="w-full md:w-2/3 text-[#333333]">
              Your trusted source for premium products. We offer the best quality and the latest trends at affordable prices.
            </p>
          </div>
        </SlideInLeft>

        {/* Middle Section: Simple Navbar Links only */}
        <SlideInLeft>
          <div>
            <p className="text-xl font-medium mb-5 text-[#1A1F36]">Explore</p>
            <ul className="flex flex-col gap-1 text-[#333333]">
              <li><Link to="/" className="hover:text-[#D87A5C] transition-colors duration-300">HOME</Link></li>
              <li><Link to="/collection" className="hover:text-[#D87A5C] transition-colors duration-300">COLLECTION</Link></li>
              <li><Link to="/about" className="hover:text-[#D87A5C] transition-colors duration-300">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-[#D87A5C] transition-colors duration-300">CONTACT</Link></li>
            </ul>
          </div>
        </SlideInLeft>

        {/* Right Section */}
        <SlideInLeft>
          <div>
            <p className="text-xl font-medium mb-5 text-[#1A1F36]">Get in Touch</p>
            <ul className="flex flex-col gap-1 text-[#333333] mb-3">
              <li>+92 300 1234567</li>
              <li>contact@foreveryou.com</li>
            </ul>
            <div className="flex gap-4 text-xl text-[#D87A5C]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b35a46] transition-colors duration-300"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b35a46] transition-colors duration-300"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b35a46] transition-colors duration-300"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b35a46] transition-colors duration-300"><FaLinkedin /></a>
            </div>
          </div>
        </SlideInLeft>
      </div>

      {/* Footer Bottom Text */}
      <div>
        <hr className="mt-10 border-[#D87A5C]/50" />
        <SlideInLeft>
          <p className="py-5 text-center text-sm text-[#333333]">
            &copy; 2024 Forever.com. All rights reserved. Designed with care to provide premium quality products and excellent customer service.
          </p>
        </SlideInLeft>
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-[#D87A5C] text-[#F5F1EE] text-xl font-bold p-3 rounded-full hover:bg-[#b35a46] transition duration-300 z-50 shadow-md"
          title="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Footer;
