"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Heart, Sparkles, Users, Clock, Shield, Truck, Eye } from "lucide-react";
import { useTranslation } from "@/hooks/use-translations";


const recommendedProducts = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: `Recommended Game ${i + 1}`,
  price: `$${(Math.random() * 70 + 25).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 90 + 50).toFixed(2)}`,
  discount: `${Math.floor(Math.random() * 35 + 20)}%`,
  inStock: Math.random() > 0.1,
  guarantee: `${Math.floor(Math.random() * 3 + 1)} years`,
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
  reviews: Math.floor(Math.random() * 800 + 150),
  image: "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
  category: ["Action", "Adventure", "RPG", "Strategy", "Sports", "Indie", "Simulation"][Math.floor(Math.random() * 7)],
  reasonType: ["Similar to your favorites", "Based on your wishlist", "Friends are playing", "Trending in your region", "Perfect for your playtime"][Math.floor(Math.random() * 5)],
}));

const RecommendedProductsCarousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { t } = useTranslation();
  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth;
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  // Group products into pages (8 products per page - 3 large + 5 medium)
  const groupedProducts = [];
  for (let i = 0; i < recommendedProducts.length; i += 8) {
    const group = recommendedProducts.slice(i, i + 8);
    groupedProducts.push(group);
  }

  return (
    <div className="relative group px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-white">{t("recommendedForYou")}</h2>
        </div>
        <div className="flex items-center gap-1 text-purple-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{t("personalizedPicks")}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scrollCarousel('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center ${!canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      
      <button
        onClick={() => scrollCarousel('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center ${!canScrollRight ? 'opacity-40 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}
        disabled={!canScrollRight}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab select-none"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {groupedProducts.map((group, groupIndex) => (
          <div key={groupIndex} className="flex-shrink-0 w-full min-w-full">
            
            {/* Top Row - 3 Large Featured Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {group.slice(0, 3).map((product, index) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group/card transform hover:-translate-y-2 border-2 border-purple-500/30 relative"
                >
                  {/* Match Percentage Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {product.matchPercentage}% {t("match")}
                    </div>
                  </div>

                  {/* Hot/New Badge */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    {product.isHot && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        🔥 {t("hot")}
                      </span>
                    )}
                    {product.isNewRelease && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ✨ {t("new")}
                      </span>
                    )}
                  </div>

                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={166}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      draggable={false}
                    />
                    
                    {/* Stock Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {product.inStock ? t("available") : t("outOfStock")}
                        
                      </span>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                        -{product.discount}
                      </span>
                    </div>

                    {/* Category & Play Time */}
                    <div className="absolute top-16 left-4">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-md mb-2 block">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3" />
                        {product.playTime}
                      </div>
                    </div>

                    {/* Friends Playing Indicator */}
                    {product.friendsPlaying > 0 && (
                      <div className="absolute top-20 right-4">
                        <div className="flex items-center gap-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          <Users className="w-3 h-3" />
                          {product.friendsPlaying} {t("friendsPlaying")}
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 transform translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {t("quickView")}
                        </button>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors duration-200 transform translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          {t("wishlist")}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Recommendation Reason */}
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-400 font-medium">
                        {product.reasonType}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover/card:text-purple-400 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400 ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">{t("playTime")}</div>
                        <div className="text-sm font-semibold text-purple-400">{product.playTime}</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-white">{product.price}</span>
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>{product.guarantee} {t("warranty")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        <span>{t("freeShipping")}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                          product.inStock 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transform hover:scale-105' 
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {product.inStock ? t("addToCart") : t("outOfStock")}
                      </button>
                      <button className="p-4 rounded-xl border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row - 5 Medium Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {group.slice(3, 8).map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group/card transform hover:-translate-y-2 border border-purple-500/20"
                >
                  {/* Image Container */}
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      draggable={false}
                    />
                    
                    {/* Match Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {product.matchPercentage}%
                      </span>
                    </div>

                    {/* Hot/New Indicators */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.isHot && <span className="text-xs">🔥</span>}
                      {product.isNewRelease && <span className="text-xs">✨</span>}
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}
                      </span>
                    </div>

                    {/* Stock Status */}
                    <div className="absolute bottom-2 left-2">
                      <span className={`text-xs px-2 py-1 rounded ${product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {product.inStock ? t("available") : t("outOfStock")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Recommendation Type */}
                    <div className="text-xs text-purple-400 mb-2 truncate">
                      {product.reasonType}
                    </div>

                    <h3 className="font-bold text-sm text-white mb-2 line-clamp-2 group-hover/card:text-purple-400 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Rating & Friends */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-400">{product.rating}</span>
                      </div>
                      {product.friendsPlaying > 0 && (
                        <div className="flex items-center gap-1 text-blue-400">
                          <Users className="w-3 h-3" />
                          <span className="text-xs">{product.friendsPlaying}</span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                    </div>

                    {/* Play Time */}
                    <div className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {product.playTime}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 ${
                          product.inStock 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transform hover:scale-105' 
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        {product.inStock ?  t("addToCart") : t("outOfStock")}
                      </button>
                      <button className="p-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
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

export default RecommendedProductsCarousel;