import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import {
  PlusSmallIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
const Sidebar = () => {
  return (
    <div className=" hidden bg-[#202123] md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col ">
      <div className="flex h-full  flex-col p-2 justify-between">
        <div>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
            <PlusSmallIcon className="w-4 h-4" />
            New Chat
          </a>
        </div>
        <div className="border-t border-white/20 ">
          <div className="flex flex-col gap-2 text-gray-100 text-sm">
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <TrashIcon className="w-4 h-4" />
              Clear Conversations
            </a>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Updates &amp; FAQ
            </a>

            <a
              onClick={() => signOut(auth)}
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
