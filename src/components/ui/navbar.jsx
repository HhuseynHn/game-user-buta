import Link from "next/link";
import React from "react";
import { CategoryNavbar } from "../category/category-navbar";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <CategoryNavbar />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
