"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const NotificationDrawer = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const notificationName = "Justin leo";
  const notificationMessage = t("notifications.paymentCompletedBody", {
    amount: "$90",
    order: t("sample.assembleIkeaDeskShort"),
  });

  return (
    <div
      /* absolute ব্যবহার করা হয়েছে যাতে এটি DashboardLayout2 এর ভেতর থাকে।
         z-40 দেওয়া হয়েছে যাতে এটি Navbar (z-50) এর নিচে থাকে। */
      className={`absolute inset-0 z-40 transition-all duration-500 ease-in-out flex justify-end
        ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop: এটি শুধু কন্টেন্ট এরিয়াকে কভার করবে */}
      <div
        className={`absolute inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-500
          ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`relative bg-white max-w-sm w-full h-full shadow-xl border-l border-gray-100 transition-transform duration-500 ease-in-out p-5 flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-700">
            {t("notifications.title")}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-md"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {Array(15)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src="/images/user.jpg"
                    fill
                    alt="User"
                    className="rounded-full object-cover border border-gray-200"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-gray-700 leading-tight">
                    <span className="font-semibold text-black">
                      {notificationName}
                    </span>{" "}
                    {notificationMessage}
                  </p>
                  <span className="text-[10px] text-gray-400">
                    {t("notifications.time")}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
