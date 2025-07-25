import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setsearch, showsearch, setshowsearch } = useContext(ShopContext)
  const [visible, setvisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setvisible(true)
    } else {
      setvisible(false)
    }
  }, [location])

  return showsearch && visible ? (
    <div className="border-t border-b border-[#F9F9F9] text-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#F5F1EE]">
      <div className="inline-flex items-center justify-center border border-[#D87A5C] px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm text-[#333333]"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="Search Icon" />
      </div>
      <img
        onClick={() => setshowsearch(false)}
        className="inline w-4 cursor-pointer mt-2"
        src={assets.cross_icon}
        alt="Close Search"
        title="Close Search"
      />
    </div>
  ) : null
}

export default SearchBar
