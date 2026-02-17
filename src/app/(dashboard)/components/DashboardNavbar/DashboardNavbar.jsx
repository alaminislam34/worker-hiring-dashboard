"use client";

import React, { useContext, useMemo, useState, useEffect } from "react";
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
import { normalizeLanguage, LANGUAGE_STORAGE_KEY } from "@/i18n/config";

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

  // Determine current language from i18next state
  const currentLang = normalizeLanguage(i18n.language);
  const isChinese = currentLang === "zh-CN";

  // Handle Language Change with Persistence
  const handleLanguageChange = (e) => {
    const newLang = normalizeLanguage(e.target.value);
    i18n.changeLanguage(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    }
  };

  const pageTitle = useMemo(() => {
    const activeLink = NAV_LINKS.find((link) => link.href === pathname);
    return activeLink ? t(`nav.${activeLink.key}`) : t("nav.management");
    // Explicitly listen to i18n.language for re-calculating the memo
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
        <h1 className="text-base md:text-lg lg:text-xl font-semibold text-slate-800 md:block hidden">
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

        <span className="h-8 w-px bg-gray-200 inline-block mx-1"></span>

        {/* Language Selector */}
        <div className="flex items-center gap-2 px-2">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src={isChinese ? "/images/china.png" : "/images/england.png"}
              fill
              alt={isChinese ? t("a11y.chineseFlag") : t("a11y.englishFlag")}
              className="object-cover rounded-full"
            />
          </div>
          <select
            className="bg-transparent text-gray-700 focus:outline-none text-xs md:text-sm font-medium cursor-pointer"
            value={currentLang}
            onChange={handleLanguageChange}
          >
            <option value="en">{t("language.english")}</option>
            <option value="zh-CN">{t("language.chinese")}</option>
          </select>
        </div>

        <span className="h-8 w-px bg-gray-200 inline-block mx-1"></span>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-primary overflow-hidden border border-gray-100">
            <Image
              src="/images/avatar.png"
              fill
              alt={t("a11y.userAvatar")}
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-tight">
              Justin Leo
            </p>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              {t("nav.admin")}
            </p>
          </div>
        </div>
      </div>

      {/* --- Sidebar Overlay & Panel --- */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSidebar}
        />

        <aside
          className={`absolute top-0 left-0 w-72 bg-white h-full border-r border-gray-100 p-6 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={closeSidebar}
            className="absolute p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-gray-400 top-4 right-4"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-4 mt-8 mb-10 px-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white text-2xl font-bold">帮</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              {t("brand.adminDashboard")}
            </h2>
          </div>

          <ul className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
            {NAV_LINKS.map(({ key, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeSidebar}
                    className={`group py-3 px-4 rounded-xl text-sm flex items-center gap-3 transition-all duration-200 font-semibold ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-primary"
                      }
                    />
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="mt-6 text-white bg-primary hover:bg-primary/90 w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-bold transition-all active:scale-95 shadow-md shadow-primary/20"
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
