"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
  EllipsisVertical,
  Star,
} from "lucide-react";
import CommonTable from "../components/CommonTable";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WorkerManagement = () => {
  const [workersData, setWorkersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const rowsPerPage = 8;
  const { t } = useTranslation();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetching Data
  useEffect(() => {
    const loadWorkers = async () => {
      try {
        setLoading(true);
        // Ensure this path matches your file location
        const response = await fetch("/workers.json");
        const data = await response.json();
        setWorkersData(data);
      } catch (error) {
        console.error("Failed to load workers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadWorkers();
  }, []);

  // Updated Headers based on your image
  const headers = [
    { label: t("table.name"), key: "workerColumn", sortable: true },
    { label: t("table.email"), key: "email", sortable: false },
    { label: t("table.phoneNumber"), key: "phone", sortable: false },
    { label: "Jobs Completed", key: "jobsCompletedColumn", sortable: true },
    { label: "Rating", key: "ratingColumn", sortable: true },
    { label: "Last Active", key: "lastActiveColumn", sortable: false },
    { label: t("table.location"), key: "location", sortable: false },
    { label: "", key: "action", sortable: false },
  ];

  // Search Logic (Fixed to handle nested worker.name)
  const filteredData = useMemo(() => {
    return workersData.filter((item) => {
      const name = item?.worker?.name?.toLowerCase() || "";
      const email = item?.email?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      return name.includes(query) || email.includes(query);
    });
  }, [searchQuery, workersData]);

  // Pagination Logic
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
    <div className="w-full bg-white rounded-3xl md:rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
          size={22}
        />
        <input
          type="text"
          placeholder={t("filters.search")}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-14 pr-6 py-4 bg-[#f9fafb] rounded-[1.25rem] outline-none border-none focus:ring-2 focus:ring-[#73a34f]/10 text-lg"
        />
      </div>

      {/* Table Component */}
      <div className="relative overflow-visible">
        <CommonTable
          headers={headers}
          data={paginatedData.map((row) => ({
            ...row,
            // 1. Name and Avatar Column
            workerColumn: (
              <div className="flex items-center gap-3">
                <Image
                  src={row.worker?.avatar || "/images/user.jpg"}
                  width={40}
                  height={40}
                  alt={row.worker?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-bold text-gray-800">
                  {row.worker?.name}
                </span>
              </div>
            ),
            // 2. Jobs Completed Column (using fallback if missing in JSON)
            jobsCompletedColumn: (
              <span className="text-gray-600 font-medium">
                {row.jobsCompleted || 30} completed
              </span>
            ),
            // 3. Rating Column (with Star icon)
            ratingColumn: (
              <div className="flex items-center gap-1 text-gray-600 font-medium">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                {row.rating?.toFixed(1) || "5.0"}
              </div>
            ),
            // 4. Last Active Column
            lastActiveColumn: (
              <span className="text-gray-600 font-medium">
                {row.lastActive || "1h ago"}
              </span>
            ),
            // 5. Action Menu
            action: (
              <div className="relative flex justify-end px-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === row.id ? null : row.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <EllipsisVertical size={20} className="text-gray-400" />
                </button>

                {openMenuId === row.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-full top-0 mr-2 z-50 w-40 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200"
                  >
                    <button
                      onClick={() => router.push(`/dashboard/worker/${row.id}`)}
                      className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 text-gray-700 border-b border-gray-50"
                    >
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-red-50 text-red-600">
                      Suspend
                    </button>
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-bold">
          <span>{t("common.showResult")}:</span>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-lg text-black bg-white cursor-pointer hover:bg-gray-50">
            {rowsPerPage} <ChevronDown size={14} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 text-gray-400 hover:text-black disabled:opacity-20 transition-colors"
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
            className="p-2 text-gray-400 hover:text-black disabled:opacity-20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerManagement;
