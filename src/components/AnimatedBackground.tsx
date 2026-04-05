import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX / 50,
        y: event.clientY / 50,
      };
    };

    let animationFrameId = 0;
    const speedFactor = 4;

    const animateBlobs = (time: number) => {
      const mouse = mouseRef.current;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${15 * Math.sin(time * speedFactor / 2000) + mouse.x * -0.3}px, ${10 * Math.cos(time * speedFactor / 1800) + mouse.y * -0.3}px)`;
      }

      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${20 * Math.cos(time * speedFactor / 2200) + mouse.x * 0.2}px, ${15 * Math.sin(time * speedFactor / 1600) + mouse.y * 0.2}px)`;
      }

      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate(${12 * Math.sin(time * speedFactor / 1600 + Math.PI / 4) + mouse.x * 0.1}px, ${18 * Math.cos(time * speedFactor / 2400 + Math.PI / 3) + mouse.y * -0.1}px)`;
      }

      animationFrameId = window.requestAnimationFrame(animateBlobs);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = window.requestAnimationFrame(animateBlobs);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div
        ref={blob1Ref}
        className="absolute top-[-150px] left-[-100px] w-[600px] h-[600px] opacity-30 blur-[80px] will-change-transform"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#F47A20"
            d="M45.7,-58.2C58.9,-47.6,69.3,-32.6,74.8,-15.2C80.3,2.2,80.9,22,73,37.8C65.1,53.6,48.8,65.2,30.7,71.3C12.7,77.3,-7.1,77.8,-24.9,71.7C-42.7,65.6,-58.5,52.9,-67.4,36.1C-76.3,19.3,-78.2,-1.6,-72.6,-19.6C-67.1,-37.6,-54,-52.6,-39.1,-62.9C-24.2,-73.2,-7.5,-78.7,8.1,-88.3C23.7,-97.9,47.4,-111.7,62.3,-105.1C77.2,-98.6,83.3,-71.6,45.7,-58.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div
        ref={blob2Ref}
        className="absolute bottom-[-100px] right-[-150px] w-[700px] h-[700px] opacity-20 blur-[100px] will-change-transform"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#9EDAE8"
            d="M38.5,-51.6C49.6,-39.1,57.9,-26.2,62.4,-11.1C66.9,4,67.7,21.4,60.2,34.6C52.6,47.8,36.8,56.9,19.7,64.8C2.7,72.7,-15.6,79.3,-31.9,75.2C-48.2,71.2,-62.5,56.3,-70.8,38.7C-79.1,21.1,-81.3,0.7,-76,-16.8C-70.7,-34.3,-57.8,-49,-43,-59.4C-28.3,-69.9,-11.7,-76.1,1.9,-78.3C15.4,-80.4,30.8,-78.4,38.5,-51.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div
        ref={blob3Ref}
        className="absolute top-[30%] right-[-50px] w-[500px] h-[500px] opacity-25 blur-[70px] will-change-transform"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#BFE8EF"
            d="M42.7,-69.9C55.9,-61.7,67.8,-50.8,75.1,-37.1C82.5,-23.4,85.4,-6.9,83.1,9C80.9,24.9,73.4,40.2,62.3,52.2C51.1,64.2,36.1,72.9,19.7,78.2C3.2,83.6,-14.8,85.5,-31,80.7C-47.2,75.9,-61.6,64.3,-70.8,49.5C-80,34.7,-83.9,16.8,-83.6,-0.5C-83.2,-17.8,-78.5,-34.9,-68.6,-47.9C-58.7,-60.8,-43.6,-69.5,-28.8,-76.6C-14,-83.7,0.6,-89.2,14.3,-85.4C28,-81.5,40.8,-68.3,42.7,-69.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
