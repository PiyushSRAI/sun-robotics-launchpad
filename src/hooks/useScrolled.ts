import { useState, useEffect, useRef } from "react";

/**
 * Custom hook that uses IntersectionObserver to detect when the page has scrolled
 * past a certain threshold. Much more performant than scroll event listeners.
 */
export function useScrolled(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a sentinel element at the top of the page
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = `${threshold}px`;
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    sentinel.style.pointerEvents = "none";
    document.body.prepend(sentinel);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is not intersecting (scrolled past), set isScrolled true
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (sentinelRef.current && sentinelRef.current.parentNode) {
        sentinelRef.current.parentNode.removeChild(sentinelRef.current);
      }
    };
  }, [threshold]);

  return isScrolled;
}
