import { useEffect, useState } from "react";
import StaticBackground from "@/components/StaticBackground";

const DeferredAnimatedBackground = () => {
  const [AnimatedBackground, setAnimatedBackground] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;

    const loadAnimatedBackground = () => {
      import("@/components/AnimatedBackground").then((module) => {
        if (!isCancelled) {
          setAnimatedBackground(() => module.default);
        }
      });
    };

    const queueImport = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(loadAnimatedBackground, {
          timeout: 1200,
        });
      } else {
        timeoutId = window.setTimeout(loadAnimatedBackground, 200);
      }
    };

    const handlePageReady = () => {
      timeoutId = window.setTimeout(queueImport, 120);
    };

    if (document.readyState === "complete") {
      handlePageReady();
    } else {
      window.addEventListener("load", handlePageReady, { once: true });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("load", handlePageReady);

      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!AnimatedBackground) {
    return <StaticBackground />;
  }

  return <AnimatedBackground />;
};

export default DeferredAnimatedBackground;
