"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const OrderChart = () => {
  // Mock data to match your design peaks
  const labels = [
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
    "10 Jan",
    "11 Jan",
    "12 Jan",
    "13 Jan",
    "14 Jan",
    "15 Jan",
    "16 Jan",
    "17 Jan",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Orders",
        // Trying to match the wave pattern in your image
        data: [
          100, 150, 240, 160, 430, 180, 260, 210, 310, 120, 160, 140, 360, 220,
          330, 300, 210, 280, 250, 280,
        ],
        borderColor: "#73a34f", // That specific olive green
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(115, 163, 79, 0.2)");
          gradient.addColorStop(1, "rgba(115, 163, 79, 0.0)");
          return gradient;
        },
        borderWidth: 2,
        pointBackgroundColor: "#73a34f",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // Creates those smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#73a34f",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { size: 12 } },
      },
      y: {
        min: 0,
        max: 500,
        ticks: {
          stepSize: 100,
          color: "#94a3b8",
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-4xl p-6 shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order</h2>
          <div className="flex gap-4 mt-1 text-sm text-gray-400">
            <span className="cursor-pointer hover:text-gray-600">XIL</span>
            <span className="cursor-pointer hover:text-gray-600">Gante</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-all">
          October <ChevronDown size={16} />
        </button>
      </div>

      {/* Chart Container */}
      <div className="h-87.5 w-full">
        <Line data={data} options={options} />
      </div>

      {/* X-Axis Custom Date Labels */}
      <div className="flex justify-between mt-4 px-2 text-[10px] md:text-xs text-gray-400 font-medium">
        <span>06 Jan, 2026</span>
        <span>08 Jan, 2026</span>
        <span>10 Jan, 2026</span>
        <span>12 Jan, 2026</span>
        <span>14 Jan, 2026</span>
        <span>16 Jan, 2026</span>
      </div>
    </div>
  );
};

export default OrderChart;
