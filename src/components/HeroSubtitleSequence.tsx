import { useEffect, useState } from "react";
import AdaptiveTone from "@/components/AdaptiveTone";
import { TextEffect } from "@/components/core/text-effect";
import { cn } from "@/lib/utils";

const heroLines = [
  "My goal is to make an impact..",
  "by solving problems through software!",
  "Full Stack Developer, Data Scientist and AI Engineer",
];

const TEXT_EFFECT_REVEAL_S = 0.7;
const TEXT_EFFECT_SEGMENT_S = 0.16;
const LINE_POST_REVEAL_HOLD_MS = 220;
const LINE_FADE_MS = 320;

const getLineRevealDurationMs = (line: string) => {
  const segmentCount = line.trim().split(/\s+/).length;

  return Math.round(
    (TEXT_EFFECT_REVEAL_S +
      Math.max(segmentCount - 1, 0) * TEXT_EFFECT_SEGMENT_S) *
      1000
  );
};

type HeroSubtitleSequenceProps = {
  className?: string;
};

const HeroSubtitleSequence = ({ className }: HeroSubtitleSequenceProps) => {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isLineVisible, setIsLineVisible] = useState(true);

  useEffect(() => {
    let fadeTimeoutId: number | null = null;
    let switchTimeoutId: number | null = null;

    if (activeLineIndex === heroLines.length - 1) {
      return;
    }

    const activeLine = heroLines[activeLineIndex];
    const revealDurationMs = getLineRevealDurationMs(activeLine);

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
    };
  }, [activeLineIndex]);

  return (
    <div
      className={cn(
        "mx-auto flex min-h-[5rem] items-start justify-center pt-0.5 text-center sm:min-h-[4.5rem] md:min-h-[3.5rem]",
        className
      )}
    >
      <AdaptiveTone
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
          className="text-xl font-normal leading-relaxed tracking-normal md:text-2xl"
        >
          {heroLines[activeLineIndex]}
        </TextEffect>
      </AdaptiveTone>
    </div>
  );
};

export default HeroSubtitleSequence;
