import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface WordByWordTextProps {
  words: string[];
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

const WordByWordText: React.FC<WordByWordTextProps> = ({ 
  words, 
  className, 
  delay = 0,
  speed = 300,
  onComplete 
}) => {
  const [displayedWordCount, setDisplayedWordCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't restart animation if already completed
    if (hasCompleted) return;
    
    // Clear any existing animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Reset state only if not completed
    if (!hasCompleted) {
      setDisplayedWordCount(0);
      setHasStarted(false);
    }
    
    // Start animation after delay
    timeoutRef.current = setTimeout(() => {
      if (hasCompleted) return; // Double check before starting
      
      setHasStarted(true);
      let currentWordIndex = 0;
      
      intervalRef.current = setInterval(() => {
        if (currentWordIndex < words.length) {
          setDisplayedWordCount(currentWordIndex + 1);
          currentWordIndex++;
        } else {
          clearInterval(intervalRef.current!);
          setHasCompleted(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [words, delay, speed]); // Removed onComplete from dependencies

  return (
    <div className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-300 mr-1",
            !hasStarted && !hasCompleted ? "opacity-0 transform translate-y-2" : "",
            (index < displayedWordCount || hasCompleted) ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
          )}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default WordByWordText;
