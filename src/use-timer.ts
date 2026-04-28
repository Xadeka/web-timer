import React from "react";
import { Timer } from "./utils";

export function useTimer(ms: number, enabled: boolean = true): Timer {
  let timer = React.useRef(new Timer(ms)).current;
  let [_, setTime] = React.useState(timer.current);

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
  }, [enabled]);

  return timer;
}
