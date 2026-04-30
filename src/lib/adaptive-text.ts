export type AdaptiveTextTone = "light" | "dark";

type AdaptiveTextSampler = (viewportX: number, viewportY: number) => number | null;

type AdaptiveTextTarget = {
  currentTone: AdaptiveTextTone | null;
  element: HTMLElement;
  onToneChange: (tone: AdaptiveTextTone) => void;
};

const targets = new Set<AdaptiveTextTarget>();
const pixelBuffer = new Uint8Array(4);
const SYNC_INTERVAL_MS = 180;
const LIGHT_BACKGROUND_THRESHOLD = 0.5;

let sampler: AdaptiveTextSampler | null = null;
let lastSyncTime = 0;
let listenersAttached = false;
let syncFrameId = 0;

const getSamplePoints = (rect: DOMRect) => {
  const clampedLeft = Math.max(rect.left, 0);
  const clampedRight = Math.min(rect.right, window.innerWidth);
  const clampedTop = Math.max(rect.top, 0);
  const clampedBottom = Math.min(rect.bottom, window.innerHeight);
  const centerX = (clampedLeft + clampedRight) / 2;
  const centerY = (clampedTop + clampedBottom) / 2;

  return [
    { x: centerX, y: centerY },
    { x: clampedLeft + (clampedRight - clampedLeft) * 0.2, y: centerY },
    { x: clampedLeft + (clampedRight - clampedLeft) * 0.8, y: centerY },
    { x: centerX, y: clampedTop + (clampedBottom - clampedTop) * 0.2 },
    { x: centerX, y: clampedTop + (clampedBottom - clampedTop) * 0.8 },
  ];
};

const computeTextTone = (rect: DOMRect) => {
  if (!sampler) {
    return "light" as const;
  }

  const samplePoints = getSamplePoints(rect);
  let luminanceTotal = 0;
  let validSamples = 0;

  samplePoints.forEach((point) => {
    const luminance = sampler?.(point.x, point.y);

    if (luminance === null || Number.isNaN(luminance)) {
      return;
    }

    luminanceTotal += luminance;
    validSamples += 1;
  });

  if (validSamples === 0) {
    return "light" as const;
  }

  return luminanceTotal / validSamples > LIGHT_BACKGROUND_THRESHOLD
    ? "dark"
    : "light";
};

const detachListenersIfNeeded = () => {
  if (targets.size > 0 || !listenersAttached) {
    return;
  }

  listenersAttached = false;
  window.removeEventListener("scroll", scheduleAdaptiveTextSync, true);
  window.removeEventListener("resize", scheduleAdaptiveTextSync);
  window.removeEventListener("orientationchange", scheduleAdaptiveTextSync);
};

const attachListenersIfNeeded = () => {
  if (listenersAttached || typeof window === "undefined") {
    return;
  }

  listenersAttached = true;
  window.addEventListener("scroll", scheduleAdaptiveTextSync, true);
  window.addEventListener("resize", scheduleAdaptiveTextSync);
  window.addEventListener("orientationchange", scheduleAdaptiveTextSync);
};

export const syncAdaptiveTextTargets = (force = false) => {
  if (!sampler || typeof window === "undefined") {
    return;
  }

  const now = performance.now();

  if (!force && now - lastSyncTime < SYNC_INTERVAL_MS) {
    return;
  }

  lastSyncTime = now;

  targets.forEach((target) => {
    if (!document.body.contains(target.element)) {
      targets.delete(target);
      return;
    }

    const rect = target.element.getBoundingClientRect();

    if (
      rect.width < 1 ||
      rect.height < 1 ||
      rect.bottom < 0 ||
      rect.top > window.innerHeight ||
      rect.right < 0 ||
      rect.left > window.innerWidth
    ) {
      return;
    }

    const nextTone = computeTextTone(rect);

    if (target.currentTone === nextTone) {
      return;
    }

    target.currentTone = nextTone;
    target.onToneChange(nextTone);
  });

  detachListenersIfNeeded();
};

export function scheduleAdaptiveTextSync() {
  if (typeof window === "undefined" || syncFrameId !== 0) {
    return;
  }

  syncFrameId = window.requestAnimationFrame(() => {
    syncFrameId = 0;
    syncAdaptiveTextTargets(true);
  });
}

export const setAdaptiveTextSampler = (nextSampler: AdaptiveTextSampler | null) => {
  sampler = nextSampler;
  scheduleAdaptiveTextSync();
};

export const readAdaptiveTextPixel = (
  gl: WebGL2RenderingContext,
  drawingBufferWidth: number,
  drawingBufferHeight: number,
  canvasRect: DOMRect,
  viewportX: number,
  viewportY: number
) => {
  if (
    viewportX < canvasRect.left ||
    viewportX > canvasRect.right ||
    viewportY < canvasRect.top ||
    viewportY > canvasRect.bottom
  ) {
    return null;
  }

  const pixelX = Math.max(
    0,
    Math.min(
      drawingBufferWidth - 1,
      Math.round(
        ((viewportX - canvasRect.left) / Math.max(canvasRect.width, 1)) *
          drawingBufferWidth
      )
    )
  );
  const pixelY = Math.max(
    0,
    Math.min(
      drawingBufferHeight - 1,
      Math.round(
        ((canvasRect.bottom - viewportY) / Math.max(canvasRect.height, 1)) *
          drawingBufferHeight
      )
    )
  );

  gl.readPixels(pixelX, pixelY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuffer);

  return (
    (0.2126 * pixelBuffer[0] +
      0.7152 * pixelBuffer[1] +
      0.0722 * pixelBuffer[2]) /
    255
  );
};

export const registerAdaptiveTextTarget = (
  element: HTMLElement,
  onToneChange: (tone: AdaptiveTextTone) => void
) => {
  const target: AdaptiveTextTarget = {
    currentTone: null,
    element,
    onToneChange,
  };

  targets.add(target);
  attachListenersIfNeeded();
  scheduleAdaptiveTextSync();

  return () => {
    targets.delete(target);
    detachListenersIfNeeded();
  };
};
