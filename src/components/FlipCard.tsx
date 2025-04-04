
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  onBackClick?: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ 
  frontContent, 
  backContent, 
  className,
  onBackClick
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBackClick) {
      onBackClick();
      // Flip back to front after action is done
      setIsFlipped(false);
    }
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
          <div className="h-full" onClick={handleBackClick}>
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
