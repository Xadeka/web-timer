import React from "react";
import { Timer } from "@/lib/utils";

type UseTimerResult = {
  reset: () => void;
  format: () => string;
  current: number;
};

export function useTimer(ms: number, enabled: boolean = true): UseTimerResult {
  let [timer] = React.useState(new Timer(ms));
  let [time, setTime] = React.useState(ms);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    timer.start();
    let handle = setInterval(() => {
      setTime(timer.current);
    }, 10);

    return () => {
      timer.pause();
      clearInterval(handle);
    };
  }, [timer, enabled]);

  return {
    reset: React.useCallback(
      function reset() {
        timer.reset();
        setTime(ms);
      },
      [timer, ms],
    ),
    format: timer.format,
    current: time,
  };
}
