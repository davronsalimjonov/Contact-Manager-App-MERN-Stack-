import { useState, useEffect } from "react";

const useSessionState = (key, initialValue) => {
    const [state, setState] = useState(() => {
        try {
            const sessionValue = sessionStorage.getItem(key);
            return sessionValue ? JSON.parse(sessionValue) : initialValue;
        } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error('Error writing to sessionStorage:', error);
        }
    }, [key, state]);

    return [state, setState];
};

export default useSessionState;
