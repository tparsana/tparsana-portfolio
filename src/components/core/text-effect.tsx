import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type TextEffectProps = {
  children: string;
  className?: string;
  preset?: "fade-in-blur";
  speedReveal?: number;
  speedSegment?: number;
};

export function TextEffect({
  children,
  className,
  preset = "fade-in-blur",
  speedReveal = 1.1,
  speedSegment = 0.3,
}: TextEffectProps) {
  const [isVisible, setIsVisible] = useState(false);
  const segments = useMemo(() => children.split(" "), [children]);

  useEffect(() => {
    setIsVisible(false);

    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [children]);

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center justify-center text-center",
        className
      )}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className={cn(
            "inline-block whitespace-pre transition-[opacity,filter,transform]",
            preset === "fade-in-blur" &&
              (isVisible
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-3 opacity-0 blur-md")
          )}
          style={{
            transitionDuration: `${speedReveal}s`,
            transitionDelay: `${index * speedSegment}s`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            marginRight: index === segments.length - 1 ? "0" : "0.35em",
          }}
        >
          {segment}
        </span>
      ))}
    </span>
  );
}
