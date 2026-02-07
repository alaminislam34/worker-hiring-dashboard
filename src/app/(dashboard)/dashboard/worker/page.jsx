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

const WorkerManagement = () => {
  const [workersData, setWorkersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/workers.json");
        const data = await response.json();
        setWorkersData(data);
      } catch (error) {
        console.error("Worker data load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadWorkers();
  }, []);

  const headers = [
    { label: "Name", key: "worker", sortable: true },
    { label: "Email", key: "email", sortable: false },
    { label: "Phone number", key: "phone", sortable: false },
    { label: "Location", key: "location", sortable: false },
  ];

  const filteredData = useMemo(() => {
    return workersData.filter(
      (item) =>
        item.worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, workersData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

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
      {/* 1. Dashboard Style Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
          size={22}
        />
        <input
          type="text"
          placeholder="Search workers by name, email, or location"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-14 pr-6 py-4 bg-[#f9fafb] rounded-[1.25rem] outline-none border-none focus:ring-2 focus:ring-[#73a34f]/10 text-lg"
        />
      </div>

      {/* 2. Worker Table */}
      <CommonTable headers={headers} data={paginatedData} />

      {/* 3. Standardized Pagination Footer */}
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
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg disabled:opacity-20 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-gray-100 text-black shadow-sm"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg disabled:opacity-20 transition-opacity"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerManagement;
