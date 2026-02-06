import React from "react";
import { TrendingUp, BarChart3, Box, Users } from "lucide-react";

const STATS_DATA = [
  {
    title: "Total revenue",
    value: "$400",
    trend: "8.5%",
    icon: <BarChart3 className="text-[#34d399]" size={28} />,
    iconBg: "bg-[#ecfdf5]",
    isUp: true,
  },
  {
    title: "Active tasks",
    value: "40",
    trend: "8.5%",
    icon: <Box className="text-[#fbbf24]" size={28} />,
    iconBg: "bg-[#fffbeb]",
    isUp: true,
  },
  {
    title: "Complete task",
    value: "20",
    trend: "8.5%",
    icon: <Box className="text-[#fbbf24]" size={28} />,
    iconBg: "bg-[#fffbeb]",
    isUp: true,
  },
  {
    title: "Total users",
    value: "400",
    trend: "8.5%",
    icon: <Users className="text-[#65a30d]" size={28} />,
    iconBg: "bg-[#f1fadc]",
    isUp: true,
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-full pb-4">
      {STATS_DATA.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-4xl p-4 flex flex-col justify-between shadow-sm"
        >
          {/* Top Row: Title and Icon */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#64748b] text-lg font-medium mb-2">
                {item.title}
              </p>
              <h3 className="text-[32px] font-semibold text-[#1e293b]">
                {item.value}
              </h3>
            </div>
            <div
              className={`p-4 rounded-3xl ${item.iconBg} flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </div>

          {/* Bottom Row: Trend Analysis */}
          <div className="flex items-center gap-2 mt-4">
            <TrendingUp className="text-[#22c55e]" size={20} />
            <p className="text-base text-[#64748b]">
              <span className="text-[#22c55e] font-semibold">{item.trend}</span>{" "}
              Up from yesterday
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
