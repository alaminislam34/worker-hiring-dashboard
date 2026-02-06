"use client";
import React from "react";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";

/**
 * CommonTable Component
 * @param {Array} headers - Array of objects { label: string, key: string, sortable: boolean }
 * @param {Array} data - Array of objects containing row data
 */
const CommonTable = ({ headers, data }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-gray-50">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-6 text-gray-400 font-medium text-base whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    {header.label}
                    {header.sortable && (
                      <ArrowUpDown size={16} className="text-gray-300" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-50">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                {/* Dynamically render cells based on header keys */}
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="py-5 whitespace-nowrap">
                    {renderCellContent(header.key, row[header.key], row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to handle specialized designs (Avatars, Badges, Buttons)
const renderCellContent = (key, value, row) => {
  switch (key) {
    case "order":
      return (
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold text-base">
            {value.title}
          </span>
          <span className="text-blue-400 text-sm">{value.id}</span>
        </div>
      );

    case "buyer":
    case "worker":
      return (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100">
            <Image
              src={value.avatar}
              alt={value.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-gray-900 font-semibold text-base">
            {value.name}
          </span>
        </div>
      );

    case "payment":
    case "status":
      const isCompleted =
        value.toLowerCase() === "completed" || value.toLowerCase() === "paid";
      return (
        <span
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isCompleted
              ? "bg-[#ecfdf5] text-[#10b981]"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {value}
        </span>
      );

    case "budget":
      return (
        <button className="bg-[#262626] hover:bg-black text-white px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95">
          Pay ${value}
        </button>
      );

    case "date":
      return <span className="text-gray-700 font-medium">{value}</span>;

    default:
      return <span className="text-gray-700">{value}</span>;
  }
};

export default CommonTable;
