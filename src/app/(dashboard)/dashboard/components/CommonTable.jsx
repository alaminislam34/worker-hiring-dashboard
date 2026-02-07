"use client";
import React from "react";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  getOrderStatusKey,
  getPaymentStatusKey,
  getPaymentTypeKey,
} from "@/i18n/utils";

const CommonTable = ({ headers, data, onAction }) => {
  const { t } = useTranslation();

  const renderCell = (key, value, row) => {
    // 1. Handle User-style cells (Avatar + Name) for Buyer, Worker, and Transaction pages
    //
    if (key === "buyer" || key === "worker" || key === "user") {
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
    }

    switch (key) {
      case "order": // Order ID and Title
        return (
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-base leading-tight">
              {value.title}
            </span>
            <span className="text-blue-400 text-sm mt-0.5">{value.id}</span>
          </div>
        );

      case "payment":
      case "status":
      case "type": // Added "type" for Credit/Debit badges
        const badgeKey =
          key === "status"
            ? getOrderStatusKey(value)
            : key === "payment"
              ? getPaymentStatusKey(value)
              : getPaymentTypeKey(value);

        const isCompleted = ["completed", "paid", "credit"].includes(
          badgeKey,
        );
        const isAccepted = badgeKey === "accepted";
        const isProgress = badgeKey === "progress";
        const isDebit = badgeKey === "debit";

        let colors = "bg-gray-100 text-gray-500";
        if (isCompleted) colors = "bg-[#ecfdf5] text-[#10b981]"; // Green
        if (isAccepted) colors = "bg-[#f3f0ff] text-[#7c3aed]"; // Purple
        if (isProgress) colors = "bg-[#fff7ed] text-[#ea580c]"; // Orange
        if (isDebit) colors = "bg-red-50 text-red-500"; // Red for Debit

        const badgeLabel =
          key === "status"
            ? t(`status.${badgeKey}`, { defaultValue: value })
            : key === "payment"
              ? t(`paymentStatus.${badgeKey}`, { defaultValue: value })
              : t(`paymentType.${badgeKey}`, { defaultValue: value });

        return (
          <span
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-block ${colors}`}
          >
            {badgeLabel}
          </span>
        );

      case "budget":
      case "amount": // Handles both Order budget and Transaction amount
        const orderStatusKey = getOrderStatusKey(row.status);
        const paymentStatusKey = getPaymentStatusKey(row.payment);
        const isPaid =
          orderStatusKey === "completed" || paymentStatusKey === "paid";

        // Show Pay Button only for unpaid orders in Order Management
        if (key === "budget" && !isPaid) {
          return (
            <button
              onClick={() => onAction && onAction(row)}
              className="bg-[#262626] hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95"
            >
              {t("actions.payAmount", { amount: value })}
            </button>
          );
        }
        // Otherwise just show the text
        return (
          <span className="text-gray-900 font-bold text-base">{value}</span>
        );

      default:
        // Default text for Email, Phone, Location, Date, IDs
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
                  {h.label}
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
