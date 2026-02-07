"use client";

import React from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t("auth.loggedInSuccess"));
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
      {/* Logo and Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mb-4">
          <span className="text-black text-3xl font-bold">帮</span>
        </div>
        <h1 className="text-[#4b4b4b] text-3xl font-semibold tracking-tight">
          {t("brand.adminDashboard")}
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-120 mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl">
        <h2 className="text-center text-[28px] font-medium text-gray-900 mb-10">
          {t("auth.welcomeBack")}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-800 ml-1">
              {t("auth.emailAddress")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder={t("auth.enterEmail")}
                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#73a34f] focus:border-transparent outline-none transition-all placeholder:text-gray-300 text-gray-600"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-800 ml-1">
              {t("auth.password")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder={t("auth.enterPassword")}
                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#73a34f] focus:border-transparent outline-none transition-all placeholder:text-gray-300 text-gray-600"
              />
            </div>
          </div>

          {/* Forget Password */}
          <div className="flex justify-end">
            <Link
              href={"/login/forget"}
              className="text-[#73a34f] font-semibold text-lg hover:underline"
            >
              {t("auth.forgotPassword")}
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#73a34f] hover:bg-[#628b43] text-white font-medium py-4 rounded-2xl text-xl mt-4 transition-colors duration-200"
          >
            {t("auth.login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
