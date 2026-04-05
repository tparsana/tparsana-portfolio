import { useEffect, useRef, useState } from "react";

const CURSOR_EASE = 0.18;

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        "msMaxTouchPoints" in navigator;

      setIsMobile(isTouchDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("has-custom-cursor");

    const setCursorTransform = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * CURSOR_EASE;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * CURSOR_EASE;

      cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
    };

    const updateCursorPosition = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      cursor.style.opacity = "1";
    };

    const handleMouseDown = () => {
      scaleRef.current = 0.75;
    };

    const handleMouseUp = () => {
      scaleRef.current = 1;
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    let animationFrameId = 0;
    const animate = () => {
      setCursorTransform();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updateCursorPosition, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[100] rounded-full mix-blend-difference opacity-0 transition-opacity duration-150 will-change-transform"
    >
      <div className="w-4 h-4 bg-white rounded-full" />
    </div>
  );
};

export default CustomCursor;
