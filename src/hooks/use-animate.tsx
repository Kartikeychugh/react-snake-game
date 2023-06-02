import { useCallback, useEffect, useRef } from "react";

export const useAnimate = (
  callback: () => void,
  fps: number,
  stop: boolean = false
) => {
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(performance.now());

  const animate = useCallback(() => {
    const now = performance.now();
    const elapsed = now - lastTimeRef.current;
    if (elapsed > 1000 / fps) {
      callback();
      lastTimeRef.current = now;
    }
    if (!stop) requestRef.current = requestAnimationFrame(animate);
  }, [callback, fps, stop]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!!!);
  }, [animate]);
};
