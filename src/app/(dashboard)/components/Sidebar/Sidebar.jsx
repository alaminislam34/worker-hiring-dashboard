"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, FileText, IdCard, LayoutGrid } from "lucide-react";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { BsCreditCardFill } from "react-icons/bs";

const SIDELINKS = [
  {
    name: "Dashboard",
    icon: <BsFillGrid1X2Fill className="text-2xl p-1" />,
    href: "/dashboard",
    match: (path) => path === "/dashboard" || /^\/dashboard\/\d+$/.test(path),
  },
  {
    name: "Order",
    icon: <IoMdListBox className="text-2xl" />,
    href: "/dashboard/order",
    match: (path) => path.startsWith("/dashboard/order"),
  },
  {
    name: "Buyer",
    icon: <FaUser className="text-2xl p-0.5" />,
    href: "/dashboard/buyer",
    match: (path) => path.startsWith("/dashboard/buyer"),
  },
  {
    name: "Worker",
    icon: <FaUserTie className="text-2xl p-0.5" />,
    href: "/dashboard/worker",
    match: (path) => path.startsWith("/dashboard/worker"),
  },
  {
    name: "Payment",
    icon: <BsCreditCardFill className="text-2xl p-0.5" />,
    href: "/dashboard/payment",
    match: (path) => path.startsWith("/dashboard/payment"),
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 min-h-200 overflow-y-auto h-screen lg:w-67 xl:w-77">
      <div className="h-full">
        <div className="flex flex-col justify-between p-6 transition-all h-full">
          <div>
            {/* User Profile Section */}
            <div className="flex items-center gap-4 mb-16 mt-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">帮</span>
              </div>

              <h2 className="text-sm md:text-base text-slate-900 truncate">
                Admin Dashboard
              </h2>
            </div>

            <nav>
              <ul className="flex flex-col gap-2">
                {SIDELINKS.map((link) => {
                  const isActive = link.match(pathname);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`
                      group flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary text-white shadow-sm ring-1 ring-primary"
                          : "text-gray-600"
                      }
                    `}
                      >
                        <span
                          className={`${
                            isActive ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {link.icon}
                        </span>
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <button className="flex items-center gap-4 w-full px-5 py-3 mt-auto font-semibold text-white transition-all rounded-xl bg-primary hover:bg-primary hover:shadow-lg active:scale-95 group">
            <HiOutlineLogout className="text-xl transition-transform group-hover:translate-x-1" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
