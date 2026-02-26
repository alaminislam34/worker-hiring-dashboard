"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
  EllipsisVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CommonTable from "../components/CommonTable";
import PaymentModal from "../components/PaymentModal";
import { useTranslation } from "react-i18next";
import { getOrderStatusKey } from "@/i18n/utils";

const OrderManagement = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const menuRef = useRef(null);

  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 8;

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setOrdersData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const headers = [
    { label: t("table.allOrders"), key: "order", sortable: true },
    { label: t("table.date"), key: "date", sortable: true },
    { label: t("table.buyer"), key: "buyer", sortable: false },
    { label: t("table.payment"), key: "payment", sortable: false },
    { label: t("table.worker"), key: "worker", sortable: false },
    { label: t("table.status"), key: "status", sortable: false },
    { label: t("table.budget"), key: "budget", sortable: true },
    { label: "Action", key: "action", sortable: false },
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
    <div className="w-full bg-white rounded-3xl md:rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-gray-50 min-h-screen relative">
      <div className="flex gap-4 md:gap-8 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
        {orderTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setCurrentPage(1);
            }}
            className={`pb-4 text-sm md:text-base font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.key ? "text-[#73a34f]" : "text-gray-400"
            }`}
          >
            {tab.label} (
            {tab.key === "all"
              ? ordersData.length
              : ordersData.filter(
                  (d) => getOrderStatusKey(d.status) === tab.key,
                ).length}
            )
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#73a34f] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="relative mb-6 md:mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          size={20}
        />
        <input
          type="text"
          placeholder={t("filters.orderSearch")}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 pr-6 py-3 md:py-4 bg-[#f9fafb] rounded-2xl md:rounded-[1.25rem] outline-none text-sm md:text-lg"
        />
      </div>

      {/* IMPORTANT: Removed overflow-hidden from here if it exists in your CommonTable wrapper */}
      <div className="overflow-x-visible">
        <CommonTable
          headers={headers}
          data={paginatedData.map((row) => ({
            ...row,
            action: (
              <div className="relative flex justify-center items-center">
                <button
                  onClick={() =>
                    setOpenMenuId(
                      openMenuId === row.order.id ? null : row.order.id,
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <EllipsisVertical size={20} className="text-gray-500" />
                </button>

                {openMenuId === row.order.id && (
                  <div
                    ref={menuRef}
                    /* top-full ensures it starts below the icon. right-0 aligns it to the button edge */
                    className="absolute right-0 top-full mt-2 z-999 w-48 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200"
                  >
                    <button
                      onClick={() => {
                        setSelectedWorker(row);
                        setIsModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-[#73a34f] hover:text-white transition-colors border-b border-gray-50"
                    >
                      Payment Details
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/dashboard/orders/${row.order.id}`);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      View Order
                    </button>
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
          {t("common.showResult")}:
          <span className="bg-gray-50 px-3 py-1 rounded-lg text-black border border-gray-100 flex items-center gap-1">
            8 <ChevronDown size={14} />
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 disabled:opacity-20 text-gray-400"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl font-bold text-xs md:text-sm ${
                  currentPage === i + 1
                    ? "bg-gray-100 text-black"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
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
            className="p-2 disabled:opacity-20 text-gray-400"
          >
            <ChevronRight size={20} />
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
