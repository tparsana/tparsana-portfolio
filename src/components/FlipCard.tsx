import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: (flipBack: () => void) => React.ReactNode;
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

  const flipBack = () => {
    setIsFlipped(false);
  };

  return (
    <div 
      className={cn(
        "relative w-full h-full cursor-pointer [perspective:1000px]",
        className
      )}
      onClick={toggleFlip}
    >
      {/* Front Side */}
      <div 
        className={cn(
          "absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        <div className="absolute w-full h-full p-4 bg-card border rounded-lg shadow">
          {frontContent}
        </div>
      </div>

      {/* Back Side */}
      <div 
        className={cn(
          "absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
          isFlipped ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute w-full h-full p-4 bg-card border rounded-lg shadow">
          {backContent(flipBack)}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
