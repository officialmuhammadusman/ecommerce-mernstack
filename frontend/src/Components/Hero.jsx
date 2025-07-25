import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import SlideInLeft from './SlideInLeft';

const Hero = () => {
  return (
    <div className='relative flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-[#FEFEFE] via-[#F8F6F4] to-[#F2EFE8] overflow-hidden rounded-2xl border border-[#E0E0E0] shadow-md'>

      {/* Background Decoration */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-[#D87A5C] rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-[#1A1F36] rounded-full blur-3xl'></div>
      </div>

      {/* Hero Left */}
      <div className='relative z-10 w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20'>
        <SlideInLeft>
          <div className='max-w-lg'>

            {/* Badge */}
            <div className='inline-flex items-center gap-3 mb-6'>
              <div className='w-12 h-[2px] bg-gradient-to-r from-[#D87A5C] to-[#E6956C]'></div>
              <span className='text-xs font-semibold tracking-[0.2em] text-[#666666] uppercase'>
                Premium Collection
              </span>
            </div>

            {/* Headings */}
            <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-[#1A1F36] mb-6'>
              <span className='block'>Latest</span>
              <span className='block font-light italic text-[#D87A5C] -mt-2'>Arrivals</span>
            </h1>

            <p className='text-lg text-[#555555] leading-relaxed mb-8 max-w-md'>
              Discover our carefully curated collection of premium products, 
              designed for the modern professional.
            </p>

            {/* CTA Buttons */}
            <div className='flex items-center gap-4'>
              <Link
                to="/collection"
                className='group relative overflow-hidden rounded-md bg-[#1A1F36] text-white px-8 py-4 font-medium tracking-wide uppercase transition-all duration-300 hover:bg-[#2A3046] hover:shadow-lg hover:shadow-[#1A1F36]/20'
              >
                <span className='relative z-10'>Explore Collection</span>
                <div className='absolute inset-0 bg-gradient-to-r from-[#D87A5C] to-[#E6956C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                <span className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white font-medium'>
                  Explore Collection
                </span>
              </Link>

              <div className='flex items-center gap-3 text-[#D87A5C] cursor-pointer group'>
                <span className='text-sm font-medium tracking-wide uppercase'>View Catalog</span>
                <div className='w-8 h-[1px] bg-[#D87A5C] group-hover:w-12 transition-all duration-300'></div>
                <svg className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className='flex items-center gap-8 mt-12 pt-8 border-t border-[#E8E5E1]'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-[#1A1F36]'>500+</div>
                <div className='text-xs text-[#666666] uppercase tracking-wide'>Products</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-[#1A1F36]'>50k+</div>
                <div className='text-xs text-[#666666] uppercase tracking-wide'>Customers</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-[#1A1F36]'>4.9★</div>
                <div className='text-xs text-[#666666] uppercase tracking-wide'>Rating</div>
              </div>
            </div>
          </div>
        </SlideInLeft>
      </div>

      {/* Hero Right */}
      <div className='relative w-full lg:w-1/2 min-h-[400px] lg:min-h-full'>
        <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10'></div>
        <img 
          className='w-full h-full object-cover' 
          src={assets.hero_img} 
          alt="Latest Collection - Premium Products" 
        />

        {/* Floating Card */}
        <div className='absolute bottom-8 left-8 right-8 lg:bottom-12 lg:left-12 lg:right-auto lg:max-w-xs bg-white/95 backdrop-blur-sm p-6 shadow-xl rounded-lg z-20'>
          <div className='flex items-center gap-4 mb-3'>
            <div className='w-2 h-2 bg-[#D87A5C] rounded-full animate-pulse'></div>
            <span className='text-xs font-semibold text-[#666666] uppercase tracking-wide'>
              New Arrival
            </span>
          </div>
          <h3 className='font-semibold text-[#1A1F36] mb-2'>Premium Quality</h3>
          <p className='text-sm text-[#666666] leading-relaxed'>
            Crafted with attention to detail and premium materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
