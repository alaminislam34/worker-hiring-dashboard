"use client";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const params = useParams();
  const { id } = params; // This is the ID passed from the table

  return (
    <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-50">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p className="text-gray-600">
        Viewing information for Order ID:{" "}
        <span className="font-mono text-black">{id}</span>
      </p>

      {/* You would typically fetch the specific order data here using the ID */}
      <div className="mt-8 p-6 border rounded-xl border-dashed border-gray-200 text-center text-gray-400">
        Order data for {id} will be displayed here.
      </div>
    </div>
  );
}
