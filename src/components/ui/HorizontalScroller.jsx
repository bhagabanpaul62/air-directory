"use client";

import { useRef, useCallback, useEffect, useState } from "react";

export default function HorizontalScroller({
  children,
  className = "",
  ...props
}) {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateCanScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateCanScroll();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateCanScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateCanScroll();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [updateCanScroll]);

  const scrollByAmount = useCallback((direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const page = Math.max(320, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction * page, behavior: "smooth" });
  }, []);

  const scrollLeft = () => scrollByAmount(-1);
  const scrollRight = () => scrollByAmount(1);

  const onKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollLeft();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollRight();
    }
  }, []);

  return (
    <div className={`relative group ${className}`}>
      {/* Edge gradients */}
      {canLeft && (
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent" />
      )}
      {canRight && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent" />
      )}
      {/* Left button */}
      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canLeft}
        aria-label="Scroll left"
        className="hidden md:inline-flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-lg ring-1 ring-black/10 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-4 sm:scroll-px-6"
        style={{ WebkitOverflowScrolling: "touch" }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </div>

      {/* Right button */}
      <button
        type="button"
        onClick={scrollRight}
        disabled={!canRight}
        aria-label="Scroll right"
        className="hidden md:inline-flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-lg ring-1 ring-black/10 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
