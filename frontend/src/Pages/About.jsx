import React from "react";
import Tittle from "../Components/Tittle";
import NewsletterBox from "../Components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 bg-[#F5F1EE] dark:bg-[#1e1e1e] text-[#1A1F36] dark:text-white">
      {/* ABOUT US Title */}
      <div className="text-2xl text-center pt-8 border-t border-[#E0E0E0] dark:border-gray-700">
        <Tittle text1="ABOUT" text2="US" />
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[460px] rounded-[24px] shadow-lg"
          src={assets.about_img}
          alt="About TrendyCart"
        />

        <div className="flex flex-col gap-6 md:w-2/4">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#2a2a2a] border border-[#E0E0E0] dark:border-gray-700 rounded-[24px] p-6 shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <p className="text-[#333] dark:text-gray-300 text-base leading-relaxed">
              At TrendyCart, we're passionate about delivering high-quality
              products that combine style, comfort, and value. Our mission is to
              make your shopping experience seamless, enjoyable, and
              trustworthy—every time you visit.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#2a2a2a] border border-[#E0E0E0] dark:border-gray-700 rounded-[24px] p-6 shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <p className="text-[#333] dark:text-gray-300 text-base leading-relaxed">
              We believe that great service begins with real connections. Whether
              you're shopping for yourself or a loved one, we’re here to support
              you—from browsing to checkout and beyond.
            </p>
          </div>

          {/* Card 3 (Mission) */}
          <div className="bg-white dark:bg-[#2a2a2a] border border-[#E0E0E0] dark:border-gray-700 rounded-[24px] p-6 shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <h3 className="text-[#1A1F36] dark:text-white font-semibold mb-2 text-lg">
              Our Mission
            </h3>
            <p className="text-[#333] dark:text-gray-300 text-base leading-relaxed">
              At TrendyCart, our mission is to provide top-quality products that
              blend style, comfort, and affordability. We’re dedicated to creating
              a smooth and enjoyable shopping experience that keeps customers
              coming back.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Title */}
      <div className="text-2xl py-4">
        <Tittle text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Why Choose Us Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Quality Assurance",
            desc:
              "We ensure every product meets strict quality standards before it reaches your doorstep, delivering only the best in durability, performance, and satisfaction.",
          },
          {
            title: "Convenience",
            desc:
              "Enjoy a seamless shopping experience with easy navigation, secure checkout, and fast delivery—all designed to save you time and effort.",
          },
          {
            title: "Exceptional Support",
            desc:
              "Our responsive team is always ready to help, ensuring your questions are answered and your concerns are resolved quickly and efficiently.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2a2a2a] border border-[#E0E0E0] dark:border-gray-700 rounded-[24px] 
            p-6 sm:p-8 shadow-lg text-center flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-lg text-[#1A1F36] dark:text-white">
              {item.title}
            </h3>
            <p className="text-[#333] dark:text-gray-400 text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <NewsletterBox />
    </div>
  );
};

export default About;
