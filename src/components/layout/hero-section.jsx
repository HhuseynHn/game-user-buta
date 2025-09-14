"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/use-carousel";
import { heroSectionService } from "@/services/hero-section-service";
import Image from "next/image";

const HeroSection = () => {
  const [heroSections, setHeroSections] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const response = await heroSectionService.list();
        if (isMounted) setHeroSections(response);
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
    totalSlides,
    currentSlide,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useCarousel(heroSections.length);

  return (
    <div className="relative w-full overflow-hidden h-[60vh]">
      {heroSections.length === 0 ? (
        <div className="flex items-center justify-center h-full bg-gray-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Şəkillər yüklənir...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Carousel Wrapper */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {heroSections.map((slide, index) => (
              <div
                key={slide.id}
                className="relative flex-shrink-0 h-full w-full"
              >
                <Image
                  src={slide.imagePath}
                  alt={`Slide ${slide.id}`}
                  fill
                  priority={index === 0}
                  className="object-contain"
                  sizes="100vw"
                  onError={(e) => {
                    console.error("Image load error:", slide.imagePath);
                    e.target.src = "/placeholder-image.jpg"; // Fallback image
                  }}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows - yalnız 1-dən çox şəkil varsa göstər */}
          {heroSections.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
                           w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 
                           bg-white/10 backdrop-blur-md border border-white/20 
                           rounded-full flex items-center justify-center text-white 
                           hover:bg-white/20 hover:scale-110 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed z-10
                           shadow-lg hover:shadow-xl"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>

              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
                           w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                           bg-white/10 backdrop-blur-md border border-white/20 
                           rounded-full flex items-center justify-center text-white 
                           hover:bg-white/20 hover:scale-110 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed z-10
                           shadow-lg hover:shadow-xl"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>
            </>
          )}

          {heroSections.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-4 z-10">
              {heroSections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full 
                              transition-all duration-300 
                              border border-white/30 hover:scale-105
                              ${
                                currentSlide === index
                                  ? "bg-white scale-115 border-white"
                                  : "bg-white/30 hover:bg-white/50"
                              }`}
                />
              ))}
            </div>
          )}

          {/* Progress bar - yalnız 1-dən çox şəkil varsa göstər */}
          {heroSections.length > 1 && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-10">
              <div
                className="h-full bg-white/60 transition-all duration-300"
                style={{
                  width: `${((currentSlide + 1) / totalSlides) * 100}%`,
                }}
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HeroSection;