"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Crown,
  TrendingUp,
  Shield,
  Truck,
} from "lucide-react";
import { useCarouselBestProduct } from "@/hooks/use-carousel-product";

const bestSellerProducts = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: `Best Seller Game ${i + 1}`,
  price: `$${(Math.random() * 80 + 20).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 100 + 60).toFixed(2)}`,
  discount: `${Math.floor(Math.random() * 40 + 15)}%`,
  inStock: Math.random() > 0.15,
  guarantee: `${Math.floor(Math.random() * 3 + 1)} years`,
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
  reviews: Math.floor(Math.random() * 1000 + 100),
  soldCount: Math.floor(Math.random() * 5000 + 1000),
  image:
    "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
  category: ["Action", "Adventure", "RPG", "Strategy", "Sports"][
    Math.floor(Math.random() * 5)
  ],
  rank: i + 1,
  isTopSeller: i < 3,
}));

const BestSellerCarousel = () => {
  const {
    carouselRef,
    canScrollLeft,
    canScrollRight,
    scrollCarousel,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useCarouselBestProduct();

  const groupedProducts = [];
  for (let i = 0; i < bestSellerProducts.length; i += 7) {
    groupedProducts.push(bestSellerProducts.slice(i, i + 7));
  }

  return (
    <div className="relative group px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Crown className="w-5 sm:w-7 w-5 sm:h-7 text-red-500" />
          <h2 className="text-[14px] sm:text-xl font-bold text-white">Best Sellers</h2>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          <TrendingUp className="w-3 sm:w-4 w-3 sm:h-4" />
          <span className="text-[9px] sm:text-sm font-medium">Top Selling Games</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scrollCarousel("left")}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          !canScrollLeft
            ? "opacity-40 cursor-not-allowed"
            : "opacity-0 group-hover:opacity-100"
        }`}
        disabled={!canScrollLeft}>
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={() => scrollCarousel("right")}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          !canScrollRight
            ? "opacity-40 cursor-not-allowed"
            : "opacity-0 group-hover:opacity-100"
        }`}
        disabled={!canScrollRight}>
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab select-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        {groupedProducts.map((group, groupIndex) => (
          <div key={groupIndex} className="flex-shrink-0 w-[90%]">
            {/* Top Row - 3 Large Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {group.slice(0, 3).map((product, index) => (
                <div
                  key={product.id}
                  className={`bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group/card transform hover:-translate-y-2 border-2 ${
                    product.isTopSeller
                      ? "border-yellow-500/50"
                      : "border-gray-700"
                  } relative`}>
                  {/* Top Badge */}
                  {product.isTopSeller && (
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className={`px-3 py-2 rounded-full text-[11px] sm:text-[13px] font-bold flex items-center gap-2 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                            : index === 1
                            ? "bg-gradient-to-r from-gray-300 to-gray-500 text-black"
                            : "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                        }`}>
                        {index === 0
                          ? "👑 #1 Best Seller"
                          : index === 1
                          ? "🥈 #2 Best Seller"
                          : "🥉 #3 Best Seller"}
                      </div>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={166}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      draggable={false}
                    />

                    {/* Stock Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-[13px] font-medium ${
                          product.inStock
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            product.inStock ? "bg-emerald-400" : "bg-red-400"
                          }`}
                        />
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[11px] sm:text-[13sm] font-bold px-3 py-2 rounded-full shadow-lg text-[13px]">
                        -{product.discount}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-[11px] sm:text-sm px-3 py-2 rounded-md text-[13px]">
                        {product.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 transform translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 text-[13px]">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Product Name */}
                    <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover/card:text-yellow-400 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Rating & Sales */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400 ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <span className="text-sm text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded">
                        {product.soldCount} sold
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-white">
                        {product.price}
                      </span>
                      <span className="text-[13px] !text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Shield className="w-5 h-5" />
                        <div className="text-[13px]">
                          {product.guarantee} warranty
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full py-3 px-5 rounded-xl font-bold text-[13px] sm:text-[15px] transition-all duration-300 flex items-center justify-center gap-3 ${
                        product.inStock
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-lg transform hover:scale-105"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}>
                      <ShoppingCart className="sm:w-4 sm:h-4 w-5 h-5" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row - 4 Medium Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.slice(3, 7).map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group/card transform hover:-translate-y-2 border border-gray-700">
                  {/* Image Container */}
                  <div className="relative h-36 sm:h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      draggable={false}
                    />

                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-600 text-white text-[9px] sm:text-sm font-bold px-2 py-1 rounded-full">
                        #{product.rank}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-600 text-white text-[9px] sm:text-sm font-bold px-2 py-1 rounded-full">
                        -{product.discount}
                      </span>
                    </div>

                    {/* Stock Status */}
                    <div className="absolute bottom-2 left-2">
                      <span
                        className={`text-[9px] sm:text-xs px-2 py-1 rounded ${
                          product.inStock
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}>
                        {product.inStock ? "In Stock" : "Out"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-[12px] sm:text-lg text-white mb-2 line-clamp-2 group-hover/card:text-yellow-400 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2 sm:mb-3">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      <span className="text-[9px] sm:text-sm text-gray-400">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-4">
                      <span className="text-[13px] sm:text-xl font-bold text-white">
                        {product.price}
                      </span>
                      <span className="text-[10px] sm:text-[12px] text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>

                    {/* Sales Info */}
                    <div className="text-[9px] sm:text-xs text-green-400 mb-2 sm:mb-3 font-medium">
                      {product.soldCount} sold
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-[11px] sm:text-[13px] ${
                        product.inStock
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transform hover:scale-105"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}>
                      <ShoppingCart className="w-3 sm:w-4 h-3 sm:h-4" />
                      <div className="text-[8px] sm:text-[13px]  sm:inline">
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
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

export default BestSellerCarousel;
