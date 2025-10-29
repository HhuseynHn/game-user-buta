"use client";

import React from "react";
import { X } from "lucide-react";
import LanguageSelector from "./language-selector";
import CurrencySelector from "./currency-selector";
import { useTranslation } from "@/hooks/use-translations";


export default function PreferencesModal({
  isOpen,
  onClose,
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
}) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div
          className="bg-gradient-to-b from-slate-950 via-gray-950 to-[#07043C] shadow-2xl text-white 
          rounded-2xl shadow-xl border border-gray-600
          w-[70%] sm:w-[75%] md:w-[40%] lg:w-[35%] xl:w-[26%] 
          p-12 sm:p-10 md:p-10  relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:right-3 
            bg-inherit border border-transparent hover:border-gray-600 hover:bg-inherit
            px-1 py-1 sm:px-1.5 sm:py-1 
            text-gray-300 hover:text-red-600 
            transition rounded-md"
          >
            <X size={18} className="sm:size-5" />
          </button>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-3 text-left">
            {t("preferences")}
          </h2>

          <LanguageSelector selected={language} onChange={onLanguageChange} />

          <div className="my-3 sm:my-4 border-t border-gray-500" />

          <CurrencySelector selected={currency} onChange={onCurrencyChange} />
        </div>
      </div>

    </>
  );
}