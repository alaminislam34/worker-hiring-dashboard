"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const WelcomeSimple = () => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="py-6">
        <h1 className="text-3xl font-bold text-dark">
          {t("welcome.title")} {" "}
          <span className="text-[#33B1E5]">
            {t("brand.adminDashboard")}
          </span>
        </h1>
        <p className="text-gray-500 mt-2">
          {t("welcome.subtitle")}
        </p>
      </div>
    </div>
  );
};

export default WelcomeSimple;
