"use client";
import { useRef, useState, useCallback, useEffect } from "react";

export const useCarouselLatesetProduct = () => {
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Scroll button state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scrollCarousel = useCallback((direction, scrollAmount = 280) => {
    if (carouselRef.current) {
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  }, []);

  // Mouse / touch handlers
  const handleStart = useCallback((pageX) => {
    isDragging.current = true;
    startX.current = pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    if (carouselRef.current) carouselRef.current.style.cursor = "grabbing";
  }, []);

  const handleMove = useCallback((pageX) => {
    if (!isDragging.current) return;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.8;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleEnd = useCallback(() => {
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  }, []);

  // Mouse events
  const onMouseDown = useCallback((e) => handleStart(e.pageX), [handleStart]);
  const onMouseMove = useCallback((e) => handleMove(e.pageX), [handleMove]);
  const onMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const onMouseLeave = useCallback(() => handleEnd(), [handleEnd]);

  // Touch events for mobile
  const onTouchStart = useCallback((e) => handleStart(e.touches[0].pageX), [handleStart]);
  const onTouchMove = useCallback((e) => handleMove(e.touches[0].pageX), [handleMove]);
  const onTouchEnd = useCallback(() => handleEnd(), [handleEnd]);

  // Update scroll button visibility on scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () => carousel.removeEventListener("scroll", checkScrollButtons);
    }
  }, [checkScrollButtons]);

  return {
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
  };
};



export const useCarouselBestProduct = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = window.innerWidth * 0.8; // daha yumuşaq scroll
    carouselRef.current.scrollTo({
      left: direction === "left" ? carouselRef.current.scrollLeft - scrollAmount : carouselRef.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;
    carousel.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();
    return () => carousel.removeEventListener("scroll", checkScrollButtons);
  }, []);

  return {
    carouselRef,
    canScrollLeft,
    canScrollRight,
    scrollCarousel,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  };
};
