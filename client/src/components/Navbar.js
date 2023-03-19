import React from "react";
import { PlusSmallIcon, Bars3Icon } from "@heroicons/react/24/outline";
const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/20 bg-[#343541] pl-3 pt-1 text-gray-200 sm:pl-3 md:hidden ">
      <button className=" w-10 h-10">
        <Bars3Icon className="w-4 h-4" />
      </button>
      <p>New Chat</p>
      <button className=" w-10 h-10">
        <PlusSmallIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Navbar;
