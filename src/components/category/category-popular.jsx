"use client";
import { useCarouselDrag } from "@/hooks/use-carousel-drag";
import { categoryService } from "@/services/category-service";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const CategoryPopular = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const response = await categoryService.getPopularCategories();
        if (isMounted) setCategories(response);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

const { carouselRef, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove } = useCarouselDrag();
  return (
    <div
      ref={carouselRef}
      className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-scroll p-4 cursor-grab active:cursor-grabbing scroll-hidden"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      {categories?.map((cat) => (
        <div
          key={cat.id}
          className="relative w-48 sm:w-56 md:w-64 lg:w-72 flex-shrink-0 rounded-xl overflow-hidden group">
          <Image
            src={cat.imagePath}
            alt={cat.name}
            width={300}
            height={150} 
            className="w-full h-24 sm:h-32 md:h-36 lg:h-40 object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-end justify-start p-3 pb-6 bg-black/40">
            <span className="text-white text-sm sm:text-base md:text-lg font-semibold">
              {cat.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPopular;
