"use client";
import React from "react";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";

const CommonTable = ({ headers, data, onAction }) => {
  const renderCell = (key, value, row) => {
    switch (key) {
      case "order":
        return (
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-base leading-tight">
              {value.title}
            </span>
            <span className="text-blue-400 text-sm mt-0.5">{value.id}</span>
          </div>
        );
      case "buyer":
      case "worker":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-100">
              <Image
                src={value.avatar}
                alt={value.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-gray-900 font-bold text-base">
              {value.name}
            </span>
          </div>
        );
      case "payment":
      case "status":
        const isCompleted = ["completed", "paid"].includes(
          value?.toLowerCase(),
        );
        const isAccepted = value?.toLowerCase() === "accepted";
        const isProgress = value?.toLowerCase() === "progress";

        let colors = "bg-gray-100 text-gray-500";
        if (isCompleted) colors = "bg-[#ecfdf5] text-[#10b981]";
        if (isAccepted) colors = "bg-[#f3f0ff] text-[#7c3aed]";
        if (isProgress) colors = "bg-[#fff7ed] text-[#ea580c]";

        return (
          <span
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${colors}`}
          >
            {value}
          </span>
        );
      case "budget":
        // Show "Pay" button only if status isn't already "Completed"
        const isPaid = row.status === "Completed" || row.payment === "Paid";
        return isPaid && row.status === "Completed" ? (
          <span className="text-gray-900 font-bold text-base">${value}</span>
        ) : (
          <button
            onClick={() => onAction && onAction(row)}
            className="bg-[#262626] hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95"
          >
            Pay ${value}
          </button>
        );
      default:
        return <span className="text-gray-700 font-medium">{value}</span>;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h.key}
                className="px-6 pb-2 text-gray-400 font-semibold text-base"
              >
                <div className="flex items-center gap-2">
                  {h.label}{" "}
                  {h.sortable && (
                    <ArrowUpDown size={14} className="opacity-50" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="group hover:bg-gray-50/50 transition-colors"
            >
              {headers.map((h) => (
                <td
                  key={h.key}
                  className="px-6 py-5 whitespace-nowrap align-middle"
                >
                  {renderCell(h.key, row[h.key], row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
