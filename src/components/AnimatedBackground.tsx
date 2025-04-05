
import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* SVG Blob Background */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Add blur filter */}
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
          </filter>
        </defs>

        <g filter="url(#blur)">
          {/* Large purple blob - top left */}
          <circle r="220" cx="200" cy="200" fill="url(#grad1)" opacity="0.7">
            <animate attributeName="cx" values="200;300;100;200" dur="40s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;100;300;200" dur="36s" repeatCount="indefinite" />
            <animate attributeName="r" values="220;250;200;220" dur="20s" repeatCount="indefinite" />
          </circle>

          {/* Medium cyan blob - bottom right */}
          <circle r="180" cx="600" cy="400" fill="url(#grad2)" opacity="0.5">
            <animate attributeName="cx" values="600;500;700;600" dur="44s" repeatCount="indefinite" />
            <animate attributeName="cy" values="400;500;350;400" dur="38s" repeatCount="indefinite" />
            <animate attributeName="r" values="180;210;160;180" dur="25s" repeatCount="indefinite" />
          </circle>

          {/* Large green blob - center */}
          <circle r="240" cx="400" cy="300" fill="url(#grad3)" opacity="0.6">
            <animate attributeName="cx" values="400;350;450;400" dur="50s" repeatCount="indefinite" />
            <animate attributeName="cy" values="300;350;250;300" dur="42s" repeatCount="indefinite" />
            <animate attributeName="r" values="240;220;260;240" dur="30s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      
      {/* Additional subtle gradient overlay for better depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/80"></div>
    </div>
  );
};

export default AnimatedBackground;
