import { useEffect, useRef } from "react";

const DESKTOP_BREAKPOINT = 768;

const randomInRange = (min: number, max: number) =>
  min + Math.random() * (max - min);

const easeInOutSine = (progress: number) =>
  -(Math.cos(Math.PI * progress) - 1) / 2;

const applyRepulsion = (
  points: Array<{ x: number; y: number }>,
  minDistance: number,
  strength: number
) => {
  const adjustedPoints = points.map((point) => ({ ...point }));

  for (let i = 0; i < adjustedPoints.length; i += 1) {
    for (let j = i + 1; j < adjustedPoints.length; j += 1) {
      const dx = adjustedPoints[i].x - adjustedPoints[j].x;
      const dy = adjustedPoints[i].y - adjustedPoints[j].y;
      const distance = Math.hypot(dx, dy);

      if (distance === 0 || distance >= minDistance) {
        continue;
      }

      const overlap = (minDistance - distance) / minDistance;
      const offsetX = (dx / distance) * overlap * strength;
      const offsetY = (dy / distance) * overlap * strength;

      adjustedPoints[i].x += offsetX;
      adjustedPoints[i].y += offsetY;
      adjustedPoints[j].x -= offsetX;
      adjustedPoints[j].y -= offsetY;
    }
  }

  return adjustedPoints;
};

const pushAwayFromCenter = (
  x: number,
  y: number,
  exclusionX: number,
  exclusionY: number
) => {
  if (Math.abs(x) >= exclusionX || Math.abs(y) >= exclusionY) {
    return { x, y };
  }

  const horizontalBias = Math.abs(x) > Math.abs(y);

  if (horizontalBias) {
    return {
      x: x >= 0 ? exclusionX : -exclusionX,
      y,
    };
  }

  return {
    x,
    y: y >= 0 ? exclusionY : -exclusionY,
  };
};

