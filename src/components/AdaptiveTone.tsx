import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useAdaptiveTone } from "@/hooks/use-adaptive-tone";

type AdaptiveToneProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const AdaptiveTone = ({
  children,
  className,
  ...props
}: AdaptiveToneProps) => {
  const { ref, toneClassName } = useAdaptiveTone<HTMLDivElement>();

  return (
    <div ref={ref} className={cn(toneClassName, className)} {...props}>
      {children}
    </div>
  );
};

export default AdaptiveTone;
