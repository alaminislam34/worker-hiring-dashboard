"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
} from "lucide-react";
import CommonTable from "../components/CommonTable";
import PaymentModal from "../components/PaymentModal";
import { useTranslation } from "react-i18next";
import { getOrderStatusKey } from "@/i18n/utils";

const OrderManagement = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 8;
  const { t } = useTranslation();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setOrdersData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const headers = [
    { label: t("table.allOrders"), key: "order", sortable: true },
    { label: t("table.date"), key: "date", sortable: true },
    { label: t("table.buyer"), key: "buyer", sortable: false },
    { label: t("table.payment"), key: "payment", sortable: false },
    { label: t("table.worker"), key: "worker", sortable: false },
    { label: t("table.status"), key: "status", sortable: false },
    { label: t("table.budget"), key: "budget", sortable: true },
  ];

  const orderTabs = [
    { key: "all", label: t("table.allOrders") },
    { key: "accepted", label: t("status.accepted") },
    { key: "confirmed", label: t("status.confirmed") },
    { key: "progress", label: t("status.progress") },
    { key: "completed", label: t("status.completed") },
  ];

  const filteredData = useMemo(() => {
    return ordersData.filter((item) => {
      const matchesTab =
        activeTab === "all" || getOrderStatusKey(item.status) === activeTab;
      const matchesSearch =
        item.order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.order.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, ordersData]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const handleConfirmPayment = (id, txId) => {
    alert(t("alerts.paymentSent", { orderId: id, txId }));
    // Update local state to reflect payment
    setOrdersData((prev) =>
      prev.map((order) =>
        order.order.id === id
          ? { ...order, payment: "Paid", status: "Completed" }
          : order,
      ),
    );
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#73a34f]" size={40} />
      </div>
    );

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 min-h-150 relative">
      <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto scrollbar-hide">
        {orderTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeTab === tab.key ? "text-[#73a34f]" : "text-gray-400"}`}
            >
              {tab.label} (
              {tab.key === "all"
                ? ordersData.length
                : ordersData.filter((d) =>
                    getOrderStatusKey(d.status) === tab.key,
                  ).length}
              )
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#73a34f] rounded-full" />
              )}
            </button>
        ))}
      </div>

      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          size={22}
        />
        <input
          type="text"
          placeholder={t("filters.orderSearch")}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-14 pr-6 py-4 bg-[#f9fafb] rounded-[1.25rem] outline-none border-none focus:ring-2 focus:ring-[#73a34f]/10 text-lg"
        />
      </div>

      <CommonTable
        headers={headers}
        data={paginatedData}
        onAction={(row) => {
          setSelectedWorker(row);
          setIsModalOpen(true);
        }}
      />

      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center gap-2 text-gray-400 font-bold">
          {t("common.showResult")}: {" "}
          <span className="bg-gray-50 px-3 py-1 rounded-lg text-black border border-gray-100 flex items-center gap-1">
            8 <ChevronDown size={14} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 disabled:opacity-20"
          >
            <ChevronLeft />
          </button>
          {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold ${currentPage === i + 1 ? "bg-gray-100 text-black" : "text-gray-400"}`}
              >
                {i + 1}
              </button>
            ),
          )}
          <button
            disabled={
              currentPage === Math.ceil(filteredData.length / rowsPerPage)
            }
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 disabled:opacity-20"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workerData={selectedWorker}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default OrderManagement;
