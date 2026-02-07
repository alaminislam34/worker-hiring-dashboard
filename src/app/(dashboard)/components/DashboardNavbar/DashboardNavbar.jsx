"use client";

import React, { useContext, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  Users,
  FileText,
  IdCard,
  LayoutGrid,
} from "lucide-react";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";
import { StateContext } from "@/app/providers/StateProviders";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "@/i18n/config";

const NAV_LINKS = [
  { key: "dashboard", icon: LayoutGrid, href: "/dashboard" },
  { key: "order", icon: IdCard, href: "/dashboard/order" },
  { key: "buyer", icon: IdCard, href: "/dashboard/buyer" },
  { key: "worker", icon: Users, href: "/dashboard/worker" },
  { key: "payment", icon: FileText, href: "/dashboard/payment" },
];

const DashboardNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(StateContext);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const currentLang = normalizeLanguage(
    i18n.resolvedLanguage || i18n.language || "en",
  );
  const isChinese = currentLang === "zh-CN";

  const pageTitle = useMemo(() => {
    const activeLink = NAV_LINKS.find((link) => link.href === pathname);
    return activeLink ? t(`nav.${activeLink.key}`) : t("nav.management");
  }, [pathname, t, i18n.language]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <nav className="p-2 md:p-3 lg:p-4 rounded-xl flex items-center justify-between gap-3 relative z-30">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 transition-colors duration-300 lg:hidden shrink-0 rounded-lg"
          aria-label={t("a11y.openMenu")}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base md:text-lg lg:text-xl text-slate-800 md:block hidden">
          {pageTitle}
        </h1>
      </div>

      {/* --- Right Section --- */}
      <div className="flex items-center gap-2 xl:gap-4 shrink-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="p-2.5 hover:bg-gray-200 transition-all duration-300 rounded-full relative"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <span className="h-8 w-0.5 bg-gray-100 inline-block mx-2"></span>
        <div>
          <div className="flex items-center gap-2">
            <Image
              src={`/images/${isChinese ? "china.png" : "england.png"}`}
              width={24}
              height={24}
              alt={
                isChinese ? t("a11y.chineseFlag") : t("a11y.englishFlag")
              }
              className="h-8 rounded-xl w-full md:h-full overflow-hidden"
            />
            <div>
              <select
                name=""
                className="text-gray-500 focus:outline-none text-xs md:text-sm lg:text-base"
                value={currentLang}
                onChange={(e) =>
                  i18n.changeLanguage(normalizeLanguage(e.target.value))
                }
              >
                <option value="en">{t("language.english")}</option>
                <option value="zh-CN">{t("language.chinese")}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center aspect-square w-10 h-10 rounded-full bg-primary overflow-hidden">
            <Image
              src="/images/avatar.png"
              width={24}
              height={24}
              alt={t("a11y.userAvatar")}
              className="rounded-full w-full h-full aspect-square"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Justin Leo</p>
            <p className="text-xs text-gray-500">{t("nav.admin")}</p>
          </div>
        </div>
      </div>

      {/* --- Sidebar Overlay & Panel --- */}
      <div
        className={`fixed inset-0 z-100 transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSidebar}
        />

        {/* Sidebar Panel */}
        <aside
          className={`absolute top-0 left-0 w-80 bg-white h-full border-r border-gray-100 p-6 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={closeSidebar}
            className="absolute p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-gray-400 top-4 right-4 transition-colors"
          >
            <X size={18} />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-4 mt-8 mb-10 px-2">
            <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center ">
              <span className="text-black text-3xl font-bold">帮</span>
            </div>

            <h2 className="text-base font-bold text-gray-900 truncate">
              {t("brand.adminDashboard")}
            </h2>
          </div>

          <ul className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
            {NAV_LINKS.map(({ key, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeSidebar}
                    className={`group py-3 px-4 rounded-xl text-sm md:text-base flex items-center gap-3 transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-primary transition-colors"
                      }
                    />
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout Button */}
          <button
            type="button"
            className="mt-6 text-white bg-primary hover:bg-primary/90 duration-300 w-full flex items-center gap-3 rounded-xl py-3.5 px-5 font-semibold transition-transform active:scale-[0.98] shadow-md shadow-primary/20"
          >
            <HiOutlineLogout className="text-xl rotate-180" />
            {t("nav.logout")}
          </button>
        </aside>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
