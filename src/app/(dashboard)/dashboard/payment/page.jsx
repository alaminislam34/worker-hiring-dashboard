"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import CommonTable from "../components/CommonTable";
import { useTranslation } from "react-i18next";
import { getPaymentTypeKey } from "@/i18n/utils";

const RefundModal = ({ isOpen, transaction, onClose, onConfirm }) => {
  const [mounted, setMounted] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (transaction?.amount) {
      setRefundAmount(transaction.amount);
    }
  }, [transaction]);

  if (!isOpen || !transaction || !mounted) return null;

  const handleSubmitRefund = () => {
    if (refundReason.trim() && refundAmount) {
      setIsSubmitting(true);
      setTimeout(() => {
        onConfirm(transaction.paymentId, refundAmount, refundReason);
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

        {/* Transaction Details */}
        <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-600 font-semibold text-sm mb-1">
                  Payment ID: {transaction.paymentId}
                </p>
                <p className="text-gray-700 font-medium">
                  {transaction.user.name}
                </p>
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
              Original amount: ${transaction.amount}
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
              <p className="text-gray-900 font-bold">
                {transaction.status || "Completed"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Payment Type</p>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold inline-block ${
                  transaction.type === "Credit"
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {transaction.type || "Credit"}
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

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refundingTransaction, setRefundingTransaction] = useState(null);
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
    { label: "Action", key: "action", sortable: false },
  ];

  const paymentTabs = [
    { key: "all", label: t("table.allPayment") },
    { key: "credit", label: t("paymentType.credit") },
    { key: "debit", label: t("paymentType.debit") },
    { key: "Refund", label: "Refund" },
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

  const handleRefundConfirm = (paymentId, amount, reason) => {
    // Update transactions to mark as refunded
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.paymentId === paymentId
          ? {
              ...transaction,
              status: "Refunded",
              refundReason: reason,
              refundAmount: amount,
            }
          : transaction,
      ),
    );
    console.log(
      `Refund processed for Payment ${paymentId}: $${amount}, Reason: ${reason}`,
    );
  };

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
      <CommonTable
        headers={headers}
        data={paginatedData.map((row) => ({
          ...row,
          action: (
            <button
              onClick={() => setRefundingTransaction(row)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold text-sm transition-all active:scale-95"
            >
              Refund
            </button>
          ),
        }))}
      />

      {/* Refund Modal */}
      <RefundModal
        isOpen={!!refundingTransaction}
        transaction={refundingTransaction}
        onClose={() => setRefundingTransaction(null)}
        onConfirm={handleRefundConfirm}
      />

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
