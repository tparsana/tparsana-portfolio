import { useEffect, useState } from "react";
import { TextEffect } from "@/components/core/text-effect";
import { cn } from "@/lib/utils";

const loaderLines = [
  "My goal is to make an impact...",
  "by solving people's problems through software!",
];

const LINE_VISIBLE_MS = 2000;
const LINE_FADE_MS = 500;
const FINAL_HOLD_MS = 1800;

const BootLoaderText = () => {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isLineVisible, setIsLineVisible] = useState(true);

  useEffect(() => {
    let fadeTimeoutId: number | null = null;
    let switchTimeoutId: number | null = null;
    let completeTimeoutId: number | null = null;

    if (activeLineIndex === loaderLines.length - 1) {
      completeTimeoutId = window.setTimeout(() => {
        window.dispatchEvent(new Event("portfolio-loader-sequence-complete"));
      }, FINAL_HOLD_MS);

      return () => {
        if (completeTimeoutId !== null) {
          window.clearTimeout(completeTimeoutId);
        }
      };
    }

    fadeTimeoutId = window.setTimeout(() => {
      setIsLineVisible(false);
    }, LINE_VISIBLE_MS);

    switchTimeoutId = window.setTimeout(() => {
      setActiveLineIndex((currentIndex) => currentIndex + 1);
      setIsLineVisible(true);
    }, LINE_VISIBLE_MS + LINE_FADE_MS);

    return () => {
      if (fadeTimeoutId !== null) {
        window.clearTimeout(fadeTimeoutId);
      }
      if (switchTimeoutId !== null) {
        window.clearTimeout(switchTimeoutId);
      }
      if (completeTimeoutId !== null) {
        window.clearTimeout(completeTimeoutId);
      }
    };
  }, [activeLineIndex]);

  return (
    <div className="grid min-h-[8rem] w-full place-items-center px-6">
      <div
        className={cn(
          "transition-opacity duration-500 ease-out",
          isLineVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <TextEffect
          key={activeLineIndex}
          preset="fade-in-blur"
          speedReveal={1.1}
          speedSegment={0.3}
          className="text-center text-[clamp(1.35rem,2vw,2rem)] font-normal tracking-[-0.03em] text-white"
        >
          {loaderLines[activeLineIndex]}
        </TextEffect>
      </div>
    </div>
  );
};

export default BootLoaderText;
