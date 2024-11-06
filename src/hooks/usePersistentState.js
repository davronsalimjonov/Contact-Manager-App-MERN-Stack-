import { useEffect, useState } from "react"

function usePersistentState(key, initialValue) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        if (state !== undefined) {
            localStorage.setItem(key, JSON.stringify(state));
          }
    }, [key, state]);

    return [state, setState];
}

export default usePersistentState