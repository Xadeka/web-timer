import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Temporal } from "@js-temporal/polyfill";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Duration = Partial<Record<Intl.DurationFormatUnit, number>>;

export class Stopwatch {
  private running: boolean = false;
  private elapsed: number = 0;
  private intervalStart: number = Date.now();
  private intervalEnd: number = Date.now();

  start(): void {
    if (!this.running) {
      this.intervalStart = Date.now();
    }
    this.running = true;
  }

  pause(): void {
    this.next();
    this.running = false;
  }

  reset(): void {
    this.intervalStart = Date.now();
    this.intervalEnd = Date.now();
    this.elapsed = 0;
  }

  get current(): number {
    this.next();
    return this.elapsed;
  }

  private next(): void {
    if (this.running) {
      this.intervalEnd = Date.now();
      this.elapsed += this.intervalEnd - this.intervalStart;
      this.intervalStart = Date.now();
    }
  }

  format(): string {
    let date = new Date(this.current);
    let options: Intl.DurationFormatOptions = {
      style: "digital",
      fractionalDigits: 2,
      hours: "2-digit",
      hoursDisplay: "auto",
    };
    const duration: Duration = {
      hours: date.getUTCHours() ?? 0,
      minutes: date.getUTCMinutes() ?? 0,
      seconds: date.getUTCSeconds() ?? 0,
      milliseconds: date.getUTCMilliseconds() ?? 0,
    };
    return new Intl.DurationFormat("en", options).format(duration);
  }
}

export class Timer extends Stopwatch {
  private total: number = 0;

  constructor(ms: number) {
    super();
    this.total = ms;
  }

  get current(): number {
    if (super.current >= this.total) {
      super.pause();
      return 0;
    }
    return this.total - super.current;
  }
}

export function iso8601DurationToMilliseconds(duration: string) {
  return Temporal.Duration.from(duration).total({ unit: "millisecond" });
}
