
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MapPin, ChevronDown } from "lucide-react";

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  location?: string;
  logo?: string;
  className?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  subtitle,
  description,
  location,
  logo,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "grid md:grid-cols-[1fr_3px_3fr] grid-cols-[60px_3px_1fr] gap-4 md:gap-8 mb-8 opacity-0",
        isVisible ? "animate-fade-in" : "",
        className
      )}
    >
      <div className="flex flex-col items-end justify-start">
        <div className="split-flap-display py-1 px-2 rounded-sm text-sm md:text-base font-mono">
          {date}
        </div>
        {logo && (
          <div className="mt-2 h-10 w-10 rounded-md bg-secondary flex items-center justify-center p-1 filter grayscale hover:grayscale-0 transition-all duration-300">
            <img src={logo} alt={title} className="h-8 w-8 object-contain" />
          </div>
        )}
      </div>

      <div className="relative flex justify-center">
        <div
          className={cn(
            "absolute top-0 w-3 h-3 rounded-full bg-primary mt-2",
            isVisible ? "animate-flap-flip" : ""
          )}
        />
        <div className="h-full w-[3px] bg-muted" />
      </div>

      <div
        className={cn(
          "transform transition-all duration-500 group relative",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          "hover:bg-muted/10 rounded-lg p-2 -m-2"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={toggleExpand}
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mb-1">{subtitle}</p>
        
        {location && (
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>
        )}
        
        <div className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out", // Made transition smoother
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <p className="text-sm pt-2">{description}</p>
        </div>
        
        <div className={cn(
          "absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-6 text-muted-foreground",
          isExpanded ? "opacity-0" : "md:group-hover:opacity-50 opacity-50", // Always visible on mobile
          "transition-opacity duration-300"
        )}>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
