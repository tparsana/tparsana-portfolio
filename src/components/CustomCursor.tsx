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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
      setIsMobile(isTouchDevice);
    };

    checkMobile();

    if (isMobile) return;

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const updateCursorType = () => {
      try {
        const hoveredElement = document.elementFromPoint(position.x, position.y);
        const computedStyle = hoveredElement
          ? window.getComputedStyle(hoveredElement)
          : null;

        // Only allow pointer cursor if the element is not generic/static content
        const ignoredTags = ["H1", "SPAN", "P", "DIV", "SECTION", "MAIN"];
        const ignoredClasses = ["no-cursor", "non-interactive", "select-none"];

        const isInteractive =
          hoveredElement &&
          !ignoredTags.includes(hoveredElement.tagName) &&
          !ignoredClasses.some((cls) =>
            hoveredElement.classList.contains(cls)
          );

        const isPointerElement =
          computedStyle &&
          isInteractive &&
          (computedStyle.cursor === "pointer" || computedStyle.cursor === "hand");

        setIsPointer(isPointerElement);
      } catch (err) {
        setIsPointer(false);
      }
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
  }, [position.x, position.y, isMobile]);

  if (isHidden || isMobile) return null;

  return (
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
        className={`w-4 h-4 bg-white rounded-full flex items-center justify-center ${
          isPointer ? "scale-150" : "scale-100"
        } transition-transform duration-200`}
      />
    </div>
  );
};

export default CustomCursor;
