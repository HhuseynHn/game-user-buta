"use client";
import i18n from "@/core/config/lib/i18n";
import { useTranslation } from "@/hooks/use-translations";
import React, { useState, useEffect, useRef } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";

const currencies = ["USD", "EUR", "AZN", "TRY"];

export default function CurrencySelector({ selected, onChange }) {
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const handleSelect = (code) => {

        if (onChange) onChange(code);
        setOpen(false)
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


    return (
        <>

            <div ref={containerRef} className="space-y-1 relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-300">
                    {t("Currency")}
                </h3>


                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="w-full px-3 py-2 rounded-lg 
      bg-inherit text-white text-sm
      border border-gray-500 !border-solid
      focus:outline-none focus:ring-1 focus:ring-red-500
      flex justify-between items-center hover:text-red-700 hover:bg-inherit"
                >
                    {currencies.find((lang) => lang === selected) || "Select"}
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
                        {currencies.map((lang, index) => (
                            <li
                                key={lang}
                                onClick={() => handleSelect(lang)}
                                className={`m-0 px-3 py-2 cursor-pointer hover:text-red-600 transition-colors duration-150 
              ${index !== currencies.length - 1 ? "border-b border-gray-600" : ""}`}
                            >
                                {lang}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>


    );
}
