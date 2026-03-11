"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
import Image from "next/image";
import CommonTable from "../components/CommonTable";
import { useTranslation } from "react-i18next";

const SupportDetailsModal = ({ isOpen, ticket, onClose, onReply }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !ticket || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-4xl p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Ticket Details</h2>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <img
              src={ticket.avatar}
              alt={ticket.userName}
              className="w-12 h-12 rounded-full object-cover border border-gray-100"
            />
            <div>
              <p className="text-gray-500 text-sm mb-1">User Name</p>
              <p className="text-gray-900 font-bold">{ticket.userName}</p>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Email</p>
              <p className="text-gray-900 font-bold text-sm break-all">
                {ticket.email}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Ticket ID</p>
              <p className="text-gray-900 font-bold">{ticket.ticketId}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Order ID</p>
              <p className="text-gray-900 font-bold">{ticket.orderId}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Date</p>
              <p className="text-gray-900 font-bold">{ticket.date}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
              <p className="text-gray-500 text-sm mb-1">Status</p>
              <span
                className={`px-4 py-2 rounded-lg text-sm font-semibold inline-block ${
                  ticket.status === "Open"
                    ? "bg-blue-50 text-blue-600"
                    : ticket.status === "In Progress"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-green-50 text-green-600"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          </div>

          {/* Subject */}
          <div className="bg-[#f9fafb] rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-2">Subject</p>
            <p className="text-gray-900 font-semibold">{ticket.subject}</p>
          </div>

          {/* Message */}
          <div className="bg-[#f9fafb] rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-2">Message</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {ticket.message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => onReply(ticket)}
              className="flex-1 bg-[#262626] hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Reply to Ticket
            </button>
            <button className="flex-1 bg-[#73a34f] hover:bg-[#638d44] text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95">
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ReplyModal = ({ isOpen, ticket, onClose, onSend }) => {
  const [mounted, setMounted] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSend(ticket.ticketId, replyMessage);
        setReplyMessage("");
        setIsSubmitting(false);
        onClose();
      }, 800);
    }
  };

  if (!isOpen || !ticket || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-4xl p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reply to Support Ticket</h2>

        {/* Ticket Reference */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-blue-600 font-semibold text-sm mb-1">Ticket: {ticket.ticketId}</p>
              <p className="text-gray-700 font-medium">{ticket.subject}</p>
              <p className="text-gray-600 text-sm mt-1">{ticket.userName}</p>
            </div>
          </div>
        </div>

        {/* Original Message Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm font-medium mb-2">Original Message:</p>
          <p className="text-gray-700 text-sm line-clamp-3">
            {ticket.message}
          </p>
        </div>

        {/* Reply Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Your Reply
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your response here... Provide helpful information or updates about the ticket."
              className="w-full px-4 py-4 bg-[#f9fafb] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#73a34f]/20 resize-none text-sm md:text-base"
              rows={6}
            />
            <p className="text-gray-400 text-xs mt-2">
              {replyMessage.length} characters
            </p>
          </div>

          {/* Quick Reply Options */}
          <div>
            <p className="text-gray-500 text-sm font-medium mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setReplyMessage(
                    "Thank you for your message. We are looking into this issue and will provide an update soon.",
                  )
                }
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Acknowledge
              </button>
              <button
                onClick={() =>
                  setReplyMessage(
                    "We have resolved your issue. Please verify and let us know if you need further assistance.",
                  )
                }
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Resolved
              </button>
              <button
                onClick={() =>
                  setReplyMessage(
                    "We need more information to assist you. Could you please provide additional details about your issue?",
                  )
                }
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Need Info
              </button>
            </div>
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
            onClick={handleSendReply}
            disabled={!replyMessage.trim() || isSubmitting}
            className="flex-1 bg-[#73a34f] hover:bg-[#638d44] disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reply"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const Support = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const actionButtonRefs = useRef({});

  const [supportData, setSupportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyingTicket, setReplyingTicket] = useState(null);

  const rowsPerPage = 8;

  // Fake support data
  useEffect(() => {
    const fakeSupportData = [
      {
        id: "TKT-001",
        userName: "Justin Leo",
        avatar: "https://i.pravatar.cc/150?u=justin.leo",
        email: "justin.leo@gmail.com",
        ticketId: "TKT-001",
        orderId: "ORD-784512",
        subject: "Order Delivery Issue",
        message:
          "I ordered an office desk but it arrived damaged. The legs are broken and the surface has deep scratches. Please help me with a replacement or refund.",
        date: "2026-03-05",
        status: "Open",
        preview: "Order Delivery Issue - I ordered an office desk but...",
      },
      {
        id: "TKT-002",
        userName: "Sarah Jenkins",
        avatar: "https://i.pravatar.cc/150?u=sarah.jenkins",
        email: "s.jenkins@gmail.com",
        ticketId: "TKT-002",
        orderId: "ORD-784518",
        subject: "Payment Transaction Failed",
        message:
          "I tried to pay for my TV installation order but the transaction keeps failing. I have enough balance but it says payment declined. This is urgent as I need the service this weekend.",
        date: "2026-03-06",
        status: "In Progress",
        preview: "Payment Transaction Failed - I tried to pay for...",
      },
      {
        id: "TKT-003",
        userName: "David Miller",
        avatar: "https://i.pravatar.cc/150?u=david.miller",
        email: "d.miller@outlook.com",
        ticketId: "TKT-003",
        orderId: "ORD-784525",
        subject: "Service Quality Complaint",
        message:
          "The worker who came to repair my kitchen sink did a poor job. The sink is still leaking and he left the place messy. I am very disappointed with the service quality.",
        date: "2026-03-04",
        status: "Resolved",
        preview: "Service Quality Complaint - The worker who...",
      },
      {
        id: "TKT-004",
        userName: "Mila Kunis",
        avatar: "https://i.pravatar.cc/150?u=mila.k",
        email: "mila.k@gmail.com",
        ticketId: "TKT-004",
        orderId: "ORD-784530",
        subject: "Worker No-Show",
        message:
          "The painter did not show up for my bedroom painting appointment yesterday. I had to reschedule my other tasks. This is the second time this has happened. Please take action.",
        date: "2026-03-03",
        status: "In Progress",
        preview: "Worker No-Show - The painter did not show up...",
      },
      {
        id: "TKT-005",
        userName: "Alex Thompson",
        avatar: "https://i.pravatar.cc/150?u=alex.thompson",
        email: "alex.t@gmail.com",
        ticketId: "TKT-005",
        orderId: "ORD-784536",
        subject: "Refund Request",
        message:
          "I want to cancel my ceiling fan installation order and request a full refund. I found another service provider with better reviews. Please process the refund to my original payment method.",
        date: "2026-03-02",
        status: "Open",
        preview: "Refund Request - I want to cancel my ceiling...",
      },
      {
        id: "TKT-006",
        userName: "Emily Carter",
        avatar: "https://i.pravatar.cc/150?u=emily.carter",
        email: "emily.carter@gmail.com",
        ticketId: "TKT-006",
        orderId: "ORD-784541",
        subject: "Delayed Service",
        message:
          "My shower pipe repair was supposed to be completed 3 days ago. The worker keeps pushing the date. No updates provided. Very frustrated with the delay and lack of communication.",
        date: "2026-03-01",
        status: "Open",
        preview: "Delayed Service - My shower pipe repair was...",
      },
      {
        id: "TKT-007",
        userName: "Ryan Cooper",
        avatar: "https://i.pravatar.cc/150?u=ryan.cooper",
        email: "ryan.cooper@yahoo.com",
        ticketId: "TKT-007",
        orderId: "ORD-784548",
        subject: "Account Access Issue",
        message:
          "I cannot log in to my account. I tried resetting my password but the reset email is not arriving. I need to check my order status urgently.",
        date: "2026-02-28",
        status: "Resolved",
        preview: "Account Access Issue - I cannot log in to...",
      },
      {
        id: "TKT-008",
        userName: "Olivia Brown",
        avatar: "https://i.pravatar.cc/150?u=olivia.brown",
        email: "olivia.brown@outlook.com",
        ticketId: "TKT-008",
        orderId: "ORD-784552",
        subject: "Billing Discrepancy",
        message:
          "I was charged twice for my AC maintenance service. I can see two identical charges on my account. Please investigate and refund the duplicate charge immediately.",
        date: "2026-02-27",
        status: "In Progress",
        preview: "Billing Discrepancy - I was charged twice for...",
      },
    ];

    setSupportData(fakeSupportData);
    setLoading(false);
  }, []);

  const handleReplyClick = (ticket) => {
    setSelectedTicket(null);
    setReplyingTicket(ticket);
  };

  const handleSendReply = (ticketId, replyMessage) => {
    console.log(`Reply sent to ${ticketId}: ${replyMessage}`);
    setReplyingTicket(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
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
  }, [openMenuId]);

  const supportTabs = [
    { key: "all", label: "All Tickets" },
    { key: "open", label: "Open" },
    { key: "progress", label: "In Progress" },
    { key: "resolved", label: "Resolved" },
  ];

  const headers = [
    { label: "User", key: "userInfo", sortable: true },
    { label: "Ticket ID", key: "ticketId", sortable: true },
    { label: "Order ID", key: "orderId", sortable: false },
    { label: "Subject", key: "subject", sortable: true },
    { label: "Status", key: "status", sortable: false },
    { label: "Date", key: "date", sortable: true },
    { label: "Action", key: "action", sortable: false },
  ];

  const filteredData = useMemo(() => {
    return supportData.filter((item) => {
      const matchesTab =
        activeTab === "all" || item.status.toLowerCase().replace(" ", "") === activeTab;
      const matchesSearch =
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, supportData]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

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
        {supportTabs.map((tab) => (
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
              ? supportData.length
              : supportData.filter(
                  (d) =>
                    d.status.toLowerCase().replace(" ", "") ===
                    tab.key,
                ).length}
            )
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#73a34f] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 md:mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          size={20}
        />
        <input
          type="text"
          placeholder={t("filters.search") || "Search by user, ticket ID, or subject..."}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 pr-6 py-3 md:py-4 bg-[#f9fafb] rounded-2xl md:rounded-[1.25rem] outline-none text-sm md:text-lg"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-visible">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th
                    key={h.key}
                    className="px-4 md:px-6 pb-2 text-gray-400 font-semibold text-sm md:text-base"
                  >
                    <div className="flex items-center gap-2">{h.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  {/* User Info */}
                  <td className="px-4 md:px-6 py-5 whitespace-nowrap align-middle">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.userName}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                      <span className="text-gray-900 font-bold text-sm md:text-base">
                        {row.userName}
                      </span>
                    </div>
                  </td>

                  {/* Ticket ID */}
                  <td className="px-4 md:px-6 py-5 whitespace-nowrap align-middle">
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      {row.ticketId}
                    </span>
                  </td>

                  {/* Order ID */}
                  <td className="px-4 md:px-6 py-5 whitespace-nowrap align-middle">
                    <span className="text-blue-600 font-medium text-sm md:text-base">
                      {row.orderId}
                    </span>
                  </td>

                  {/* Subject */}
                  <td className="px-4 md:px-6 py-5 align-middle max-w-xs">
                    <span className="text-gray-900 font-medium text-sm md:text-base line-clamp-1">
                      {row.subject}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-5 whitespace-nowrap align-middle">
                    <span
                      className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold inline-block ${
                        row.status === "Open"
                          ? "bg-blue-50 text-blue-600"
                          : row.status === "In Progress"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-green-50 text-green-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 md:px-6 py-5 whitespace-nowrap align-middle">
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      {row.date}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 md:px-6 py-5 whitespace-nowrap align-middle">
                    <div className="relative flex justify-center items-center">
                      <button
                        ref={(el) =>
                          (actionButtonRefs.current[row.id] = el)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === row.id ? null : row.id
                          );
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                      >
                        <EllipsisVertical
                          size={20}
                          className="text-gray-500"
                        />
                      </button>

                      {openMenuId === row.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-full mt-2 z-9999 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200"
                          role="menu"
                          tabIndex={-1}
                        >
                          <button
                            onClick={() => {
                              setSelectedTicket(row);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 bg-[#73a34f] hover:bg-[#638d44] text-white transition-colors border-b border-gray-50"
                            role="menuitem"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              handleReplyClick(row);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors"
                            role="menuitem"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm md:text-base">
          Show Result:
          <span className="bg-gray-50 px-3 py-1 rounded-lg text-black border border-gray-100 flex items-center gap-1">
            {rowsPerPage} <ChevronDown size={14} />
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

      {/* Support Details Modal */}
      <SupportDetailsModal
        isOpen={Boolean(selectedTicket)}
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onReply={handleReplyClick}
      />

      {/* Reply Modal */}
      <ReplyModal
        isOpen={Boolean(replyingTicket)}
        ticket={replyingTicket}
        onClose={() => setReplyingTicket(null)}
        onSend={handleSendReply}
      />
    </div>
  );
};

export default Support;
