import { useEffect, useState } from "react";

const DeferredCustomCursor = () => {
  const [CustomCursor, setCustomCursor] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let isCancelled = false;

    const loadCursor = () => {
      window.removeEventListener("pointermove", loadCursor);

      import("@/components/CustomCursor").then((module) => {
        if (!isCancelled) {
          setCustomCursor(() => module.default);
        }
      });
    };

    window.addEventListener("pointermove", loadCursor, {
      once: true,
      passive: true,
    });

    return () => {
      isCancelled = true;
      window.removeEventListener("pointermove", loadCursor);
    };
  }, []);

  if (!CustomCursor) {
    return null;
  }

  return <CustomCursor />;
};

export default DeferredCustomCursor;
