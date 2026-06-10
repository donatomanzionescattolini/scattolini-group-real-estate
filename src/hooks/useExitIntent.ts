import { useEffect, useState } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  /** Delay in ms before exit-intent detection arms, to avoid firing immediately on page load. */
  armDelay?: number;
  /** Fallback delay in ms for touch devices, where mouseleave-based detection doesn't apply. */
  touchDelay?: number;
}

export function useExitIntent({
  enabled = true,
  armDelay = 8000,
  touchDelay = 45000,
}: UseExitIntentOptions = {}): boolean {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!enabled || triggered) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, armDelay);

    const handleMouseOut = (event: MouseEvent) => {
      if (!armed) return;
      if (event.clientY <= 0 && event.relatedTarget === null) {
        setTriggered(true);
      }
    };

    document.addEventListener('mouseout', handleMouseOut);

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const touchTimer = isTouchDevice
      ? window.setTimeout(() => setTriggered(true), touchDelay)
      : undefined;

    return () => {
      window.clearTimeout(armTimer);
      if (touchTimer) window.clearTimeout(touchTimer);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [enabled, triggered, armDelay, touchDelay]);

  return triggered;
}
