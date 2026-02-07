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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const shortLabels = t("chart.shortLabels", { returnObjects: true });
  const longLabels = t("chart.longLabels", { returnObjects: true });
  const labels = Array.isArray(shortLabels) ? shortLabels : [];
  const axisLabels = Array.isArray(longLabels) ? longLabels : [];

  // Mock data to match your design peaks
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: t("chart.ordersLabel"),
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
          <h2 className="text-xl font-bold text-gray-800">
            {t("chart.title")}
          </h2>
          <div className="flex gap-4 mt-1 text-sm text-gray-400">
            <span className="cursor-pointer hover:text-gray-600">
              {t("chart.sources.xil")}
            </span>
            <span className="cursor-pointer hover:text-gray-600">
              {t("chart.sources.gante")}
            </span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-all">
          {t("chart.month")} <ChevronDown size={16} />
        </button>
      </div>

      {/* Chart Container */}
      <div className="h-87.5 w-full">
        <Line data={data} options={options} />
      </div>

      {/* X-Axis Custom Date Labels */}
      <div className="flex justify-between mt-4 px-2 text-[10px] md:text-xs text-gray-400 font-medium">
        {axisLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default OrderChart;