type BlobWanderState = {
  currentX: number;
  currentY: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  startTime: number;
  duration: number;
  routeCenterX: number;
  routeCenterY: number;
  xRange: number;
  yRange: number;
  minDuration: number;
  maxDuration: number;
  mouseXFactor: number;
  mouseYFactor: number;
};

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

    const desktopMediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_BREAKPOINT}px)`
    );
    const isDesktopRef = { current: desktopMediaQuery.matches };

    const blobStates: BlobWanderState[] = [
      {
        currentX: 0,
        currentY: 0,
        startX: 0,
        startY: 0,
        targetX: 0,
        targetY: 0,
        startTime: 0,
        duration: 0,
        routeCenterX: -140,
        routeCenterY: -90,
        xRange: 360,
        yRange: 260,
        minDuration: 4200,
        maxDuration: 9000,
        mouseXFactor: -0.24,
        mouseYFactor: -0.24,
      },
      {
        currentX: 0,
        currentY: 0,
        startX: 0,
        startY: 0,
        targetX: 0,
        targetY: 0,
        startTime: 0,
        duration: 0,
        routeCenterX: 150,
        routeCenterY: 90,
        xRange: 390,
        yRange: 280,
        minDuration: 4200,
        maxDuration: 9000,
        mouseXFactor: 0.2,
        mouseYFactor: 0.2,
      },
      {
        currentX: 0,
        currentY: 0,
        startX: 0,
        startY: 0,
        targetX: 0,
        targetY: 0,
        startTime: 0,
        duration: 0,
        routeCenterX: 0,
        routeCenterY: -130,
        xRange: 320,
        yRange: 240,
        minDuration: 4200,
        maxDuration: 9000,
        mouseXFactor: 0.06,
        mouseYFactor: -0.06,
      },
    ];

    const assignNewTarget = (state: BlobWanderState, time: number) => {
      const isDesktop = isDesktopRef.current;
      const responsiveXRange = Math.min(
        state.xRange,
        window.innerWidth * (isDesktop ? 0.5 : 0.18)
      );
      const responsiveYRange = Math.min(
        state.yRange,
        window.innerHeight * (isDesktop ? 0.4 : 0.14)
      );
      const routeCenterX = isDesktop ? state.routeCenterX : 0;
      const routeCenterY = isDesktop ? state.routeCenterY : 0;
      const rawTargetX =
        routeCenterX + randomInRange(-responsiveXRange, responsiveXRange);
      const rawTargetY =
        routeCenterY + randomInRange(-responsiveYRange, responsiveYRange);
      const adjustedTarget = isDesktop
        ? pushAwayFromCenter(
            rawTargetX,
            rawTargetY,
            window.innerWidth * 0.18,
            window.innerHeight * 0.14
          )
        : { x: rawTargetX, y: rawTargetY };

      state.startX = state.currentX;
      state.startY = state.currentY;
      state.targetX = adjustedTarget.x;
      state.targetY = adjustedTarget.y;
      state.startTime = time;
      state.duration = randomInRange(state.minDuration, state.maxDuration);
    };

    const updateWander = (state: BlobWanderState, time: number) => {
      if (state.duration === 0) {
        assignNewTarget(state, time);
      }

      const elapsed = time - state.startTime;
      const progress = Math.min(elapsed / state.duration, 1);
      const easedProgress = easeInOutSine(progress);

      state.currentX =
        state.startX + (state.targetX - state.startX) * easedProgress;
      state.currentY =
        state.startY + (state.targetY - state.startY) * easedProgress;

      if (progress >= 1) {
        assignNewTarget(state, time);
      }
    };

    const handleViewportChange = (event: MediaQueryListEvent) => {
      isDesktopRef.current = event.matches;
      blobStates.forEach((state) => {
        state.duration = 0;
      });
    };

    let animationFrameId = 0;
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;
    let hasStartedAnimation = false;
    const speedFactor = 4;

    const animateBlobs = (time: number) => {
      const mouse = mouseRef.current;
      const isDesktop = isDesktopRef.current;
      let blobPositions = blobStates.map((state) => ({
        x: state.currentX,
        y: state.currentY,
      }));

      blobStates.forEach((state) => updateWander(state, time));
      blobPositions = applyRepulsion(
        blobStates.map((state) => ({
          x: state.currentX,
          y: state.currentY,
        })),
        Math.min(window.innerWidth * (isDesktop ? 0.28 : 0.18), isDesktop ? 340 : 160),
        isDesktop ? 36 : 18
      );

      if (blob1Ref.current) {
        const x = isDesktop
          ? blobPositions[0].x + mouse.x * blobStates[0].mouseXFactor
          : blobPositions[0].x;
        const y = isDesktop
          ? blobPositions[0].y + mouse.y * blobStates[0].mouseYFactor
          : blobPositions[0].y;

        blob1Ref.current.style.transform = isDesktop
          ? `translate(-50%, -50%) translate(${x}px, ${y}px)`
          : `translate(${x}px, ${y}px)`;
      }

      if (blob2Ref.current) {
        const x = isDesktop
          ? blobPositions[1].x + mouse.x * blobStates[1].mouseXFactor
          : blobPositions[1].x;
        const y = isDesktop
          ? blobPositions[1].y + mouse.y * blobStates[1].mouseYFactor
          : blobPositions[1].y;

        blob2Ref.current.style.transform = isDesktop
          ? `translate(-50%, -50%) translate(${x}px, ${y}px)`
          : `translate(${x}px, ${y}px)`;
      }

      if (blob3Ref.current) {
        const x = isDesktop
          ? blobPositions[2].x + mouse.x * blobStates[2].mouseXFactor
          : blobPositions[2].x;
        const y = isDesktop
          ? blobPositions[2].y + mouse.y * blobStates[2].mouseYFactor
          : blobPositions[2].y;

        blob3Ref.current.style.transform = isDesktop
          ? `translate(-50%, -50%) translate(${x}px, ${y}px)`
          : `translate(${x}px, ${y}px)`;
      }

      animationFrameId = window.requestAnimationFrame(animateBlobs);
    };

    const startAnimation = () => {
      if (hasStartedAnimation) return;
      hasStartedAnimation = true;

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      desktopMediaQuery.addEventListener("change", handleViewportChange);

      timeoutId = window.setTimeout(() => {
        animationFrameId = window.requestAnimationFrame(animateBlobs);
      }, 180);
    };

    const queueAnimationStart = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(startAnimation, {
          timeout: 700,
        });
      } else {
        timeoutId = window.setTimeout(startAnimation, 120);
      }
    };

    const handlePageLoad = () => {
      queueAnimationStart();
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      desktopMediaQuery.removeEventListener("change", handleViewportChange);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div
        ref={blob1Ref}
        className="absolute top-[-50px] left-[-100px] h-[600px] w-[600px] opacity-30 blur-[80px] will-change-transform md:left-1/2 md:top-1/2 md:h-[820px] md:w-[820px] md:-translate-x-1/2 md:-translate-y-1/2 md:blur-[120px] lg:h-[980px] lg:w-[980px] lg:blur-[150px]"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#1d6c5c"
            d="M45.7,-58.2C58.9,-47.6,69.3,-32.6,74.8,-15.2C80.3,2.2,80.9,22,73,37.8C65.1,53.6,48.8,65.2,30.7,71.3C12.7,77.3,-7.1,77.8,-24.9,71.7C-42.7,65.6,-58.5,52.9,-67.4,36.1C-76.3,19.3,-78.2,-1.6,-72.6,-19.6C-67.1,-37.6,-54,-52.6,-39.1,-62.9C-24.2,-73.2,-7.5,-78.7,8.1,-88.3C23.7,-97.9,47.4,-111.7,62.3,-105.1C77.2,-98.6,83.3,-71.6,45.7,-58.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div
        ref={blob2Ref}
        className="absolute bottom-[-100px] right-[-150px] h-[700px] w-[700px] opacity-20 blur-[100px] will-change-transform md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:h-[960px] md:w-[960px] md:-translate-x-1/2 md:-translate-y-1/2 md:blur-[140px] lg:h-[1120px] lg:w-[1120px] lg:blur-[170px]"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#5b7961"
            d="M38.5,-51.6C49.6,-39.1,57.9,-26.2,62.4,-11.1C66.9,4,67.7,21.4,60.2,34.6C52.6,47.8,36.8,56.9,19.7,64.8C2.7,72.7,-15.6,79.3,-31.9,75.2C-48.2,71.2,-62.5,56.3,-70.8,38.7C-79.1,21.1,-81.3,0.7,-76,-16.8C-70.7,-34.3,-57.8,-49,-43,-59.4C-28.3,-69.9,-11.7,-76.1,1.9,-78.3C15.4,-80.4,30.8,-78.4,38.5,-51.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div
        ref={blob3Ref}
        className="absolute top-[30%] right-[-50px] h-[500px] w-[500px] opacity-25 blur-[70px] will-change-transform md:left-1/2 md:right-auto md:top-1/2 md:h-[680px] md:w-[680px] md:-translate-x-1/2 md:-translate-y-1/2 md:blur-[110px] lg:h-[820px] lg:w-[820px] lg:blur-[135px]"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#e1d5b5"
            d="M42.7,-69.9C55.9,-61.7,67.8,-50.8,75.1,-37.1C82.5,-23.4,85.4,-6.9,83.1,9C80.9,24.9,73.4,40.2,62.3,52.2C51.1,64.2,36.1,72.9,19.7,78.2C3.2,83.6,-14.8,85.5,-31,80.7C-47.2,75.9,-61.6,64.3,-70.8,49.5C-80,34.7,-83.9,16.8,-83.6,-0.5C-83.2,-17.8,-78.5,-34.9,-68.6,-47.9C-58.7,-60.8,-43.6,-69.5,-28.8,-76.6C-14,-83.7,0.6,-89.2,14.3,-85.4C28,-81.5,40.8,-68.3,42.7,-69.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
