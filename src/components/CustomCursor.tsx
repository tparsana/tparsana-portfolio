
import React, { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isPointerElement = hoveredElement && 
        window.getComputedStyle(hoveredElement).cursor === "pointer";
      setIsPointer(isPointerElement);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousemove", updateCursorType);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousemove", updateCursorType);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      
      document.body.style.cursor = "auto";
    };
  }, [position.x, position.y]);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-150 ${
          isClicking ? "scale-75" : "scale-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div 
          className={`w-6 h-6 bg-white rounded-full flex items-center justify-center ${
            isPointer ? "scale-150" : "scale-100"
          } transition-transform duration-200`} 
        />
      </div>
      
      {/* Cursor trail/shadow */}
      <div
        className="fixed pointer-events-none z-40 w-12 h-12 rounded-full bg-white/30 blur-sm"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.2s, left 0.5s, top 0.5s",
          transitionTimingFunction: "ease-out",
        }}
      />
    </>
  );
};

export default CustomCursor;
