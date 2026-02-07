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

const BuyerManagement = () => {
  const [buyersData, setBuyersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Simulate Fetching Data
  useEffect(() => {
    const loadBuyers = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("/buyers.json");
        const data = await response.json();
        setBuyersData(data);
      } catch (error) {
        console.error("Failed to load buyers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBuyers();
  }, []);

  // Table Headers
  const headers = [
    { label: "Name", key: "buyer", sortable: true },
    { label: "Email", key: "email", sortable: false },
    { label: "Phone number", key: "phone", sortable: false },
    { label: "Location", key: "location", sortable: false },
  ];

  // Search Logic
  const filteredData = useMemo(() => {
    return buyersData.filter(
      (item) =>
        item.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, buyersData]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  if (loading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#73a34f]" size={40} />
      </div>
    );

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
          size={22}
        />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-14 pr-6 py-4 bg-[#f9fafb] rounded-[1.25rem] outline-none border-none focus:ring-2 focus:ring-[#73a34f]/10 text-lg"
        />
      </div>

      {/* Table Component */}
      <CommonTable headers={headers} data={paginatedData} />

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-bold">
          <span>Show result:</span>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-lg text-black bg-white">
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

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                currentPage === i + 1
                  ? "bg-gray-100 text-black"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {i + 1}
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

export default BuyerManagement;
