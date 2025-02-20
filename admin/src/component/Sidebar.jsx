import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[250px] min-h-screen border-r-2 bg-white shadow-md">
      <div className="flex flex-col gap-4 pt-6 px-6 text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-black px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          to="/add"
        >
          <span className="text-lg font-semibold text-black">Add Items</span>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-black px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          to="/list"
        >
          <span className="text-lg font-semibold text-black">List Items</span>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-black px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          to="/orders"
        >
          <span className="text-lg font-semibold text-black">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
