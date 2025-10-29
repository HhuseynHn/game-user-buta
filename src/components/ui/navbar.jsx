import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { CategoryNavbar } from "../category/category-navbar";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/home">{t("Home")}</Link>
        </li>
        <li>
          <CategoryNavbar />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
