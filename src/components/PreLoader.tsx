import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SplitFlapText from "./SplitFlapText";

interface PreLoaderProps {
  onLoadComplete: () => void;
}

const PreLoader: React.FC<PreLoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    const loadingTexts = [
      "Initializing...",
      "Loading components...",
      "Ready!",
    ];

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 25;
        
        const textIndex = Math.min(
          Math.floor((newProgress / 100) * loadingTexts.length),
          loadingTexts.length - 1
        );
        
        if (loadingTexts[textIndex] !== loadingText) {
          setLoadingText(loadingTexts[textIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          
          setTimeout(() => {
            onLoadComplete();
          }, 400);
          
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [loadingText, onLoadComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
        "transition-opacity duration-500",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="relative mb-8 w-64 h-40 split-flap-display flex items-center justify-center rounded-md border overflow-hidden">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            {Math.round(progress)}%
          </div>
          <SplitFlapText text={loadingText} className="text-sm" />
        </div>
      </div>
      
      <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default PreLoader;
