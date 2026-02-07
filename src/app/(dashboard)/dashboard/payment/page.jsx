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
import { useTranslation } from "react-i18next";
import { getPaymentTypeKey } from "@/i18n/utils";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/transactions.json");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Data load error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const headers = [
    { label: t("table.date"), key: "date", sortable: true },
    { label: t("table.paymentId"), key: "paymentId", sortable: false },
    { label: t("table.transactionId"), key: "transactionId", sortable: false },
    { label: t("table.name"), key: "user", sortable: true },
    { label: t("table.type"), key: "type", sortable: false },
    { label: t("table.amount"), key: "amount", sortable: true },
  ];

  const paymentTabs = [
    { key: "all", label: t("table.allPayment") },
    { key: "credit", label: t("paymentType.credit") },
    { key: "debit", label: t("paymentType.debit") },
  ];

  // Logic: Combined Tab and Search Filter
  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      const matchesTab =
        activeTab === "all" || getPaymentTypeKey(item.type) === activeTab;

      const matchesSearch =
        item.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, transactions]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  if (loading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#73a34f]" size={40} />
      </div>
    );

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-100 mb-6">
        {paymentTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setCurrentPage(1);
            }}
            className={`pb-4 text-base font-bold relative transition-all ${
              activeTab === tab.key
                ? "text-[#73a34f]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#73a34f] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
          size={22}
        />
        <input
          type="text"
          placeholder={t("filters.transactionSearch")}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-14 pr-6 py-4 bg-[#f9fafb] rounded-[1.25rem] outline-none border-none focus:ring-2 focus:ring-[#73a34f]/10 text-lg"
        />
      </div>

      {/* Main Table */}
      <CommonTable headers={headers} data={paginatedData} />

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-bold">
          <span>{t("common.showResult")}:</span>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-lg text-black bg-white font-bold">
            {rowsPerPage} <ChevronDown size={14} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 text-gray-400 disabled:opacity-20"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? "bg-gray-100 text-black shadow-sm" : "text-gray-400 hover:bg-gray-50"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 text-gray-400 disabled:opacity-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
