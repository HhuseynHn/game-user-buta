"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translations";

export const CategoryNavbar = ({ vertical = false }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    { key: 'pc', href: "/category/pc" },
    { key: 'stream', href: "/category/stream" },
    { key: 'playstation', href: "/category/playstation" },
    { key: 'others', href: "/category/others" }
  ];

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isClient) {
    return (
      <div className="w-full">
        <div className="sm:hidden mb-4">
          <div className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 bg-inherit rounded-lg">
            <span>Categories</span>
            <Menu size={20} />
          </div>
        </div>
        <div className="hidden sm:block">
          <nav className="relative">
            <div className="flex items-center justify-center space-x-2 lg:space-x-4">
              {categories.map((category) => (
                <div
                  key={category.key}
                  className="px-2 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-4 text-sm lg:text-base xl:text-lg font-medium text-gray-300"
                >
                  {category.key.charAt(0).toUpperCase() + category.key.slice(1)}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Menu Toggle Button - Only for mobile */}
      {!vertical && (
        <div className="sm:hidden mb-4">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 bg-inherit rounded-lg transition-colors duration-200"
            aria-label="Toggle category menu"
          >
            <span>{t("categories")}</span>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      )}

      {/* Mobile Layout */}
      <div className={`
        ${vertical ? 'block' : 'sm:hidden'}
        ${!vertical && !isMobileMenuOpen ? 'hidden' : 'block'}
        transition-all duration-300 ease-in-out
      `}>
        <nav className="w-full">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
            {t("categories")}
          </div>
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li
                key={category.key}
                className="transform transition-all duration-500 ease-in-out"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Link
                  href={category.href}
                  onClick={() => handleCategoryClick(category.key)}
                  className={`relative group block px-4 py-3 text-sm font-medium rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 no-underline hover:no-underline ${activeCategory === category.key
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 scale-105 border-l-4 border-blue-600"
                    : "text-gray-200 hover:text-red-600"
                    }`}
                >
                  <span className="relative z-10">{t(category.key)}</span>

                  {/* Active background effect */}
                  {activeCategory === category.key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop Horizontal Layout (640px+) */}
      {!vertical && (
        <div className="hidden sm:block">
          <nav className="relative">
            <div className="flex items-center justify-center space-x-2 lg:space-x-4">
              {categories.map((category, index) => (
                <Link
                  key={category.key}
                  href={category.href}
                  onClick={() => handleCategoryClick(category.key)}
                  className={`relative group px-2 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-4 text-sm lg:text-base xl:text-lg font-medium rounded-lg transform transition-all duration-500 ease-in-out hover:scale-110 no-underline hover:no-underline ${activeCategory === category.key
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 scale-110 shadow-lg"
                    : "text-gray-300 hover:text-red-600"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 whitespace-nowrap">{t(category.key)}</span>

                  {activeCategory === category.key && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};