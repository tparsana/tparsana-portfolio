
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  onBackButtonClick?: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ 
  frontContent, 
  backContent, 
  className,
  onBackButtonClick
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleBackButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping back
    if (onBackButtonClick) {
      onBackButtonClick();
    }
    // Flip back to front
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
      <div 
        className={cn(
          "absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
          isFlipped ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute w-full h-full p-4 bg-card border rounded-lg shadow">
          {typeof backContent === 'function' ? backContent(handleBackButtonClick) : backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
