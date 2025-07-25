import React from 'react'
import SlideInLeft from './SlideInLeft' // Import the scroll animation wrapper

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
    // Add form logic here (e.g., sending email to backend or showing a confirmation message)
  }

  return (
    <SlideInLeft>
      <div className="text-center max-w-2xl mx-auto px-6 py-12 bg-[#F5F1EE] rounded-[24px] shadow-md border border-[#D87A5C]/40">
        
        {/* Relevant heading above Tittle */}
        <h3 className="text-base uppercase tracking-widest text-[#1A1F36] mb-4 font-semibold">
          Stay Connected
        </h3>

        {/* Existing title */}
        <p className="text-3xl font-semibold text-[#1A1F36]">
          Subscribe now and get 20% off
        </p>

        {/* Description */}
        <p className="mt-4 text-[#1A1F36] text-base sm:text-lg max-w-xl mx-auto">
          Sign up to receive the latest updates, special offers, exclusive discounts, and early access to our newest products and collections.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-3/4 flex items-center gap-3 mx-auto mt-8 px-4 border border-[#D87A5C] rounded-full overflow-hidden"
        >
          <input
            className="w-full sm:flex-1 outline-none text-sm sm:text-base py-3 px-4 text-[#1A1F36] bg-[#F9F9F9]"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-[#D87A5C] text-[#F5F1EE] text-sm sm:text-base px-8 py-3 rounded-full hover:bg-[#b35a46] transition-colors duration-300"
          >
            SUBSCRIBE
          </button>
        </form>

      </div>
    </SlideInLeft>
  )
}

export default NewsletterBox
