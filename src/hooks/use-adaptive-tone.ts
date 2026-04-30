import { useEffect, useRef, useState } from "react";
import {
  registerAdaptiveTextTarget,
  type AdaptiveTextTone,
} from "@/lib/adaptive-text";

export const useAdaptiveTone = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [tone, setTone] = useState<AdaptiveTextTone>("light");

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    return registerAdaptiveTextTarget(element, setTone);
  }, []);

  return {
    ref,
    tone,
    toneClassName:
      tone === "dark"
        ? "adaptive-tone adaptive-tone--dark"
        : "adaptive-tone adaptive-tone--light",
  };
};
