"use client";
import { StateContext } from "@/app/providers/StateProviders";
import { useContext, useEffect, useState } from "react";
// IMPORT WITHOUT CURLY BRACES
import NotificationDrawer from "../NotificationDrawer";
import AlertDrawer from "../AlertDrawer";

export default function DashboardLayout2({ children }) {
  const { isOpen, setIsOpen, isAlertOpen, setIsAlertOpen } =
    useContext(StateContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    /* overflow-hidden is REQUIRED to hide the drawer when it's off-screen */
    <section className="relative w-full h-full min-h-100 overflow-hidden">
      <div className="w-full h-full p-4">{children}</div>

      {/* Render the drawer - it will animate itself based on isOpen */}
      <NotificationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <AlertDrawer isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} orders={orders} />
    </section>
  );
}
