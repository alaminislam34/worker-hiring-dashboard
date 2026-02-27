"use client";
import React from "react";
import { ArrowUpDown } from "lucide-react"; // npm i lucide-react
import Link from "next/link";

export default function TransactionTable() {
  const data = [
    {
      name: "Justin Leo",
      avatar: "https://i.pravatar.cc/150?u=justin",
      paymentId: "PAY-849372",
      transactionId: "TRX-240124-5839",
      date: "Apr 24, 2022",
      type: "Credit",
      amount: "$90",
    },
    {
      name: "Alex Smith",
      avatar: "https://i.pravatar.cc/150?u=alex",
      paymentId: "PAY-849372",
      transactionId: "TRX-240124-5839",
      date: "Apr 24, 2022",
      type: "Debit",
      amount: "$90",
    },
  ];

  return (
    <div>
      <div>
        <div className="flex flex-row items-center gap-2  py-4">
          <Link
            href="/dashboard/order"
            className="text-sm transition-colors hover:text-[#73a34f] font-medium"
          >
            Order
          </Link>
          {"/"}{" "}
          <span className="text-sm text-[#73a34f] font-medium">
            Order details
          </span>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-5 text-[14px] font-medium text-gray-400">
                  <div className="flex items-center gap-2">
                    Name <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-400">
                  Payment ID
                </th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-400">
                  Transaction ID
                </th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-400">
                  Date
                </th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-400">
                  Type
                </th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-400">
                  Ammount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                      <span className="font-semibold text-gray-900 text-[15px]">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-gray-900 font-medium text-[15px]">
                    {item.paymentId}
                  </td>
                  <td className="px-6 py-6 text-gray-900 font-medium text-[15px]">
                    {item.transactionId}
                  </td>
                  <td className="px-6 py-6 text-gray-900 font-medium text-[15px]">
                    {item.date}
                  </td>
                  <td className="px-6 py-6 text-gray-900 font-medium text-[15px]">
                    {item.type}
                  </td>
                  <td className="px-6 py-6 text-gray-900 font-semibold text-[15px]">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
