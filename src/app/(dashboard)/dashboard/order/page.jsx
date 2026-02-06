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

const OrderManagement = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        setOrdersData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const headers = [
    { label: "All Orders", key: "order", sortable: true },
    { label: "Date", key: "date", sortable: true },
    { label: "Buyer", key: "buyer", sortable: false },
    { label: "Payment", key: "payment", sortable: false },
    { label: "Worker", key: "worker", sortable: false },
    { label: "Status", key: "status", sortable: false },
    { label: "Budget", key: "budget", sortable: true },
  ];

  // Dynamic Tabs with exact counts
  const tabs = useMemo(
    () => [
      { name: "All Orders", count: ordersData.length },
      {
        name: "Accepted",
        count: ordersData.filter((d) => d.status === "Accepted").length,
      },
      {
        name: "Confirmed",
        count: ordersData.filter((d) => d.status === "Confirmed").length,
      },
      {
        name: "Progress",
        count: ordersData.filter((d) => d.status === "Progress").length,
      },
      {
        name: "Completed",
        count: ordersData.filter((d) => d.status === "Completed").length,
      },
    ],
    [ordersData],
  );

  // Combined Search and Tab Filter
  const filteredData = useMemo(() => {
    return ordersData.filter((item) => {
      const matchesTab =
        activeTab === "All Orders" || item.status === activeTab;
      const matchesSearch =
        item.order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.order.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, ordersData]);

  // Functional Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  if (loading)
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-[#73a34f]">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p className="text-gray-400 font-medium">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-red-500 bg-red-50 rounded-2xl">
        Error: {error}
      </div>
    );

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
      {/* 1. Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => {
              setActiveTab(tab.name);
              setCurrentPage(1);
            }}
            className={`pb-4 text-base font-semibold transition-all relative whitespace-nowrap ${
              activeTab === tab.name
                ? "text-[#73a34f]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.name} ({tab.count})
            {activeTab === tab.name && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#73a34f]" />
            )}
          </button>
        ))}
      </div>

      {/* 2. Functional Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by Order Title or ID"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 pr-4 py-3.5 bg-[#f9fafb] rounded-2xl outline-none border-none focus:ring-2 focus:ring-[#73a34f]/10"
        />
      </div>

      {/* 3. Table Display */}
      <CommonTable headers={headers} data={paginatedData} />

      {/* 4. Functional Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Show result:</span>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-lg text-black font-bold">
            {rowsPerPage} <ChevronDown size={14} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg disabled:opacity-20"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                currentPage === n
                  ? "bg-gray-100 text-black"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg disabled:opacity-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
