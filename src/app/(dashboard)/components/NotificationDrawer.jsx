"use client";
import Image from "next/image";
import { X } from "lucide-react";

const NotificationDrawer = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`absolute inset-0 z-50 transition-all duration-500 ease-in-out flex justify-end
        ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop blur effect */}
      <div
        className={`absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-500
          ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`relative bg-white max-w-sm w-full h-full shadow-2xl transition-transform duration-500 ease-in-out p-4 flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-500">Notification</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto space-y-6 p-2">
          {Array(20)
            .fill()
            .map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="relative w-11 h-11 shrink-0">
                  <Image
                    src="/images/user.jpg"
                    fill
                    alt="User"
                    className="rounded-full object-cover border border-gray-100"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-bold text-black">Justin leo</span>{" "}
                    payment of $90 was completed for "Assemble IKEA Desk."
                  </p>
                  <span className="text-gray-400 text-xs">Today, 9:12 AM</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
