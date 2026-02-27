"use client";

import Link from "next/link";
import React from "react";

const WorkerDetails = () => {
  // Updated stats based on image_c71903.png
  const stats = [
    { title: "Total Earnings (Lifetime)", value: "$3490" },
    { title: "Earning This month", value: "$560" },
    { title: "Active Orders", value: "2" },
    { title: "Total Jobs Completed", value: "30" },
    { title: "Completion Rate", value: "95%" },
    { title: "Cancellation Rate", value: "5%" },
    { title: "Last Active (time)", value: "1h 22min ago" },
    { title: "Account Status", value: "Active", isStatus: true },
  ];

  return (
    <div className="bg-gray-50">
      <div className="mb-4">
        <div className="flex flex-row gap-2 items-center py-4 text-sm font-medium">
          <Link
            href="/dashboard/worker"
            className="text-gray-400 hover:text-[#73a34f] transition-colors"
          >
            Worker
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">Worker details</span>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md h-45"
          >
            <p className="text-gray-500 text-lg font-medium mb-4">
              {stat.title}
            </p>

            {stat.isStatus ? (
              /* Account Status Badge */
              <div className="bg-[#e8f5e9] text-[#2e7d32] px-6 py-2 rounded-xl font-bold text-lg">
                {stat.value}
              </div>
            ) : (
              /* Standard Metric Value */
              <p className="text-xl md:text-2xl xl:text-3xl font-bold text-[#1a1a1a] tracking-tight">
                {stat.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerDetails;
