"use client";

import Link from "next/link";
import React from "react";

const BuyerDetails = () => {
  const stats = [
    { title: "Total Order Value", value: "$4400" },
    { title: "Average Order Value", value: "$110" },
    { title: "Total Orders", value: "50" },
    { title: "Completed Orders", value: "40" },
    { title: "Cancelled Orders", value: "10" },
    { title: "Completion Rate", value: "90%" },
    { title: "Cancellation Rate", value: "10%" },
  ];

  return (
    <div className="bg-gray-50">
      <div>
        <div className="flex flex-row gap-2 items-center  py-4">
          <Link
            href="/dashboard/buyer"
            className="text-blue-500 hover:underline"
          >
            Buyer
          </Link>
          {"/"} <span className="text-gray-500">Buyer details</span>
        </div>
      </div>
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-[1.25rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
          >
            <p className="text-gray-500 text-lg font-medium mb-6">
              {stat.title}
            </p>
            <p className="text-xl md:text-2xl xl:text-3xl font-bold text-black tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDetails;
