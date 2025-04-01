
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ 
  frontContent, 
  backContent, 
  className 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={cn(
        "relative w-full h-full perspective-[1000px] cursor-pointer",
        className
      )}
      onClick={toggleFlip}
    >
      <div 
        className={cn(
          "absolute w-full h-full transition-all duration-500 transform-style-3d backface-hidden",
          isFlipped ? "rotate-y-180" : "rotate-y-0"
        )}
      >
        <div className="absolute w-full h-full p-4 bg-card border rounded-lg shadow">
          {frontContent}
        </div>
      </div>
      <div 
        className={cn(
          "absolute w-full h-full transition-all duration-500 transform-style-3d backface-hidden",
          isFlipped ? "rotate-y-0" : "rotate-y-180"
        )}
      >
        <div className="absolute w-full h-full p-4 bg-card border rounded-lg shadow">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
