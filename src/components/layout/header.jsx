"use client";
import React, { useState } from "react";
import Logo from "../ui/logo";
import SearchInput from "../ui/search-input";
import Preference from "../ui/preference";
import Account from "../ui/account";
import Navbar from "../ui/navbar";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState()

  return (
    <>
      <header className="w-full border-b border-gray-700 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center">
            <Logo className="flex-shrink-0" />
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <SearchInput className="w-full max-w-lg" />
          </div>
          <div className="flex items-center gap-4">
            <ul className="hidden sm:flex items-center gap-4 text-sm sm:text-base">
              <li>
                <Preference />
              </li>
              <li className="cursor-pointer hover:text-red-400">orders</li>
              <li className="cursor-pointer hover:text-red-400">Basket</li>
              <li>
                <Account />
              </li>
            </ul>
            <button
              className="sm:hidden p-2 rounded-md hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">

            <Navbar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
