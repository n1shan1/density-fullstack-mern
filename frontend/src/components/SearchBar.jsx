import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/collection") && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]); // Added showSearch to dependencies

  if (!showSearch || !visible) return null;

  return (
    <div className="border-t border-b border-gray-500 text-center">
      <div className="inline-flex items-center justify-between border border-gray-500 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="outline-none bg-inherit text-sm"
          type="text"
          aria-label="Search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="Search icon" />
      </div>
      <button
        onClick={() => setShowSearch(false)}
        aria-label="Close search bar"
      >
        <img
          className="inline w-3 cursor-pointer"
          src={assets.cross_icon}
          alt="Close search bar"
        />
      </button>
    </div>
  );
};

export default SearchBar;
