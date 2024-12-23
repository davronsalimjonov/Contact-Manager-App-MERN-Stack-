import { useCallback, useRef } from "react";

const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    return useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
            timeoutRef.current = null;
        }, delay);
    }, [callback, delay]);
};

export default useDebounce