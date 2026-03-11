"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { createPortal } from "react-dom";
import CommonTable from "../../components/CommonTable";

const OrderDetailsModal = ({ isOpen, order, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !order || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-4xl p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Order Number</p>
            <p className="text-gray-900 font-bold">{order.orderNumber}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Date</p>
            <p className="text-gray-900 font-bold">{order.date}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Order Value</p>
            <p className="text-gray-900 font-bold">{order.value}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <p className="text-gray-900 font-bold">{order.status}</p>
          </div>
        </div>

        <div className="mt-4 bg-[#f9fafb] rounded-xl p-4">
          <p className="text-gray-500 text-sm mb-1">Service</p>
          <p className="text-gray-900 font-semibold">{order.title}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const BuyerDetails = () => {
  const params = useParams();
  const buyerId = params?.id;

  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        const allOrders = await response.json();

        const normalizedId = Number(buyerId);
        const buyerOrders = allOrders
          .filter((_, index) => ((index % 10) + 1).toString() === String(normalizedId))
          .slice(0, 8)
          .map((item, index) => ({
            id: `${item.id}-${index}`,
            orderNumber: item.order.id,
            title: item.order.title,
            date: item.date,
            value: `$${item.budget}`,
            status: item.status,
          }));

        setOrdersData(buyerOrders);
      } catch (error) {
        console.error("Failed to load buyer orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [buyerId]);

  const headers = [
    { label: "Order number", key: "orderNumber", sortable: true },
    { label: "Date", key: "date", sortable: true },
    { label: "Value", key: "value", sortable: true },
    { label: "Status", key: "status", sortable: false },
    { label: "Action", key: "action", sortable: false },
  ];

  const tableData = useMemo(
    () =>
      ordersData.map((order) => ({
        ...order,
        action: (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setSelectedOrder(order);
            }}
            className="bg-[#262626] hover:bg-black text-white px-5 py-2 rounded-xl font-bold transition-all active:scale-95"
          >
            View details
          </button>
        ),
      })),
    [ordersData],
  );

  const stats = [
    { title: "Total Order Value", value: "$4400" },
    { title: "Average Order Value", value: "$110" },
    { title: "Total Orders", value: "50" },
    { title: "Completed Orders", value: "40" },
    { title: "Cancelled Orders", value: "10" },
    { title: "Completion Rate", value: "90%" },
    { title: "Cancellation Rate", value: "10%" },
  ];

  return (
    <div className="bg-gray-50">
      <div className="mb-4">
        <div className="flex flex-row gap-2 items-center  py-4">
          <Link
            href="/dashboard/buyer"
            className="text-blue-500 hover:underline"
          >
            Buyer
          </Link>
          {"/"} <span className="text-gray-500">Buyer details</span>
        </div>
      </div>
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-[1.25rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
          >
            <p className="text-gray-500 text-lg font-medium mb-6">
              {stat.title}
            </p>
            <p className="text-xl md:text-2xl xl:text-3xl font-bold text-black tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-4 md:p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Buyer Orders</h3>

        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#73a34f]" size={34} />
          </div>
        ) : (
          <CommonTable headers={headers} data={tableData} />
        )}
      </div>

      <OrderDetailsModal
        isOpen={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default BuyerDetails;
