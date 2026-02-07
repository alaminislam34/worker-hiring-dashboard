"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, {
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
} from "@/i18n/config";

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage) return normalizeLanguage(storedLanguage);
  const browserLanguage = window.navigator.language || "en";
  return normalizeLanguage(browserLanguage);
};

const I18nProvider = ({ children }) => {
  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    if (i18n.language !== initialLanguage) {
      i18n.changeLanguage(initialLanguage);
    }
    document.documentElement.lang = initialLanguage;
  }, []);

  useEffect(() => {
    const handleLanguageChange = (language) => {
      const normalized = normalizeLanguage(language);
      if (language !== normalized) {
        i18n.changeLanguage(normalized);
        return;
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
      }
      document.documentElement.lang = normalized;
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
