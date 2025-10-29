"use client";
import { CategoryNavbar } from "../category/category-navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoSearchOutline,
  IoMenu,
  IoClose,
  IoCartOutline,
  IoPersonOutline,
  IoReceiptOutline,
} from "react-icons/io5";
import Logo from "../ui/logo";
import PreferencesButton from "../ui/preference-button";
import PreferencesModal from "../ui/preferences-modal";
import { useTranslation } from "@/hooks/use-translations";
import dynamic from "next/dynamic";
import SearchInput from "../ui/search-input";
import { useDispatch, useSelector } from "react-redux";
import { selectItemCount } from "@/core/config/redux/slices/basket-slice";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();
  const basketTotoalItemcount = useSelector(selectItemCount);
  

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <header className="w-full border-b border-gray-700 bg-gradient-to-b from-slate-950 via-gray-950 to-[#07043C] shadow-2xl">
        {/* Main Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo className="text-sm sm:text-base lg:text-lg xl:text-xl" />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-0.5 md:gap-1 lg:gap-2">
              {/* Search Button */}
              <Link
                href="/product-filter"
                className="sm:hidden p-1.5 sm:p-2 flex items-center justify-center rounded-full text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-125 active:scale-95"
                title={isHydrated ? t("search") : "Search"}
              >
                <IoSearchOutline className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </Link>
              <SearchInput className="hidden sm:block" />

              <div className="bg-inherit hover:bg-inherit">
                <button className="p-1 sm:p1-0 text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-100 active:scale-95 bg-inherit hover:bg-inherit">
                  <div className="transform transition-transform duration-1000 ease-in-out hover:scale-110">
                    <PreferencesButton
                      language={language}
                      currency={currency}
                      onClick={() => setIsModalOpen(true)}
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    />
                  </div>
                </button>
              </div>

              {/* Orders Button */}
              <Link
                href="/order"
                className="p-1.5 sm:p-2 text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 bg-inherit hover:bg-inherit"
                title={isHydrated ? t("orders") : "Orders"}
              >
                <IoReceiptOutline className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </Link>

              {/* Cart Button */}
              <Link
                href="/basket"
                className="p-1.5 sm:p-2 text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 relative bg-inherit hover:bg-inherit"
                title={isHydrated ? t("basket") : "Basket"}
              >
                <IoCartOutline className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                  {basketTotoalItemcount}
                </span>
              </Link>

              {/* Account Button */}
              <button
                className="p-1.5 sm:p-2 text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 bg-inherit hover:bg-inherit"
                title={isHydrated ? t("account") : "Account"}
              >
                <IoPersonOutline className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </button>

              {/* Mobile Menu Toggle - Only visible on mobile */}
              <div className="sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-white hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 bg-inherit hover:bg-inherit"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <IoClose className="w-5 h-5" />
                  ) : (
                    <IoMenu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Only visible on mobile */}
          <div
            className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              mobileMenuOpen
                ? "max-h-96 opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-4"
            }`}
          >
            <div
              className={`pb-4 space-y-3 border-t border-gray-700/50 bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-sm transform transition-all duration-300 ease-in-out ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href="/home"
                className="block px-4 py-3 text-sm font-medium text-gray-200 hover:text-red-500 transform hover:scale-105 hover:translate-x-2 transition-all duration-300 ease-in-out no-underline rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isHydrated ? t("home") : "Home"}
              </Link>

              {/* Mobile Category Navigation */}
              <div className="px-2">
                <CategoryNavbar vertical={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center flex-1 justify-items-start px-0 md:px-0 lg:px-0 border-t border-gray-700">
            <nav className="flex justify-items-start gap-1 md:gap-0 m-0">
              <Link
                href="/home"
                className="px-2 w-full py-1.5 md:px-3 flex items-center  md:py-2 lg:px-4 text-xs sm:text-sm md:text-base font-medium text-gray-300 hover:text-red-500 transform transition-all duration-300 ease-in-out hover:scale-110 no-underline"
              >
                {isHydrated ? t("home") : "Home"}
              </Link>

              <CategoryNavbar vertical={false} />
            </nav>
          </div>
        </div>

        <PreferencesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          language={language}
          currency={currency}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
      </header>
    </>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
