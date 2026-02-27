"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StateContext } from "@/app/providers/StateProviders";

const AlertDrawer = ({ isOpen, setIsOpen, orders = [] }) => {
  const router = useRouter();
  const { setIsModalOpen, setSelectedWorker } = useContext(StateContext);
  // Filter orders for pending/unpaid payments
  const pendingPayments = (orders || []).filter(
    (order) => ["Pending", "Unpaid"].includes(order.payment)
  );
  // Helper: get days left or overdue
  function getTimeLeft(orderDate) {
    const today = new Date();
    const due = new Date(orderDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Due today";
    return `${diff} day${diff > 1 ? "s" : ""} left`;
  }
  return (
    <div
      className={`absolute inset-0 z-40 transition-all duration-500 ease-in-out flex justify-end
        ${isOpen ? "visible" : "invisible"}`}
    >
      <div
        className={`absolute inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-500
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
              Pending Payments
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
                item.payment === "Unpaid"
                  ? "border-red-100 bg-red-50/30"
                  : "border-gray-100 bg-white hover:border-[#73a34f]/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src={item.worker?.avatar}
                    fill
                    alt={item.worker?.name}
                    className="rounded-full object-cover border border-gray-200"
                    unoptimized
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-tight mb-1">
                    <span className="font-bold">{item.worker?.name}</span> is
                    waiting for payment of {" "}
                    <span className="font-bold text-[#73a34f]">
                      ${item.budget}
                    </span>{" "}
                    for "{item.order?.title}"
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span
                      className={`font-medium ${item.payment === "Unpaid" ? "text-red-500" : "text-gray-400"}`}
                    >
                      {getTimeLeft(item.date)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedWorker(item);
                  setIsModalOpen(true);
                  setIsOpen(false);
                  router.push("/dashboard/order");
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
