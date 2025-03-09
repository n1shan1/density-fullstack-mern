import React, { isValidElement, useContext, useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    showSearch,
    getCartCount,
    token,
    navigate,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logoutHandler = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-4 font-medium">
      <Link to={"/"}>
        <img className="w-36" src={assets.logo} alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-600">
        <NavLink className="flex flex-col items-center gap-1" to={"/"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          className="flex flex-col items-center gap-1"
          to={"/collection"}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/about"}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/contact"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* right side of the navbar */}

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="icon"
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="icon"
            className="w-5 cursor-pointer"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/order")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logoutHandler}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* sidebar menu for smaller screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-700 rounded-lg border border-gray-500 ${
          visible ? "w-[97vw]" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 m-8 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="icon"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/"}
            className={"py-2 pl-6 "}
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/collection"}
            className={"py-2 pl-6 "}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/about"}
            className={"py-2 pl-6 "}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/contact"}
            className={"py-2 pl-6 "}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
