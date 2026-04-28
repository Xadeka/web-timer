import React from "react";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "./ui/progress";

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
      <Button
        variant="default"
        className="self-center"
        onClick={() => setEnabled(!enabled)}
      >
        Toggle Timer
      </Button>
      <div className="flex flex-wrap-reverse place-items-center justify-center gap-x-20">
        <Animation enabled={enabled} />
        <p className="font-mono text-8xl font-extrabold">{timer.format()}</p>
      </div>
      <Progress min={0} max={total} value={total - timer.current} />
    </div>
  );
}

export default App;
