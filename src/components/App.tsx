import React from "react";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";

function App() {
  let [enabled, setEnabled] = React.useState(false);
  let timer = useTimer(30 * 60 * 1000, enabled);
  return (
    <>
      <button onClick={() => setEnabled(!enabled)}>Toggle Timer</button>
      <div className={cn("timer-anim", enabled ? "play" : null)} />
      <p className="timer">{timer.format()}</p>
    </>
  );
}

export default App;
