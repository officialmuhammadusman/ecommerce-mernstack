import React from 'react';
import Hero from '../Components/Hero';
import LatestCollection from '../Components/LatestCollection';
import BestSeller from '../Components/BestSeller';
import OurPolicy from '../Components/OurPolicy';
import NewsletterBox from '../Components/NewsletterBox';
import SlideInLeft from '../Components/SlideInLeft';

const Home = () => {
  return (
    <main className="min-h-screen"> {/* Inherit bg-[#F5F1EE] from App */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-8 sm:py-12">
          <SlideInLeft delay={0.2}>
            <Hero />
          </SlideInLeft>
        </section>

        {/* Latest Collection Section */}
        <section className="py-8 sm:py-12">
          <SlideInLeft delay={0.4}>
            <LatestCollection />
          </SlideInLeft>
        </section>

        {/* Best Seller Section */}
        <section className="py-8 sm:py-12">
          <SlideInLeft delay={0.6}>
            <BestSeller />
          </SlideInLeft>
        </section>

        {/* Our Policy Section */}
        <section className="py-8 sm:py-12">
          <SlideInLeft delay={0.8}>
            <OurPolicy />
          </SlideInLeft>
        </section>

        {/* Newsletter Section */}
        <section className="py-8 sm:py-12">
          <SlideInLeft delay={1.0}>
            <NewsletterBox />
          </SlideInLeft>
        </section>
      </div>
    </main>
  );
};

export default Home;