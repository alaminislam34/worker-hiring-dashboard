"use client";
import React, { useMemo } from "react";
import CommonTable from "./CommonTable";
import { useTranslation } from "react-i18next";

const WorkerList = () => {
  const { t } = useTranslation();

  // 1. Define Headers (Matches the design columns)
  const headers = [
    { label: t("table.allOrders"), key: "order", sortable: false },
    { label: t("table.date"), key: "date", sortable: false },
    { label: t("table.buyer"), key: "buyer", sortable: false },
    { label: t("table.payment"), key: "payment", sortable: false },
    { label: t("table.worker"), key: "worker", sortable: false },
    { label: t("table.status"), key: "status", sortable: false },
    { label: t("table.budget"), key: "budget", sortable: true },
  ];

  // 2. Mock Data (structured for the helper function in CommonTable)
  const workersData = useMemo(
    () => [
      {
        order: { title: t("sample.assembleIkeaDesk"), id: "#ID238976" },
        date: "Apr 24, 2022",
        buyer: { name: "Justin Leo", avatar: "/images/user.jpg" },
        payment: "Paid",
        worker: { name: "Alex smith", avatar: "/images/user.jpg" },
        status: "Completed",
        budget: "79.02",
      },
      {
        order: { title: t("sample.assembleIkeaDesk"), id: "#ID238976" },
        date: "Apr 24, 2022",
        buyer: { name: "Justin Leo", avatar: "/images/user.jpg" },
        payment: "Paid",
        worker: { name: "Alex smith", avatar: "/images/user.jpg" },
        status: "Completed",
        budget: "79.02",
      },
    ],
    [t],
  );

  return (
    <div className="p-4 md:p-8 rounded-2xl bg-white shadow-2xl mt-6">
      <div>
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("order.payWorker")}
          </h1>
        </div>

        {/* The Reusable Table */}
        <CommonTable headers={headers} data={workersData} />
      </div>
    </div>
  );
};

export default WorkerList;
