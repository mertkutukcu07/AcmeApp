import React, { createContext, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LanguageContextType {
  language: string | null;
  t: (key: string) => string;
  changeLanguage: (newLanguage: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProps> = ({ children }) => {
  const [language, setLanguage] = useState<string | null>(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
      } else {
        const defaultLanguage = i18n.language;
        setLanguage(defaultLanguage);
        i18n.changeLanguage(defaultLanguage);
      }
    };

    fetchLanguage();
  }, []);

  const changeLanguage = async (newLanguage: string) => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const contextValue: LanguageContextType = {
    language,
    t,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
