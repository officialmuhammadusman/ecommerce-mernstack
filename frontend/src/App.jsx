import React from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopContextProvider from './Context/ShopContext';
import RouteTransitionProvider from './Components/RouteTransitionProvider';

const App = () => {
  return (
    <ShopContextProvider>
      <ToastContainer />

      <RouteTransitionProvider>
        {/* Whole page bg color */}
        <div className="min-h-screen flex flex-col bg-[#F5F1EE] text-[#333333] font-sans">

          {/* Navbar with matching bg */}
          <header className="bg-[#F5F1EE] z-50">
            <Navbar />
          </header>

          {/* SearchBar can inherit or have transparent bg */}
          <SearchBar />

          {/* Main content area with no bg override, so inherits from parent */}
          <main className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
            <Outlet />
          </main>

          {/* Footer with matching bg */}
          <footer className="bg-[#F5F1EE]">
            <Footer />
          </footer>
        </div>
      </RouteTransitionProvider>
    </ShopContextProvider>
  );
};

export default App;
