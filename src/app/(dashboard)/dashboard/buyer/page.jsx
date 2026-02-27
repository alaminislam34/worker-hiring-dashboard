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
import CommonTable from "../components/CommonTable";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BuyerManagement = () => {
  const [buyersData, setBuyersData] = useState([]);
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

  // Table Headers based on image_c80dfe.jpg
  const headers = [
    { label: t("table.name"), key: "buyer", sortable: true },
    { label: t("table.email"), key: "email", sortable: false },
    { label: t("table.phoneNumber"), key: "phone", sortable: false },
    { label: "Total Orders", key: "totalOrders", sortable: true },
    { label: "Completed", key: "completed", sortable: false },
    { label: "Cancelled", key: "cancelled", sortable: false },
    { label: t("table.location"), key: "location", sortable: false },
    { label: "", key: "action", sortable: false },
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
            name: (
              <div className="flex items-center gap-3 bg-black">
                <Image
                  src={"/images/user.jpg"}
                  width={40}
                  height={40}
                  alt={row.buyer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-bold text-gray-800">
                  {row.buyer.name}
                </span>
              </div>
            ),
            totalOrders: (
              <span className="text-gray-600 font-medium">
                {row.totalOrders || "0 orders"}
              </span>
            ),
            completed: (
              <span className="text-gray-600 font-medium">
                {row.completed || "0 completed"}
              </span>
            ),
            cancelled: (
              <span className="text-gray-600 font-medium">
                {row.cancelled || "0 cancelled"}
              </span>
            ),
            location: (
              <span className="text-gray-600 font-medium">{row.location}</span>
            ),
            // Action Menu (Three Dots)
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
                    className="absolute right-full top-0 mr-2 z-100 w-40 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200"
                  >
                    <button
                      onClick={() => router.push(`/dashboard/buyer/${row.id}`)}
                      className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-colors border-b border-gray-50"
                    >
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-red-50 text-red-600 transition-colors">
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

export default BuyerManagement;
