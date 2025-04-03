
import React, { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blobPositions, setBlobPositions] = useState({
    blob1: { x: 0, y: 0 },
    blob2: { x: 0, y: 0 },
    blob3: { x: 0, y: 0 }
  });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smoothed mouse tracking with reduced movement intensity (divided by 50)
      setMousePosition({
        x: e.clientX / 50,
        y: e.clientY / 50
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Independent blob movement animation
    let animationFrameId: number;
    let timestamp = 0;
    
    const animateBlobs = (time: number) => {
      // Calculate time difference for smooth animation
      const delta = time - timestamp;
      timestamp = time;
      
      setBlobPositions(prev => ({
        blob1: {
          x: 15 * Math.sin(time / 2000),
          y: 10 * Math.cos(time / 1800)
        },
        blob2: {
          x: 20 * Math.cos(time / 2200),
          y: 15 * Math.sin(time / 1600)
        },
        blob3: {
          x: 12 * Math.sin(time / 1600 + Math.PI/4),
          y: 18 * Math.cos(time / 2400 + Math.PI/3)
        }
      }));
      
      animationFrameId = requestAnimationFrame(animateBlobs);
    };
    
    animationFrameId = requestAnimationFrame(animateBlobs);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Blob 1 - Top Left */}
      <div 
        className="absolute top-[-150px] left-[-100px] w-[600px] h-[600px] opacity-30 animate-blob-float-slow blur-[80px]"
        style={{ 
          transform: `translate(${blobPositions.blob1.x + mousePosition.x * -0.3}px, ${blobPositions.blob1.y + mousePosition.y * -0.3}px)` 
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#8B5CF6"
            d="M45.7,-58.2C58.9,-47.6,69.3,-32.6,74.8,-15.2C80.3,2.2,80.9,22,73,37.8C65.1,53.6,48.8,65.2,30.7,71.3C12.7,77.3,-7.1,77.8,-24.9,71.7C-42.7,65.6,-58.5,52.9,-67.4,36.1C-76.3,19.3,-78.2,-1.6,-72.6,-19.6C-67.1,-37.6,-54,-52.6,-39.1,-62.9C-24.2,-73.2,-7.5,-78.7,8.1,-88.3C23.7,-97.9,47.4,-111.7,62.3,-105.1C77.2,-98.6,83.3,-71.6,45.7,-58.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Blob 2 - Bottom Right */}
      <div 
        className="absolute bottom-[-100px] right-[-150px] w-[700px] h-[700px] opacity-20 animate-blob-float blur-[100px]"
        style={{ 
          transform: `translate(${blobPositions.blob2.x + mousePosition.x * 0.2}px, ${blobPositions.blob2.y + mousePosition.y * 0.2}px)` 
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#06B6D4"
            d="M38.5,-51.6C49.6,-39.1,57.9,-26.2,62.4,-11.1C66.9,4,67.7,21.4,60.2,34.6C52.6,47.8,36.8,56.9,19.7,64.8C2.7,72.7,-15.6,79.3,-31.9,75.2C-48.2,71.2,-62.5,56.3,-70.8,38.7C-79.1,21.1,-81.3,0.7,-76,-16.8C-70.7,-34.3,-57.8,-49,-43,-59.4C-28.3,-69.9,-11.7,-76.1,1.9,-78.3C15.4,-80.4,30.8,-78.4,38.5,-51.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Blob 3 - Center Right */}
      <div 
        className="absolute top-[30%] right-[-50px] w-[500px] h-[500px] opacity-25 animate-blob-float-reverse blur-[70px]"
        style={{ 
          transform: `translate(${blobPositions.blob3.x + mousePosition.x * 0.1}px, ${blobPositions.blob3.y + mousePosition.y * -0.1}px)` 
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#10B981"
            d="M42.7,-69.9C55.9,-61.7,67.8,-50.8,75.1,-37.1C82.5,-23.4,85.4,-6.9,83.1,9C80.9,24.9,73.4,40.2,62.3,52.2C51.1,64.2,36.1,72.9,19.7,78.2C3.2,83.6,-14.8,85.5,-31,80.7C-47.2,75.9,-61.6,64.3,-70.8,49.5C-80,34.7,-83.9,16.8,-83.6,-0.5C-83.2,-17.8,-78.5,-34.9,-68.6,-47.9C-58.7,-60.8,-43.6,-69.5,-28.8,-76.6C-14,-83.7,0.6,-89.2,14.3,-85.4C28,-81.5,40.8,-68.3,42.7,-69.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
