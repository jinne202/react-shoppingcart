import { useState, useEffect } from "react";

function getBreakPoint(windowWidth) {
  if (windowWidth) {
    if (windowWidth < 501) {
      return "mobile";
    } else {
      return "desktop";
    }
  } else {
    return undefined;
  }
}

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? getBreakPoint(window.innerWidth) : undefined
  );

  useEffect(() => {
    function setSize() {
      setWindowSize(getBreakPoint(window.innerWidth));
    }

    if (isWindowClient) {
      window.addEventListener("resize", setSize);
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowSize]);

  return windowSize;
}

export default useWindowSize;