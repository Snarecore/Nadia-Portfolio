import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Premium Minimalist GSAP Cursor (Agency Standard)
 * Subtle, high-performance, non-intrusive cursor follower.
 * Automatically hidden on touch/mobile devices via CSS and media queries.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run if fine pointer (mouse / trackpad) is supported
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Centered anchor via GSAP to prevent transform collisions
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power2.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power2.out" });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      isVisible = true;
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { scale: 1.3, duration: 0.15, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "back.out(2)" });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    // Subtle magnetic expand on interactive elements (links, buttons, inputs)
    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target && target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1.5,
          borderColor: "rgba(56, 189, 248, 0.85)",
          backgroundColor: "rgba(14, 165, 233, 0.1)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.6,
          backgroundColor: "#38bdf8",
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const isInteractive = target && target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(56, 189, 248, 0.4)",
          backgroundColor: "transparent",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#38bdf8",
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-sky-400 pointer-events-none z-[99999] opacity-0 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
      />

      {/* Elegant Smooth Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sky-400/40 pointer-events-none z-[99998] opacity-0 will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
