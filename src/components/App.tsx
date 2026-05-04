import React from "react";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
} from "lucide-react";
import { CreateTimerForm } from "@/components/CreateTimerForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { ButtonGroup } from "@/components/ui/button-group";

type AnimationProps = {
  enabled?: boolean;
};

function Animation(props: AnimationProps) {
  return <div className={cn("timer-anim", props.enabled ? "play" : null)} />;
}

type RoundTimerProps = {
  ms: number;
  onBackClick: React.MouseEventHandler;
};

function RoundTimer(props: RoundTimerProps) {
  let [enabled, setEnabled] = React.useState(false);
  let timer = useTimer(props.ms, enabled);
  return (
    <div className="flex flex-col gap-2 bg-green-600 p-2">
      <div className="grid grid-cols-3">
        <Button className="me-auto" onClick={props.onBackClick}>
          <ArrowLeftIcon />
          Back
        </Button>
        <ButtonGroup className="mx-auto">
          <Button onClick={() => setEnabled(true)} disabled={enabled}>
            <PlayIcon />
            Start
          </Button>
          <Button onClick={() => setEnabled(false)} disabled={!enabled}>
            <PauseIcon />
            Pause
          </Button>
        </ButtonGroup>
        <Button
          className="ms-auto"
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

type PresetTimerItemProps = {
  minutes: number;
  onClick: React.MouseEventHandler;
};

function PresetTimerItem(props: PresetTimerItemProps) {
  return (
    <Item
      variant="outline"
      className="hover:bg-accent"
      onClick={props.onClick}
      render={<button />}
    >
      <ItemContent>
        <ItemTitle>{props.minutes} minutes</ItemTitle>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className="size-4" />
      </ItemActions>
    </Item>
  );
}

function App() {
  let [ms, setMs] = React.useState(0);
  let setTime = (minutes: number, seconds: number) => {
    setMs(minutes * 60 * 1000 + seconds * 1000);
  };
  if (ms <= 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-2 p-10">
        <span>Select a preset</span>
        <div className="flex flex-col gap-2">
          <PresetTimerItem minutes={30} onClick={() => setTime(30, 0)} />
          <PresetTimerItem minutes={50} onClick={() => setTime(50, 0)} />
        </div>
        <span className="mx-auto my-2">or</span>
        <CreateTimerForm
          onSubmit={(data) => {
            setTime(data.minutes, data.seconds);
          }}
        />
      </div>
    );
  }
  return (
    <RoundTimer
      ms={ms}
      onBackClick={() => {
        setMs(0);
      }}
    />
  );
}

export default App;
