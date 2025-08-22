import { useState, useRef, useEffect, useCallback } from 'react';

export const useTimer = (seconds: number, onEnd: () => void) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [running, setRunning] = useState(false);

    const intervalRef = useRef<number>(null);
    const callbackRef = useRef(onEnd);

    useEffect(() => {
        callbackRef.current = onEnd;
    }, [onEnd]);

    const startTimer = useCallback(() => {
        setTimeLeft(seconds);
        setRunning(true);
    }, [seconds]);

    useEffect(() => {
        if (!running) return;

        intervalRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(intervalRef.current!);
                    callbackRef.current();
                    setRunning(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1_000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running]);

    return { timeLeft, startTimer, running };
};
