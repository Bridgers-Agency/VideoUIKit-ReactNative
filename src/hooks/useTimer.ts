import {useEffect, useRef, useState} from 'react';

const useTimer = (startedDate?: Date | null) => {
  const [dateStr, setDateStr] = useState<string>('--:--');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedDate) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - startedDate.getTime();
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

        setDateStr(`${minutesStr}:${secondsStr}`);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startedDate]);

  return {dateStr};
};

export default useTimer;
