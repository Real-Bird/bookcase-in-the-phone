import { useEffect, useRef, useState } from "react";

export default function useSwipeReload() {
  const [loading, setLoading] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    function handleTouchStart(event: TouchEvent) {
      touchStartRef.current = event.touches[0].clientY;
    }

    function handleTouchMove(event: TouchEvent) {
      const touchEnd = event.changedTouches[0].clientY;
      let touchDiff = touchEnd - (touchStartRef.current || 0);
      if (touchDiff > 1 && touchDiff < 100) {
        setLoading(true);
      }
    }

    function handleTouchEnd(event: TouchEvent) {
      const touchEnd = event.changedTouches[0].clientY;
      let touchDiff = touchEnd - (touchStartRef.current || 0);
      if (touchDiff > 100) {
        window.location.reload();
      }
      setLoading(false);
      touchDiff = 0;
    }
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { loading };
}
