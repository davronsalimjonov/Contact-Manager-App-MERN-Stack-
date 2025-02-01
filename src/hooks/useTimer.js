import { useState, useEffect, useRef, useCallback } from 'react';

export const useStopwatch = ({ autoStart = true, offsetTimestamp = new Date(), updateFrequency = 'minute' }) => {
    const initialTime = Math.floor((new Date() - offsetTimestamp) / 1000);

    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(autoStart);
    const intervalRef = useRef(null);

    const calculateNextMinute = useCallback(() => {
        const secondsElapsed = time % 60;
        return (60 - secondsElapsed) * 1000;
    }, []);

    const start = useCallback(() => {
        setIsRunning(true);
        if (updateFrequency === 'minute') {
            const delay = calculateNextMinute();
            setTimeout(() => {
                setTime((prevTime) => prevTime + delay/1000);
                intervalRef.current = setInterval(() => {
                    setTime((prevTime) => prevTime + 60);
                }, 60000);
            }, delay);
        } else {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    }, [updateFrequency, calculateNextMinute]);

    const pause = useCallback(() => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    }, [isRunning]);

    const reset = useCallback(() => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (autoStart) {
            start();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoStart, start]);

    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
        isRunning,
        start,
        pause,
        reset,
    };
};

// export const useTimer = ({ expiryTimestamp, onExpire, autoStart = true }) => {
//     const [seconds, setSeconds] = useState(0);
//     const [minutes, setMinutes] = useState(0);
//     const [hours, setHours] = useState(0);
//     const [days, setDays] = useState(0);
//     const [isRunning, setIsRunning] = useState(autoStart);
  
//     const intervalRef = useRef();
//     const expiryTimestampRef = useRef(expiryTimestamp);
  
//     const clearTimer = useCallback(() => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = undefined;
//       }
//     }, []);
  
//     const calculateTimeLeft = useCallback(() => {
//       const difference = expiryTimestampRef.current.getTime() - new Date().getTime();
      
//       if (difference <= 0) {
//         clearTimer();
//         setIsRunning(false);
//         onExpire?.();
//         return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//       }
  
//       return {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60)
//       };
//     }, [clearTimer, onExpire]);
  
//     const updateTimer = useCallback(() => {
//       const timeLeft = calculateTimeLeft();
//       setDays(timeLeft.days);
//       setHours(timeLeft.hours);
//       setMinutes(timeLeft.minutes);
//       setSeconds(timeLeft.seconds);
//     }, [calculateTimeLeft]);
  
//     const start = useCallback(() => {
//       if (!isRunning) {
//         setIsRunning(true);
//         updateTimer();
//         intervalRef.current = setInterval(updateTimer, 1000);
//       }
//     }, [isRunning, updateTimer]);
  
//     const pause = useCallback(() => {
//       clearTimer();
//       setIsRunning(false);
//     }, [clearTimer]);
  
//     const resume = useCallback(() => {
//       start();
//     }, [start]);
  
//     const restart = useCallback((newExpiryTimestamp, autoStart = true) => {
//       clearTimer();
//       expiryTimestampRef.current = newExpiryTimestamp;
//       setIsRunning(autoStart);
      
//       if (autoStart) {
//         updateTimer();
//         intervalRef.current = setInterval(updateTimer, 1000);
//       }
//     }, [clearTimer, updateTimer]);
  
//     // Эффект для инициализации таймера
//     useEffect(() => {
//       if (autoStart) {
//         updateTimer();
//         intervalRef.current = setInterval(updateTimer, 1000);
//       }
  
//       return () => clearTimer();
//     }, [autoStart, clearTimer, updateTimer]);
  
//     // Эффект для обновления ссылки на время истечения
//     useEffect(() => {
//       expiryTimestampRef.current = expiryTimestamp;
//     }, [expiryTimestamp]);
  
//     return {
//       seconds,
//       minutes,
//       hours,
//       days,
//       isRunning,
//       start,
//       pause,
//       resume,
//       restart
//     };
//   };
  