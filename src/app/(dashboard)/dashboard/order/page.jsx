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

const OrderManagement = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const headers = [
    { label: "All Orders", key: "order", sortable: true },
    { label: "Date", key: "date", sortable: true },
    { label: "Buyer", key: "buyer", sortable: false },
    { label: "Payment", key: "payment", sortable: false },
    { label: "Worker", key: "worker", sortable: false },
    { label: "Status", key: "status", sortable: false },
    { label: "Budget", key: "budget", sortable: true },
  ];

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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const handleConfirmPayment = (id, txId) => {
    alert(`Payment Sent!\nOrder: ${id}\nTXID: ${txId}`);
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
        {["All Orders", "Accepted", "Confirmed", "Progress", "Completed"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#73a34f]" : "text-gray-400"}`}
            >
              {tab} (
              {tab === "All Orders"
                ? ordersData.length
                : ordersData.filter((d) => d.status === tab).length}
              )
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#73a34f] rounded-full" />
              )}
            </button>
          ),
        )}
      </div>

      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          size={22}
        />
        <input
          type="text"
          placeholder="Search by Order Title or ID"
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
          Show result:{" "}
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
