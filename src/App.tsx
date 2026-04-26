import { useEffect, useRef, useState } from "react";
import { Timer } from "./utils";

function useTimer(ms: number, enabled: boolean = true): Timer {
  let timer = useRef(new Timer(ms)).current;
  let [_, setTime] = useState(timer.current);

  useEffect(() => {
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

function RoundTimer(props: { minutes: number; enabled?: boolean }) {
  return useTimer(props.minutes * 60 * 1000, props.enabled).format();
}

function App() {
  let [enabled, setEnabled] = useState(false);
  let timerClasses = ["timer-anim"];
  if (enabled) {
    timerClasses.push("play");
  }
  return (
    <>
      <button onClick={() => setEnabled(!enabled)}>Toggle Timer</button>
      <div className={timerClasses.join(" ")} />
      <p className="timer">
        <RoundTimer enabled={enabled} minutes={30} />
      </p>
    </>
  );
}

export default App;
