"use client";
import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
  EllipsisVertical,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import CommonTable from "../components/CommonTable";
import PaymentModal from "../components/PaymentModal";
import { useTranslation } from "react-i18next";
import { getOrderStatusKey } from "@/i18n/utils";
import { StateContext } from "@/app/providers/StateProviders";

const RefundModal = ({ isOpen, order, onClose, onConfirm }) => {
  const [mounted, setMounted] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (order?.budget) {
      setRefundAmount(order.budget);
    }
  }, [order]);

  if (!isOpen || !order || !mounted) return null;

  const handleSubmitRefund = () => {
    if (refundReason.trim() && refundAmount) {
      setIsSubmitting(true);
      setTimeout(() => {
        onConfirm(order.order.id, refundAmount, refundReason);
        setRefundReason("");
        setRefundAmount("");
        setIsSubmitting(false);
        onClose();
      }, 800);
    }
  };

  const quickReasons = [
    "Customer Request",
    "Service Not Satisfactory",
    "Order Cancelled",
    "Payment Error",
    "Wrong Item",
  ];

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-4xl p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Process Refund
        </h2>

        {/* Order Details */}
        <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-600 font-semibold text-sm mb-1">
                  Order: {order.order.id}
                </p>
                <p className="text-gray-700 font-medium">{order.order.title}</p>
              </div>
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                Refund
              </span>
            </div>
          </div>
        </div>

        {/* Refund Form */}
        <div className="space-y-4 mb-6">
          {/* Refund Amount */}
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Refund Amount
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-[#f9fafb] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Original amount: ${order.budget}
            </p>
          </div>

          {/* Refund Reason */}
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Reason for Refund
            </label>
            <textarea
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Please explain why this refund is being processed..."
              className="w-full px-4 py-3 bg-[#f9fafb] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 resize-none text-sm"
              rows={4}
            />
          </div>

          {/* Quick Reason Buttons */}
          <div>
            <p className="text-gray-500 text-sm font-medium mb-2">
              Quick Reasons:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setRefundReason(reason)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Type Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Payment Status</p>
              <p className="text-gray-900 font-bold">{order.payment}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Payment Type</p>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold inline-block ${
                  order.paymentType === "Credit"
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {order.paymentType || "Credit"}
              </span>
            </div>
          </div>

          {/* Refund Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              <span className="font-semibold">⚠️ Warning:</span> This action
              will process a refund of ${refundAmount} to the customer. This
              action cannot be undone.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitRefund}
            disabled={!refundReason.trim() || !refundAmount || isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Process Refund"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const OrderManagement = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const actionButtonRefs = useRef({});
  const { isModalOpen, setIsModalOpen, selectedWorker, setSelectedWorker } =
    useContext(StateContext);

  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({});
  const [refundingOrder, setRefundingOrder] = useState(null);

  const rowsPerPage = 8;

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // Add payment type to each order
        const dataWithPaymentType = data.map((order, index) => ({
          ...order,
          paymentType: index % 2 === 0 ? "Credit" : "Debit",
        }));
        setOrdersData(dataWithPaymentType);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if click outside menu or action button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        (!openMenuId ||
          !actionButtonRefs.current[openMenuId] ||
          !actionButtonRefs.current[openMenuId].contains(event.target))
      ) {
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
    { label: "Payment Type", key: "paymentType", sortable: false },
    { label: t("table.worker"), key: "worker", sortable: false },
    { label: t("table.status"), key: "status", sortable: false },
    {
      label: "Status Duration",
      key: "duration",
      sortable: true,
    },
    { label: t("table.budget"), key: "budgetColumn", sortable: true },
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
      let matchesTab = activeTab === "all";

      if (activeTab === "refunded") {
        matchesTab = item.payment === "Refunded";
      } else if (activeTab !== "all") {
        matchesTab = getOrderStatusKey(item.status) === activeTab;
      }

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

  const handleRefund = (orderId, refundAmount, refundReason) => {
    console.log(
      `Refund processed: Order ${orderId}, Amount: $${refundAmount}, Reason: ${refundReason}`,
    );
    setOrdersData((prev) =>
      prev.map((order) =>
        order.order.id === orderId
          ? { ...order, payment: "Refunded", status: "Cancelled" }
          : order,
      ),
    );
  };

  const getStatusDuration = (date) => {
    // console.log(date);
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

    // console.log( `${Math.floor(diff / 86400)}d ago`)
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#73a34f]" size={40} />
      </div>
    );

  return (
    <div className="w-full bg-white rounded-3xl md:rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-gray-50 min-h-screen relative">
      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
        {orderTabs.map((tab) => {
          let tabCount = 0;
          if (tab.key === "all") {
            tabCount = ordersData.length;
          } else if (tab.key === "refunded") {
            tabCount = ordersData.filter(
              (d) => d.payment === "Refunded",
            ).length;
          } else {
            tabCount = ordersData.filter(
              (d) => getOrderStatusKey(d.status) === tab.key,
            ).length;
          }

          return (
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
              {tab.label} ({tabCount})
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#73a34f] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
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

      <div className="overflow-x-visible">
        <CommonTable
          path={"order"}
          headers={headers}
          data={paginatedData.map((row) => ({
            ...row,
            duration: getStatusDuration(row.date),
            paymentType: (
              <span
                className={`px-4 py-2 rounded-lg text-sm font-semibold inline-block ${
                  row.paymentType === "Credit"
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {row.paymentType || "Credit"}
              </span>
            ),
            budgetColumn: (
              <div
                onClick={() => {
                  if (row.payment !== "Paid") {
                    setSelectedWorker(row);
                    setIsModalOpen(true);
                    setOpenMenuId(null);
                  }
                }}
                className={`font-bold py-1 px-2 rounded-lg transition-all ${
                  row.payment !== "Paid"
                    ? "cursor-pointer text-white bg-black "
                    : "text-gray-900"
                }`}
              >
                {row.payment !== "Paid" && "Pay"} {row.budget}
              </div>
            ),
            // --- Action Menu logic ---
            action: (
              <div className="relative flex justify-center items-center">
                <button
                  ref={(el) => (actionButtonRefs.current[row.order.id] = el)}
                  aria-haspopup="true"
                  aria-expanded={openMenuId === row.order.id}
                  aria-label="Open action menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (openMenuId !== row.order.id) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.right + window.scrollX - 200,
                      });
                    }
                    setOpenMenuId(
                      openMenuId === row.order.id ? null : row.order.id,
                    );
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#73a34f]"
                >
                  <EllipsisVertical size={20} className="text-gray-500" />
                </button>

                {openMenuId === row.order.id && (
                  <div
                    ref={menuRef}
                    style={{ minWidth: 200 }}
                    className="absolute right-0 top-full mt-2 z-9999 w-52 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200"
                    role="menu"
                    tabIndex={-1}
                  >
                    <button
                      onClick={() => {
                        router.push(`/dashboard/order/${row.order.id}`);
                        setSelectedWorker(row);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 bg-[#73a34f] hover:bg-[#5d8a3c] text-white transition-colors border-b border-gray-50 focus:outline-none focus:bg-[#73a34f] focus:text-white"
                      role="menuitem"
                    >
                      Payment Details
                    </button>

                    {/* <button
                      onClick={() => {
                        router.push(`/dashboard/orders/${row.order.id}`);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                    >
                      View Order
                    </button> */}
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </div>

      {/* Pagination */}
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

      <RefundModal
        isOpen={Boolean(refundingOrder)}
        order={refundingOrder}
        onClose={() => setRefundingOrder(null)}
        onConfirm={handleRefund}
      />
    </div>
  );
};

export default OrderManagement;
