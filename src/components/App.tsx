import React from "react";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AnimationProps = {
  enabled?: boolean;
};

function Animation(props: AnimationProps) {
  return <div className={cn("timer-anim", props.enabled ? "play" : null)} />;
}

function App() {
  let [enabled, setEnabled] = React.useState(false);
  let timer = useTimer(30 * 60 * 1000, enabled);
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
    </div>
  );
}

export default App;
