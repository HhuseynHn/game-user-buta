"use client"
import { useTranslation as useI18nTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import i18n from "@/core/config/lib/i18n";

export const useTranslation = () => {
  const { t, i18n: i18nInstance } = useI18nTranslation();

  const changeLanguage = useCallback(async (lng) => {
    try {
      await i18nInstance.changeLanguage(lng);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('language', lng);
        } catch (error) {
          console.error('Error saving language to localStorage:', error);
        }
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [i18nInstance]);

  useEffect(() => {
    const handleLanguageChange = () => {
    };

    i18nInstance.on('languageChanged', handleLanguageChange);

    return () => {
      i18nInstance.off('languageChanged', handleLanguageChange);
    };
  }, [i18nInstance]);

  return {
    t,
    currentLanguage: i18nInstance.language,
    changeLanguage,
    languages: ['en', 'az', 'tr'],
    isReady: i18nInstance.isInitialized
  };
};