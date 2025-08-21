import { useState, useRef, useEffect } from 'react';

export const useTimer = (seconds: number, onEnd: () => void) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const callbackRef = useRef(onEnd);

    useEffect(() => {
        if (timeLeft <= 0) {
            callbackRef.current();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    callbackRef.current();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    return timeLeft;
};
