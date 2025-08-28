import React, { Suspense, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
  minDelay?: number; // in ms
}

const DelayedSuspense = ({ children, fallback, minDelay = 2000 }: Props) => {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), minDelay);
    return () => clearTimeout(timer);
  }, [minDelay]);

  return (
    <Suspense fallback={fallback}>
      {showFallback ? fallback : children}
    </Suspense>
  );
};

export default DelayedSuspense;
