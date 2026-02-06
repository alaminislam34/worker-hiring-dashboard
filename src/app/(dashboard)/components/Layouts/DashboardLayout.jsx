"use client";
import { StateContext } from "@/app/providers/StateProviders";
import { useContext } from "react";

export default function DashboardLayout2({ children }) {
  const { isOpen, setIsOpen } = useContext(StateContext);

  return (
    <section className="relative w-full h-full border">
      {/* 1. Main Content Area */}
      <div className="">{children}</div>

      {/* 2. The Sidebar Drawer (Internal to this section) */}
      <div
        className={`absolute top-0 h-full w-64 bg-black z-50 transition-all duration-300 ease-in-out flex flex-col shadow-2xl
          ${isOpen ? "right-0" : "-right-84"}`}
      >
        <div className="p-5 text-white">
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold">Settings</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded"
            >
              ✕
            </button>
          </div>
          {/* Internal Sidebar Content */}
          <nav className="space-y-4">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-3/4 bg-white/10 rounded" />
          </nav>
        </div>
      </div>
    </section>
  );
}
