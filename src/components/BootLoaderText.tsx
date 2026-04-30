import { useEffect, useState } from "react";
import { TextEffect } from "@/components/core/text-effect";
import { cn } from "@/lib/utils";

const loaderLines = [
  "My goal is to make an impact...",
  "by solving people's problems through software!",
];

const TEXT_EFFECT_REVEAL_S = 0.7;
const TEXT_EFFECT_SEGMENT_S = 0.16;
const LINE_POST_REVEAL_HOLD_MS = 220;
const LINE_FADE_MS = 320;
const FINAL_POST_REVEAL_HOLD_MS = 700;

const getLineRevealDurationMs = (line: string) => {
  const segmentCount = line.trim().split(/\s+/).length;

  return Math.round(
    (TEXT_EFFECT_REVEAL_S +
      Math.max(segmentCount - 1, 0) * TEXT_EFFECT_SEGMENT_S) *
      1000
  );
};

const BootLoaderText = () => {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isLineVisible, setIsLineVisible] = useState(true);

  useEffect(() => {
    let fadeTimeoutId: number | null = null;
    let switchTimeoutId: number | null = null;
    let completeTimeoutId: number | null = null;
    const activeLine = loaderLines[activeLineIndex];
    const revealDurationMs = getLineRevealDurationMs(activeLine);

    if (activeLineIndex === loaderLines.length - 1) {
      completeTimeoutId = window.setTimeout(() => {
        window.dispatchEvent(new Event("portfolio-loader-sequence-complete"));
      }, revealDurationMs + FINAL_POST_REVEAL_HOLD_MS);

      return () => {
        if (completeTimeoutId !== null) {
          window.clearTimeout(completeTimeoutId);
        }
      };
    }

    fadeTimeoutId = window.setTimeout(() => {
      setIsLineVisible(false);
    }, revealDurationMs + LINE_POST_REVEAL_HOLD_MS);

    switchTimeoutId = window.setTimeout(() => {
      setActiveLineIndex((currentIndex) => currentIndex + 1);
      setIsLineVisible(true);
    }, revealDurationMs + LINE_POST_REVEAL_HOLD_MS + LINE_FADE_MS);

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
          "transition-opacity duration-300 ease-out",
          isLineVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <TextEffect
          key={activeLineIndex}
          preset="fade-in-blur"
          speedReveal={TEXT_EFFECT_REVEAL_S}
          speedSegment={TEXT_EFFECT_SEGMENT_S}
          className="text-center text-[clamp(1.35rem,2vw,2rem)] font-normal tracking-[-0.03em] text-white"
        >
          {loaderLines[activeLineIndex]}
        </TextEffect>
      </div>
    </div>
  );
};

export default BootLoaderText;
