"use client";
import React, { useState } from "react";
import CommonTable from "./CommonTable";

const WorkerList = () => {
  // 1. Define Headers (Matches the design columns)
  const headers = [
    { label: "All Orders", key: "order", sortable: false },
    { label: "Date", key: "date", sortable: false },
    { label: "Buyer", key: "buyer", sortable: false },
    { label: "Payment", key: "payment", sortable: false },
    { label: "Worker", key: "worker", sortable: false },
    { label: "Status", key: "status", sortable: false },
    { label: "Budget", key: "budget", sortable: true },
  ];

  // 2. Mock Data (structured for the helper function in CommonTable)
  const [workersData] = useState([
    {
      order: { title: "Assemble an IKEA Desk", id: "#ID238976" },
      date: "Apr 24, 2022",
      buyer: { name: "Justin Leo", avatar: "/images/user1.jpg" },
      payment: "Paid",
      worker: { name: "Alex smith", avatar: "/images/user2.jpg" },
      status: "Completed",
      budget: "79.02",
    },
    {
      order: { title: "Assemble an IKEA Desk", id: "#ID238976" },
      date: "Apr 24, 2022",
      buyer: { name: "Justin Leo", avatar: "/images/user3.jpg" },
      payment: "Paid",
      worker: { name: "Alex smith", avatar: "/images/user4.jpg" },
      status: "Completed",
      budget: "79.02",
    },
  ]);

  return (
    <div className="p-4 md:p-8 rounded-2xl bg-white shadow-2xl mt-6">
      <div>
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Pay worker</h1>
        </div>

        {/* The Reusable Table */}
        <CommonTable headers={headers} data={workersData} />
      </div>
    </div>
  );
};

export default WorkerList;
