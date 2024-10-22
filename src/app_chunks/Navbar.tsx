"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoNotificationsOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Navbar = () => {
  const name = "faheem";
  return (
    <div className="w-full flex justify-between items-start xl:mt-5 xxl:mt-10 xl:px-3 xxl:px-10">
      <div className="w-full">
        <p className="font-Satoshi xl:text-2xl xxl:text-4xl font-bold  ">
          Welcome back,{" "}
          <span className="text-[#6b3417] font-Spline capitalize">{name}!</span>
        </p>
        <p className="xl:text-md xxl:text-lg font-medium font-Satoshi mt-2 text-gray-500">
          Take a look at the updated dashboard overview
        </p>
      </div>

      <div>
        <Popover>
          <PopoverTrigger>
            <div className="relative group">
              <motion.div
                animate={{ scale: [0, 1] }}
                transition={{
                  delay: 1,
                }}
                className="absolute top-0 right-1 size-[.4rem] bg-[#F44336] rounded-full"
              />
              <div className="absolute pointer-events-none group-hover:block hidden rounded-full top-full bg-gray-200 left-1/2 -translate-x-1/2">
                <p className="font-Satoshi font-medium px-3 py-1 ">
                  Notifications
                </p>
              </div>
              <IoNotificationsOutline className="xl:text-xl xxl:text-3xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent>No new notifications</PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
