import React from 'react';
import { assets } from '../assets/assets';
import SlideInLeft from './SlideInLeft';
import Tittle from './Tittle';

const policyItems = [
  {
    img: assets.exchange_icon,
    title: 'Easy Exchange Policy',
    desc: 'Simple, stress-free exchange for easy shopping.',
    alt: 'Exchange Icon',
  },
  {
    img: assets.quality_icon,
    title: 'Days Return Policy',
    desc: 'Return within 30 days for full satisfaction.',
    alt: 'Return Policy Icon',
  },
  {
    img: assets.support_img,
    title: 'Best Customer Support',
    desc: 'Our team ensures excellent, responsive support.',
    alt: 'Support Icon',
  },
];

const OurPolicy = () => {
  return (
    <SlideInLeft>
      <div className="my-10 px-4 py-10 bg-[#F5F1EE] text-[#333333] rounded-2xl">
        
        {/* Title Section */}
        <div className="text-center text-3xl py-6">
          <Tittle text1={'Our'} text2={'Policy'} />
          <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#D87A5C] mt-2">
            "We prioritize your peace of mind with straightforward, customer-first policies."
          </p>
        </div>

        {/* Policy Grid */}
        <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-6 text-center mt-8">
          {policyItems.map(({ img, title, desc, alt }, index) => (
            <SlideInLeft key={index}>
              <div className="bg-white rounded-3xl border-2 border-[#D87A5C]/30 shadow-lg p-8 flex flex-col items-center max-w-xs mx-auto
                              transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                
                <div className="rounded-full w-20 h-20 mb-6 bg-[#F5F1EE] flex items-center justify-center border border-[#D87A5C]/20">
                  <img src={img} alt={alt} className="w-12 h-12 object-contain" />
                </div>

                <h3 className="font-semibold text-lg text-[#1A1F36] mb-2">{title}</h3>
                <p className="text-sm text-[#333333]">{desc}</p>
              </div>
            </SlideInLeft>
          ))}
        </div>
      </div>
    </SlideInLeft>
  );
};

export default OurPolicy;
