import React from "react";
import { Timer } from "@/lib/utils";

type UseTimerResult = {
  reset: () => void;
  format: () => string;
  current: number;
};

export function useTimer(ms: number, enabled: boolean = true): UseTimerResult {
  let timer = React.useRef(new Timer(ms));
  let [time, setTime] = React.useState(0);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    timer.current.start();
    let handle = setInterval(() => {
      setTime(timer.current.current);
    }, 10);

    return () => {
      timer.current.pause();
      clearInterval(handle);
    };
  }, [enabled]);

  return {
    reset: React.useCallback(
      function reset() {
        timer.current.reset();
        setTime(ms);
      },
      [timer, ms],
    ),
    format: timer.current.format,
    current: time,
  };
}
