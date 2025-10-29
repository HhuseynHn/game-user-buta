"use client";
import { useDragScroll } from "@/hooks/use-drag-scrool";
import { categoryService } from "@/services/category-service";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const CategorySuper = () => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await categoryService.getSuperCategories();

        if (isMounted) {
          setCategories(response);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const {
    ref: carouselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  return (
    <div>
      <h2>{t("pickYourPlatform")}</h2>
      <div
        ref={carouselRef}
        className="mt-1 flex gap-4 overflow-x-scroll scroll-hidden p-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        {categories?.map((el) => (
          <div
            key={el.id}
            className="w-1/4 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="rounded-xl overflow-hidden h-36 flex justify-center items-center">
              <Image
                src={el.imagePath}
                alt={el.name || "Epic Header"}
                width={400}
                height={200}
                className="rounded-xl max-w-full max-h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySuper;
