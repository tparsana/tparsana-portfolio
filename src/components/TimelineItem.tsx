import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MapPin, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  location?: string;
  logo?: string;
  className?: string;
  isPromotion?: boolean;
  promotionGroup?: string;
  isPromotionEnd?: boolean;
}
const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  subtitle,
  description,
  location,
  logo,
  className,
  isPromotion = false,
  promotionGroup,
  isPromotionEnd = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  const toggleExpand = (e: React.MouseEvent) => {
    // Prevent conflict with hover state on desktop
    if (isMobile) {
      e.stopPropagation();
      setIsExpanded(prev => !prev);
    }
  };
  return <div ref={elementRef} className={cn("group grid md:grid-cols-[1fr_3px_3fr] grid-cols-[60px_3px_1fr] gap-4 md:gap-8 mb-8 opacity-0", isVisible ? "animate-fade-in" : "", className)}>
      <div className="flex flex-col items-end justify-start">
        <div className="split-flap-display py-1 px-2 rounded-sm text-sm md:text-base font-mono bg-transparent">
          {date}
        </div>
        {logo && <div className="mt-2 h-10 w-10 rounded-md bg-secondary flex items-center justify-center p-1 transition-all duration-300 group-hover:scale-105">
            <img src={logo} alt={title} className="h-8 w-8 object-contain filter grayscale opacity-60 transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:opacity-100" />
          </div>}
      </div>

      <div className="relative flex justify-center">
        <div className={cn("absolute top-0 w-3 h-3 rounded-full bg-primary", isVisible ? "animate-flap-flip" : "")} />
        <div className={cn(
          "w-[3px] bg-muted mt-[6px]",
          isPromotion && !isPromotionEnd ? "h-full" : "h-full",
          isPromotionEnd ? "h-16" : "h-full"
        )} />
        {isPromotion && (
          <div className={cn(
            "absolute w-3 h-3 rounded-full bg-primary",
            isPromotionEnd ? "bottom-16" : "bottom-0",
            isVisible ? "animate-flap-flip" : ""
          )} />
        )}
      </div>

      <div className={cn("transform transition-all duration-500 group relative", isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "hover:bg-muted/10 rounded-lg p-2 -m-2")} onMouseEnter={() => !isMobile && setIsExpanded(true)} onMouseLeave={() => !isMobile && setIsExpanded(false)} onClick={toggleExpand}>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground mb-1 text-sm">{subtitle}</p>

        {location && <div className="flex flex-col text-xs text-muted-foreground mb-2">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-muted-foreground mt-1">
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isExpanded ? "rotate-180" : "")} />
              {isMobile && <span className="ml-1 text-[10px]">
                  {isExpanded ? "Click to collapse" : "Click to expand"}
                </span>}
            </div>
          </div>}

        <div className={cn("overflow-hidden transition-all duration-500 ease-in-out", isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
          <p className="text-sm pt-2">{description}</p>
        </div>
      </div>
    </div>;
};
export default TimelineItem;