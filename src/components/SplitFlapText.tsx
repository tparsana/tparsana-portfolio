
import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitFlapTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

const SplitFlapText: React.FC<SplitFlapTextProps> = ({ 
  text, 
  className, 
  delay = 0,
  speed = 50,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [flippingIndex, setFlippingIndex] = useState(-1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setDisplayedText("");
    setFlippingIndex(-1);
    
    // Start new animation after delay
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          setFlippingIndex(currentIndex - 1);
          currentIndex++;
        } else {
          clearInterval(interval);
          setFlippingIndex(-1);
          if (onComplete) onComplete();
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay, speed, onComplete]);

  return (
    <div className={cn("inline-block", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`split-flap-char ${index === flippingIndex ? "animate-flap-flip" : ""}`}
        >
          <span className="char">
            {index < displayedText.length ? char : " "}
          </span>
        </span>
      ))}
    </div>
  );
};

export default SplitFlapText;
