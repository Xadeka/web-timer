import React from "react";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "./ui/progress";
import { PlayIcon, PauseIcon, RotateCcwIcon } from "lucide-react";

type AnimationProps = {
  enabled?: boolean;
};

function Animation(props: AnimationProps) {
  return <div className={cn("timer-anim", props.enabled ? "play" : null)} />;
}

function App() {
  let [enabled, setEnabled] = React.useState(false);
  let total = 30 * 60 * 1000;
  let timer = useTimer(total, enabled);
  return (
    <div className="flex flex-col justify-evenly gap-2 p-2">
      <div role="group" className="self-center">
        <Button onClick={() => setEnabled(true)} disabled={enabled}>
          <PlayIcon />
          Start
        </Button>
        <Button onClick={() => setEnabled(false)} disabled={!enabled}>
          <PauseIcon />
          Pause
        </Button>
        <Button onClick={() => timer.reset()} disabled={timer.current == total}>
          <RotateCcwIcon />
          Reset
        </Button>
      </div>
      <div className="flex flex-wrap-reverse place-items-center justify-center gap-x-20">
        <Animation enabled={enabled && timer.current > 0} />
        <p className="font-mono text-8xl font-extrabold">{timer.format()}</p>
      </div>
      <Progress min={total} max={0} value={timer.current} />
    </div>
  );
}

export default App;
