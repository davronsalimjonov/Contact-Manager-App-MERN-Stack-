import { useState, useEffect } from 'react';

function useSessionState(key, initialValue) {
  const getSessionValue = () => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : initialValue;
  };

  const [value, setValue] = useState(getSessionValue);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useSessionState;

