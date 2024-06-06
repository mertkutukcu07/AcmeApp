import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { en, tr } from "./resources";

export const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

export const languages = [
  { label: "English", value: "en" },
  { label: "Turkish", value: "tr" },
];

const getUserLanguage = (): string => {
  const LOCALE = getLocales()[0];
  return LOCALE?.languageCode || "en";
};

i18n.use(initReactI18next).init({
  debug: false,
  lng: getUserLanguage(),
  fallbackLng: "en",
  resources,
  compatibilityJSON: "v3",
});

export default i18n;
