import React from "react";
import { useTimer } from "./use-timer";

function App() {
  let [enabled, setEnabled] = React.useState(false);
  let timer = useTimer(30 * 60 * 1000, enabled);
  let timerClasses = ["timer-anim"];
  if (enabled) {
    timerClasses.push("play");
  }
  return (
    <>
      <button onClick={() => setEnabled(!enabled)}>Toggle Timer</button>
      <div className={timerClasses.join(" ")} />
      <p className="timer">{timer.format()}</p>
    </>
  );
}

export default App;
