"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  IconSparkle2Fill,
  IconChevronRightLine,
  IconChevronLeftLine,
} from "@karrotmarket/react-monochrome-icon";

export type CategoryType = "all" | "hot" | "apple" | "samsung" | "budget";

export interface CategoryItem {
  id: CategoryType;
  label: string;
  badgeIcon?: React.ReactNode;
  icon?: string;
}

interface CategoryCarouselProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CATEGORIES: CategoryItem[] = [
  { id: "all", label: "전체" },
  {
    id: "hot",
    label: "실시간 특가",
    badgeIcon: <IconSparkle2Fill />,
  },
  { id: "apple", label: "아이폰 18 / 17", icon: "🍎" },
  { id: "samsung", label: "갤럭시 폴드8 / S26", icon: "🤖" },
  { id: "budget", label: "기기값 0원", icon: "🎁" },
];

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef<number | null>(null);

  // Mouse Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  // Update scroll boundaries
  const updateScrollStatus = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollStatus();
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => updateScrollStatus();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollStatus);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollStatus);
    };
  }, [updateScrollStatus]);

  // Continuous auto-scroll loop based on speed (- for left, + for right)
  const stopAutoScroll = useCallback(() => {
    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(
    (speed: number) => {
      stopAutoScroll();
      const scrollLoop = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += speed;
          updateScrollStatus();
        }
        animFrameId.current = requestAnimationFrame(scrollLoop);
      };
      animFrameId.current = requestAnimationFrame(scrollLoop);
    },
    [stopAutoScroll, updateScrollStatus]
  );

  // Handle mouse move across the carousel to trigger smooth right/left scroll on edge hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current || isDragging.current) return;
    const rect = scrollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const edgeThreshold = Math.min(width * 0.35, 120); // right/left trigger boundary

    if (x > width - edgeThreshold && canScrollRight) {
      // Near right edge -> fast scroll right
      const factor = (x - (width - edgeThreshold)) / edgeThreshold;
      const speed = Math.max(18, Math.min(45, factor * 45));
      startAutoScroll(speed);
    } else if (x < edgeThreshold && canScrollLeft) {
      // Near left edge -> fast scroll left
      const factor = (edgeThreshold - x) / edgeThreshold;
      const speed = -Math.max(18, Math.min(45, factor * 45));
      startAutoScroll(speed);
    } else {
      stopAutoScroll();
    }
  };

  const handleMouseLeaveContainer = () => {
    setIsHovered(false);
    stopAutoScroll();
  };

  // Convert vertical mouse wheel to horizontal scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    scrollRef.current.scrollLeft += delta * 2.2;
    updateScrollStatus();
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseDrag = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.2;
    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    updateScrollStatus();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Step scroll button click
  const scrollStep = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = direction === "right" ? 340 : -340;
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div
      className="relative sticky top-14 z-30 bg-white/95 backdrop-blur-xs border-b border-[#F2F3F6] select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeaveContainer}
      onMouseMove={handleMouseMove}
    >
      {/* Left Gradient & Scroll Button */}
      {canScrollLeft && (
        <div
          className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1 pr-4 bg-gradient-to-r from-white via-white/90 to-transparent transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-90"
          }`}
          onMouseEnter={() => startAutoScroll(-38)}
          onMouseLeave={stopAutoScroll}
        >
          <button
            type="button"
            onClick={() => scrollStep("left")}
            className="w-6 h-6 rounded-full bg-white border border-[#EAEBEE] text-[#4D5159] hover:text-[#FF6F0F] hover:border-[#FF6F0F] hover:bg-[#FFF2E8] shadow-xs flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="왼쪽으로 스크롤"
          >
            <span className="w-3.5 h-3.5 inline-flex items-center justify-center">
              <IconChevronLeftLine />
            </span>
          </button>
        </div>
      )}

      {/* Horizontal Scroll Carousel */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseDrag}
        onMouseUp={handleMouseUp}
        className="px-4 py-2.5 overflow-x-auto flex gap-1.5 scrollbar-none cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const isHot = cat.id === "hot";

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                if (!hasDragged.current) {
                  onSelectCategory(cat.id);
                }
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1 hover:-translate-y-0.5 active:translate-y-0 duration-150 cursor-pointer ${
                isSelected
                  ? isHot
                    ? "bg-[#FF6F0F] text-white shadow-xs"
                    : "bg-[#212124] text-white shadow-xs"
                  : isHot
                  ? "bg-[#FFF2E8] text-[#FF6F0F] hover:bg-[#FFE0CC]"
                  : "bg-[#F2F3F6] text-[#4D5159] hover:bg-[#EAEBEE] hover:text-[#212124]"
              }`}
            >
              {cat.badgeIcon && (
                <span className="w-3 h-3 inline-flex items-center">
                  {cat.badgeIcon}
                </span>
              )}
              {cat.icon && <span>{cat.icon}</span>}
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Gradient & Animated Scroll Button */}
      {canScrollRight && (
        <div
          className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1 pl-4 bg-gradient-to-l from-white via-white/90 to-transparent transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-90"
          }`}
          onMouseEnter={() => startAutoScroll(38)}
          onMouseLeave={stopAutoScroll}
        >
          <button
            type="button"
            onClick={() => scrollStep("right")}
            className="w-6 h-6 rounded-full bg-white border border-[#EAEBEE] text-[#4D5159] hover:text-[#FF6F0F] hover:border-[#FF6F0F] hover:bg-[#FFF2E8] shadow-xs flex items-center justify-center transition-all hover:scale-110 active:scale-95 group/btn cursor-pointer"
            aria-label="우측으로 스크롤"
          >
            <span className="w-3.5 h-3.5 inline-flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5 animate-pulse">
              <IconChevronRightLine />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
