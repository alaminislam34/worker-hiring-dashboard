"use client";
import { StateContext } from "@/app/providers/StateProviders";
import { useContext } from "react";
// IMPORT WITHOUT CURLY BRACES
import NotificationDrawer from "../NotificationDrawer";

export default function DashboardLayout2({ children }) {
  const { isOpen, setIsOpen } = useContext(StateContext);

  return (
    /* overflow-hidden is REQUIRED to hide the drawer when it's off-screen */
    <section className="relative w-full h-full min-h-[inherit] overflow-hidden">
      <div className="w-full h-full p-4">{children}</div>

      {/* Render the drawer - it will animate itself based on isOpen */}
      <NotificationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
