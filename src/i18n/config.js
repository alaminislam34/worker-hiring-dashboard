import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

const resources = {
  en: { translation: en },
  "zh-CN": { translation: zhCN },
};

export const LANGUAGE_STORAGE_KEY = "dashboard_language";
export const SUPPORTED_LANGUAGES = Object.keys(resources);
const defaultLanguage = "en";

export const normalizeLanguage = (language) => {
  if (!language) return defaultLanguage;
  if (language.toLowerCase().startsWith("zh")) return "zh-CN";
  return "en";
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: SUPPORTED_LANGUAGES,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export default i18n;
