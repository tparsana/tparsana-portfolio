
import React, { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
      setIsMobile(isTouchDevice);
    };
    
    checkMobile();
    
    // Don't continue with custom cursor setup if on mobile
    if (isMobile) {
      document.body.style.cursor = "auto";
      return;
    }

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      
      document.body.style.cursor = "auto";
    };
  }, [position.x, position.y, isMobile]);

  // Don't render custom cursor on mobile devices
  if (isHidden || isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-150"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transitionProperty: "transform",
        scale: isClicking ? "0.75" : "1",
      }}
    >
      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center transition-transform duration-200" />
    </div>
  );
};

export default CustomCursor;
