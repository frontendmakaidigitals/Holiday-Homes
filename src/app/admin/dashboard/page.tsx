"use client";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
const Page = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/blogs");
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className=" w-full xl:px-3 xxl:px-7 xxxl:px-10 xl:mt-5 xxl:mt-7 xxxl:mt-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 h-[450px] gap-x-7 gap-y-7">
        <div className="lg:col-span-2 lg:row-span-2 w-full bg-slate-200 h-full rounded-xl"></div>
        <div className=" w-full lg:col-start-3 bg-gray-100 h-full rounded-xl"></div>
        <div className=" w-full lg:col-start-3 lg:row-start-2  bg-neutral-100 h-full rounded-xl"></div>
      </div>
    </div>
  );
};

export default Page;
