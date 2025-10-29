"use client";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Shield,
} from "lucide-react";
import { useCarouselLatesetProduct } from "@/hooks/use-carousel-product";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const ProductLatestSet = () => {
  const [productCards, setProductCards] = useState([]);



  const {
    carouselRef,
    canScrollLeft,
    canScrollRight,
    scrollCarousel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useCarouselLatesetProduct();
  const { t } = useTranslation();



  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Premium Game ${i + 1}`,
      price: `$${(Math.random() * 60 + 10).toFixed(2)}`,
      originalPrice: `$${(Math.random() * 80 + 50).toFixed(2)}`,
      discount: `${Math.floor(Math.random() * 30 + 10)}%`,
      inStock: Math.random() > 0.2,
      guarantee: `${Math.floor(Math.random() * 3 + 1)} years`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500 + 50),
      image: "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
      category: ["Action", "Adventure", "RPG", "Strategy"][Math.floor(Math.random() * 4)],
    }));
    setProductCards(generated);
  }, []);
  return (
    <div className="relative group px-4 py-6">
      {/* Navigation Buttons */}
      <button
        onClick={() => scrollCarousel("left")}
        className={`hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center ${!canScrollLeft
          ? "opacity-40 cursor-not-allowed"
          : "opacity-0 group-hover:opacity-100"
          }`}
        disabled={!canScrollLeft}>
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <button
        onClick={() => scrollCarousel("right")}
        className={`hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center ${!canScrollRight
          ? "opacity-40 cursor-not-allowed"
          : "opacity-0 group-hover:opacity-100"
          }`}
        disabled={!canScrollRight}>
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide cursor-grab select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        {productCards.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-60 sm:w-70 md:w-80 lg:w-86 bg-gray-900 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card transform hover:-translate-y-2 border-[0.2px] border-[#555555]">
            {/* Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                width={256}
                height={192}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                draggable={false}
              />

              {/* Badges */}
              <div className="absolute top-2 left-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${product.inStock
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800"
                    }`}>
                  <div
                    className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1.5 ${product.inStock ? "bg-emerald-400" : "bg-red-400"
                      }`}
                  />
                  {product.inStock ? t("inStock") : t("outOfStock")}
                </span>
              </div>

              <div className="absolute top-2 right-2">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg">
                  -{product.discount}
                </span>
              </div>

              {/* Category Tag */}
              <div className="absolute bottom-2 left-2">
                <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-0.5 sm:px-2 sm:py-1 rounded-md">
                  {product.category}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-white text-gray-900 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 transform translate-y-2 sm:translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100">
                  {t("quickView")}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2 group-hover/card:text-red-600 transition-colors duration-300">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] sm:text-sm ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-0">
                <span className="text-[14px] sm:text-xl font-bold text-[green]">
                  {product.price}
                </span>
                <span className="text-[10px] sm:text-[12px] text-red-500 line-through">
                  {product.originalPrice}
                </span>
              </div>

              {/* Features */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-600 mb-0 sm:mb-4">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  <span className="text-white text-[10px] sm:text-xs pt-[14px] sm:pt-4">
                    {product.guarantee} {t("warranty")}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                className={`w-full py-1 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-[10px] sm:text-[14px] ${product.inStock
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-lg transform hover:scale-[1.02]"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                disabled={!product.inStock}>
                <ShoppingCart className="hidden sm:inline w-4 h-4" />
                {product.inStock ? t("addToCart") : t("outOfStock")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductLatestSet;
