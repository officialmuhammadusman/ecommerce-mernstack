import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { User, Package, LogOut, Home, Info, Phone, Shirt } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setshowsearch, cartcount, token, settoken, setcartitem } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    settoken('');
    setcartitem({});
    navigate('/login');
  };

  return (
    <>
      <div className="sticky top-0 bg-[#F5F1EE] text-[#333333] backdrop-blur-md shadow-[0_4px_12px_rgba(26,31,54,0.1)] border-b border-[#E0E0E0] px-3 xs:px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-3 h-24 flex items-center justify-between font-medium transition-all duration-300 z-50">
        <Link to="/" className="flex-shrink-0 h-full flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-full w-auto object-contain" />
          <span className="text-[#1A1F36] font-extrabold text-xl sm:text-2xl tracking-tight hover:scale-105 transition-transform duration-300">
            SHOPPIKO
          </span>
        </Link>

        <ul className="hidden lg:flex gap-1 xl:gap-2 text-sm">
          {[
            { name: 'HOME', to: '/' },
            { name: 'COLLECTION', to: '/collection' },
            { name: 'ABOUT', to: '/about' },
            { name: 'CONTACT', to: '/contact' },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) =>
                `px-3 xl:px-4 py-2 rounded-full font-semibold tracking-wide uppercase text-xs xl:text-sm
                transition-all duration-300 ease-in-out transform relative overflow-hidden group
                ${isActive
                  ? 'bg-[#D87A5C] text-white shadow-md scale-105'
                  : 'text-[#333333] hover:text-[#D87A5C] hover:scale-105 hover:bg-[#F9F9F9]'
                }`
              }
            >
              <span className="relative z-10">{item.name}</span>
              <div className="absolute inset-0 bg-[#D87A5C] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          <button
            onClick={() => setshowsearch(true)}
            className="p-2 rounded-full hover:bg-[#F9F9F9] transition-all duration-300 group"
            aria-label="Search"
          >
            <img
              src={assets.search_icon}
              className="w-4 xs:w-5 sm:w-5 group-hover:scale-110 transition-transform duration-300"
              alt="Search"
            />
          </button>

          <div className="group relative">
            <button
              onClick={() => !token && navigate('/login')}
              className="p-2 rounded-full hover:bg-[#F9F9F9] transition-all duration-300 group"
              aria-label="Profile"
            >
              <img
                src={assets.profile_icon}
                className="w-4 xs:w-5 sm:w-5 group-hover:scale-110 transition-transform duration-300"
                alt="Profile"
              />
            </button>

            {token && (
              <div className="group-hover:block hidden absolute right-0 top-full pt-2 transition-all duration-300">
                <div className="flex flex-col gap-1 w-44 px-2 py-3 bg-[#F5F1EE] border border-[#E0E0E0] rounded-xl shadow-lg backdrop-blur-sm">
                  {[
                    { label: 'My Profile', onClick: () => {}, icon: <User size={16} /> },
                    { label: 'Orders', onClick: () => navigate('/order'), icon: <Package size={16} /> },
                    { label: 'Logout', onClick: logout, icon: <LogOut size={16} /> },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="flex items-center gap-3 text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-[#F9F9F9] hover:text-[#D87A5C] active:scale-95 group/item"
                    >
                      <span className="text-base group-hover/item:scale-110 transition-transform">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-[#F9F9F9] transition-all duration-300 group"
            aria-label="Shopping Cart"
          >
            <img
              src={assets.cart_icon}
              className="w-4 xs:w-5 sm:w-5 group-hover:scale-110 transition-transform duration-300"
              alt="Cart"
            />
            {cartcount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 xs:w-6 xs:h-6 bg-[#D87A5C] text-white rounded-full flex items-center justify-center text-[10px] xs:text-xs font-bold shadow-md animate-pulse">
                {cartcount() > 99 ? '99+' : cartcount()}
              </span>
            )}
          </Link>

          <button
            onClick={() => setVisible(prev => !prev)}
            className="lg:hidden p-2 rounded-full hover:bg-[#F9F9F9] transition-all duration-300 group"
            aria-label="Menu"
          >
            <div className="relative w-5 h-5 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-[#333333] transition-all duration-300 ${visible ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-[#333333] transition-all duration-300 ${visible ? 'opacity-0' : 'opacity-100 my-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-[#333333] transition-all duration-300 ${visible ? '-rotate-45 translate-y-0' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-40 lg:hidden ${
          visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setVisible(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#F5F1EE] shadow-xl transition-all duration-500 ease-in-out z-50 lg:hidden ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 xs:p-6 border-b border-[#E0E0E0] bg-[#F5F1EE]">
            <div className="flex items-center gap-3">
              <img src={assets.logo} className="w-8 h-8 rounded-lg" alt="Logo" />
              <h2 className="font-bold text-lg text-[#1A1F36]">Menu</h2>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-full hover:bg-white/50 transition-all duration-300"
              aria-label="Close Menu"
            >
              <div className="w-5 h-5 relative">
                <span className="absolute inset-0 w-5 h-0.5 bg-[#333333] rotate-45 top-2"></span>
                <span className="absolute inset-0 w-5 h-0.5 bg-[#333333] -rotate-45 top-2"></span>
              </div>
            </button>
          </div>

          <div className="flex-1 py-4">
            <nav className="space-y-1 px-4">
              {[
                { name: 'HOME', to: '/', icon: <Home size={18} /> },
                { name: 'COLLECTION', to: '/collection', icon: <Shirt size={18} /> },
                { name: 'ABOUT', to: '/about', icon: <Info size={18} /> },
                { name: 'CONTACT', to: '/contact', icon: <Phone size={18} /> },
              ].map((item, i) => (
                <NavLink
                  key={i}
                  onClick={() => setVisible(false)}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-[#D87A5C] text-white shadow-md'
                        : 'text-[#333333] hover:bg-[#F9F9F9] hover:text-[#D87A5C]'
                    }`
                  }
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-semibold text-base tracking-wide">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {token && (
            <div className="border-t border-[#E0E0E0] p-4">
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-semibold text-[#999] uppercase tracking-wider">Account</div>
                {[
                  { label: 'My Profile', onClick: () => { setVisible(false); }, icon: <User size={18} /> },
                  { label: 'Orders', onClick: () => { setVisible(false); navigate('/order'); }, icon: <Package size={18} /> },
                  { label: 'Logout', onClick: () => { setVisible(false); logout(); }, icon: <LogOut size={18} /> },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-[#F9F9F9] hover:text-[#D87A5C] active:scale-95 group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!token && (
            <div className="border-t border-[#E0E0E0] p-4">
              <button
                onClick={() => { setVisible(false); navigate('/login'); }}
                className="w-full bg-[#D87A5C] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Sign In / Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
