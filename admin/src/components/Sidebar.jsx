import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";
const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen rounded-r-2 border-r-2">
      <div className="flex flex-col gap-5 pt-6 pl-[20%] text-[15p]">
        <NavLink
          className={
            "flex items-center gap-5 border border-gray-200 border-r-0 px-3 py-2"
          }
          to={"/add"}
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className={
            "flex items-center gap-5 border border-gray-200 border-r-0 px-3 py-2"
          }
          to={"/list"}
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className={
            "flex items-center gap-5 border border-gray-200 border-r-0 px-3 py-2"
          }
          to={"/orders"}
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
