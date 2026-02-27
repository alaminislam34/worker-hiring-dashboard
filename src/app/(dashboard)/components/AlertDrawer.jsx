"use client";
import Image from "next/image";
import { X, Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const AlertDrawer = ({ isOpen, setIsOpen, onPayClick }) => {
  const { t } = useTranslation();

  // Simulated data for unpaid or pending orders
  const pendingPayments = [
    {
      id: "ord-101",
      workerName: "Alex Smith",
      avatar: "https://i.pravatar.cc/150?u=alex",
      amount: "$90",
      task: "Assemble IKEA Desk",
      timeLeft: "2 days left",
      isOverdue: false,
    },
    {
      id: "ord-102",
      workerName: "Jordan Reed",
      avatar: "https://i.pravatar.cc/150?u=jordan",
      amount: "$150",
      task: "Garden Maintenance",
      timeLeft: "Overdue",
      isOverdue: true,
    },
    // Add more items here...
  ];

  return (
    <div
      className={`absolute inset-0 z-40 transition-all duration-500 ease-in-out flex justify-end
        ${isOpen ? "visible" : "invisible"}`}
    >
      <div
        className={`absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-500
          ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`relative bg-white max-w-sm w-full h-full shadow-2xl border-l border-gray-100 transition-transform duration-500 ease-in-out p-6 flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {t("notifications.pendingPayments") || "Pending Payments"}
            </h2>
            <p className="text-xs text-gray-400">
              Action required for {pendingPayments.length} orders
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {pendingPayments.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all ${
                item.isOverdue
                  ? "border-red-100 bg-red-50/30"
                  : "border-gray-100 bg-white hover:border-[#73a34f]/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src={item.avatar}
                    fill
                    alt={item.workerName}
                    className="rounded-full object-cover border border-gray-200"
                    unoptimized
                  />
                  {item.isOverdue && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 border-2 border-white">
                      <AlertCircle size={10} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-tight mb-1">
                    <span className="font-bold">{item.workerName}</span> is
                    waiting for payment of{" "}
                    <span className="font-bold text-[#73a34f]">
                      {item.amount}
                    </span>{" "}
                    for "{item.task}"
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Clock
                      size={12}
                      className={
                        item.isOverdue ? "text-red-500" : "text-gray-400"
                      }
                    />
                    <span
                      className={`font-medium ${item.isOverdue ? "text-red-500" : "text-gray-400"}`}
                    >
                      {item.timeLeft}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onPayClick) onPayClick(item);
                  setIsOpen(false);
                }}
                className="w-full py-2 bg-[#73a34f] text-white text-xs font-bold rounded-xl hover:bg-[#5f8a3f] transition-colors shadow-sm"
              >
                Process Payment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertDrawer;
