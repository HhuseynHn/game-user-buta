"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "@/hooks/use-translations";

const languages = [
  { code: "en", label: "English" },
  { code: "az", label: "Azerbaijani" },
  { code: "tr", label: "Turkish" },
];

export default function LanguageSelector({ selected, onChange }) {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { t, currentLanguage, changeLanguage, isReady } = useTranslation();

  // Use currentLanguage from hook if no selected prop is provided
  const activeLanguage = selected || currentLanguage;

  const handleSelect = async (code) => {
    try {
      // Use the changeLanguage function from the hook
      await changeLanguage(code);

      // Call the optional onChange callback
      if (onChange) {
        onChange(code);
      }

      setOpen(false);
    } catch (error) {
      console.error('Error selecting language:', error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't render until i18n is ready
  if (!isReady) {
    return <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-16 bg-gray-800 animate-pulse rounded-lg"></div>;
  }

  return (
    <div ref={containerRef} className="space-y-1 relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-300">
        {t("language")}
      </h3>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-3 py-2 rounded-lg 
        bg-inherit text-white text-sm
        border border-gray-500 !border-solid
        focus:outline-none focus:ring-1 focus:ring-red-500
        flex justify-between items-center hover:text-red-700 hover:bg-inherit
        transition-colors duration-200"
      >
        {languages.find((lang) => lang.code === activeLanguage)?.label || "Select"}
        <MdKeyboardArrowDown
          className={`ml-2 w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>

      <div
        className={`absolute mt-2 w-full bg-gradient-to-b from-slate-950 via-gray-950 to-[#07043C] shadow-2xl border border-gray-500 rounded-lg shadow-lg z-10
        transition-all duration-200 ease-in-out overflow-hidden
        ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="text-xs text-white m-0">
          {languages.map((lang, index) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`m-0 px-3 py-2 cursor-pointer hover:text-red-600 transition-colors duration-150 
            ${index !== languages.length - 1 ? "border-b border-gray-600" : ""}
            ${activeLanguage === lang.code ? "bg-red-900/20 text-red-400" : ""}`}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}