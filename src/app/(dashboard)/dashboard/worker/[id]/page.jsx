"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { createPortal } from "react-dom";
import CommonTable from "../../components/CommonTable";

const JobDetailsModal = ({ isOpen, job, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !job || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-4xl p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Order Number</p>
            <p className="text-gray-900 font-bold">{job.orderNumber}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Date</p>
            <p className="text-gray-900 font-bold">{job.date}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Job Value</p>
            <p className="text-gray-900 font-bold">{job.value}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <p className="text-gray-900 font-bold">{job.status}</p>
          </div>
        </div>

        <div className="mt-4 bg-[#f9fafb] rounded-xl p-4">
          <p className="text-gray-500 text-sm mb-1">Service</p>
          <p className="text-gray-900 font-semibold">{job.title}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const WorkerDetails = () => {
  const params = useParams();
  const workerId = params?.id;

  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        
        // Fake worker jobs data
        const fakeJobs = [
          {
            id: "job-1",
            orderNumber: "ORD-784512",
            title: "Assemble Office Work Desk",
            date: "2026-02-27",
            value: "$95.00",
            status: "Completed",
          },
          {
            id: "job-2",
            orderNumber: "ORD-784518",
            title: "Install 55-inch Smart TV",
            date: "2026-02-28",
            value: "$140.00",
            status: "In Progress",
          },
          {
            id: "job-3",
            orderNumber: "ORD-784525",
            title: "Repair Kitchen Sink Leakage",
            date: "2026-03-01",
            value: "$70.50",
            status: "Completed",
          },
          {
            id: "job-4",
            orderNumber: "ORD-784530",
            title: "Interior Bedroom Painting",
            date: "2026-03-02",
            value: "$320.00",
            status: "Accepted",
          },
          {
            id: "job-5",
            orderNumber: "ORD-784536",
            title: "Install Ceiling Fan",
            date: "2026-03-03",
            value: "$60.00",
            status: "Completed",
          },
          {
            id: "job-6",
            orderNumber: "ORD-784541",
            title: "Fix Bathroom Shower Pipe",
            date: "2026-03-04",
            value: "$85.00",
            status: "Completed",
          },
          {
            id: "job-7",
            orderNumber: "ORD-784548",
            title: "Install Washing Machine",
            date: "2026-03-05",
            value: "$110.00",
            status: "Confirmed",
          },
          {
            id: "job-8",
            orderNumber: "ORD-784552",
            title: "AC Cleaning & Maintenance",
            date: "2026-03-06",
            value: "$75.00",
            status: "In Progress",
          },
        ];

        setJobsData(fakeJobs);
      } catch (error) {
        console.error("Failed to load worker jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [workerId]);

  const headers = [
    { label: "Order number", key: "orderNumber", sortable: true },
    { label: "Date", key: "date", sortable: true },
    { label: "Value", key: "value", sortable: true },
    { label: "Status", key: "status", sortable: false },
    { label: "Action", key: "action", sortable: false },
  ];

  const tableData = useMemo(
    () =>
      jobsData.map((job) => ({
        ...job,
        action: (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setSelectedJob(job);
            }}
            className="bg-[#262626] hover:bg-black text-white px-5 py-2 rounded-xl font-bold transition-all active:scale-95"
          >
            View details
          </button>
        ),
      })),
    [jobsData],
  );

  // Updated stats based on image_c71903.png
  const stats = [
    { title: "Total Earnings (Lifetime)", value: "$3490" },
    { title: "Earning This month", value: "$560" },
    { title: "Active Orders", value: "2" },
    { title: "Total Jobs Completed", value: "30" },
    { title: "Completion Rate", value: "95%" },
    { title: "Cancellation Rate", value: "5%" },
    { title: "Last Active (time)", value: "1h 22min ago" },
    { title: "Account Status", value: "Active", isStatus: true },
  ];

  return (
    <div className="bg-gray-50">
      <div className="mb-4">
        <div className="flex flex-row gap-2 items-center py-4 text-sm font-medium">
          <Link
            href="/dashboard/worker"
            className="text-gray-400 hover:text-[#73a34f] transition-colors"
          >
            Worker
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">Worker details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md h-45"
          >
            <p className="text-gray-500 text-lg font-medium mb-4">
              {stat.title}
            </p>

            {stat.isStatus ? (
              <div className="bg-[#e8f5e9] text-[#2e7d32] px-6 py-2 rounded-xl font-bold text-lg">
                {stat.value}
              </div>
            ) : (
              <p className="text-xl md:text-2xl xl:text-3xl font-bold text-[#1a1a1a] tracking-tight">
                {stat.value}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-4 md:p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Worker Jobs</h3>

        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#73a34f]" size={34} />
          </div>
        ) : (
          <CommonTable headers={headers} data={tableData} />
        )}
      </div>

      <JobDetailsModal
        isOpen={Boolean(selectedJob)}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};

export default WorkerDetails;
