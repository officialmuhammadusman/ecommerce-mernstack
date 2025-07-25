import React from "react";
import Tittle from "../Components/Tittle";
import { assets } from "../assets/assets";
import NewsletterBox from "../Components/NewsletterBox";
import SlideInLeft from "../Components/SlideInLeft";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Title Card */}
      <SlideInLeft>
        <div className="pt-10 border-t dark:border-gray-700">
          <div className="bg-white dark:bg-[#1e1e1e] shadow-md rounded-[24px] p-6 text-center">
            <Tittle text1="CONTACT" text2="US" />
          </div>
        </div>
      </SlideInLeft>

      {/* Contact Info Card */}
      <SlideInLeft>
        <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
          <div className="w-full md:w-[480px]">
            <img
              className="w-full rounded-[24px] shadow-md"
              src={assets.contact_img}
              alt="Contact Us"
            />
          </div>

          <div className="flex-1">
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-[24px] p-8 shadow-md h-full flex flex-col justify-center gap-6">
              <div>
                <p className="font-semibold text-xl text-gray-700 dark:text-white">
                  Our Store
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  COMSATS Main Road
                  <br />
                  Abbottabad, Pakistan
                </p>
              </div>

              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  Tel: +92-992-383591
                  <br />
                  Email: admin@shopease.com
                </p>
              </div>

              <div>
                <p className="font-semibold text-xl text-gray-700 dark:text-white">
                  Careers at Foreever
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn more about our team and job openings
                </p>
              </div>

              <button className="self-center border border-black dark:border-white px-6 py-2 text-sm rounded-full text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </SlideInLeft>

      {/* Newsletter Card */}
      <SlideInLeft>
        <div className="mb-10">
          <NewsletterBox />
        </div>
      </SlideInLeft>
    </div>
  );
};

export default Contact;
