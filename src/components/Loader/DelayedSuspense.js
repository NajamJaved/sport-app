import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, useEffect, useState } from "react";
const DelayedSuspense = ({ children, fallback, minDelay = 2000 }) => {
    const [showFallback, setShowFallback] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowFallback(false), minDelay);
        return () => clearTimeout(timer);
    }, [minDelay]);
    return (_jsx(Suspense, { fallback: fallback, children: showFallback ? fallback : children }));
};
export default DelayedSuspense;
