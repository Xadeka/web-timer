import React from "react";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { CreateTimerForm } from "@/components/CreateTimerForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type AnimationProps = {
  enabled?: boolean;
};

function Animation(props: AnimationProps) {
  return <div className={cn("timer-anim", props.enabled ? "play" : null)} />;
}

type RoundTimerProps = {
  ms: number;
};

function RoundTimer(props: RoundTimerProps) {
  let [enabled, setEnabled] = React.useState(false);
  let timer = useTimer(props.ms, enabled);
  return (
    <div className="flex flex-col gap-2 bg-green-600 p-2">
      <div role="group" className="self-center">
        <Button onClick={() => setEnabled(true)} disabled={enabled}>
          <PlayIcon />
          Start
        </Button>
        <Button onClick={() => setEnabled(false)} disabled={!enabled}>
          <PauseIcon />
          Pause
        </Button>
        <Button
          onClick={() => timer.reset()}
          disabled={timer.current == props.ms}
        >
          <RotateCcwIcon />
          Reset
        </Button>
      </div>
      <div className="flex flex-wrap-reverse place-items-center justify-center gap-x-20">
        <Animation enabled={enabled && timer.current > 0} />
        <p className="font-mono text-8xl font-extrabold">{timer.format()}</p>
      </div>
      <Progress min={props.ms} max={0} value={timer.current} />
    </div>
  );
}

function App() {
  let [ms, setMs] = React.useState(0);
  if (ms <= 0) {
    return (
      <div className="p-10">
        <CreateTimerForm
          className="mx-auto max-w-xl"
          onSubmit={(data) => {
            setMs(data.minutes * 60 * 1000 + data.seconds * 1000);
          }}
        />
      </div>
    );
  }
  return <RoundTimer ms={ms} />;
}

export default App;
