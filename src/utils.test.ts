import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { Stopwatch, Timer, iso8601DurationToMilliseconds } from "./utils";

test.each([
  ["PT0.2S", 200],
  ["PT12.345S", 12345],
  ["PT3M39.87S", 219870],
  ["PT1H49M39.7S", 6579700],
])("iso8601DurationToMilliseconds(%s) === %s", (duration, expected) => {
  expect(iso8601DurationToMilliseconds(duration)).toStrictEqual(expected);
});

function useFakeTimers() {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.clearAllMocks().useRealTimers());
}

describe("Stopwatch", () => {
  useFakeTimers();
  let stopwatch: Stopwatch;
  beforeEach(() => {
    stopwatch = new Stopwatch();
  });

  it("tracks time in milliseconds", () => {
    stopwatch.start();
    vi.advanceTimersByTime(1000);
    expect(stopwatch.current).toStrictEqual(1000);
  });

  it("can be paused", () => {
    stopwatch.start();
    vi.advanceTimersByTime(1000);
    stopwatch.pause();
    vi.advanceTimersByTime(1000);
    stopwatch.pause();
    vi.advanceTimersByTime(1000);
    expect(stopwatch.current).toStrictEqual(1000);
    stopwatch.start();
    expect(stopwatch.current).toStrictEqual(1000);
  });

  it("can be reset", () => {
    stopwatch.start();
    vi.advanceTimersByTime(1000);
    stopwatch.reset();
    expect(stopwatch.current).toStrictEqual(0);
    vi.advanceTimersByTime(2000);
    expect(stopwatch.current).toStrictEqual(2000);
  });

  it("does not track before start is called", () => {
    vi.advanceTimersByTime(1000);
    expect(stopwatch.current).toStrictEqual(0);
  });

  it("does not reset when started multiple times", () => {
    stopwatch.start();
    vi.advanceTimersByTime(1000);
    stopwatch.start();
    expect(stopwatch.current).toStrictEqual(1000);
  });

  it("does not reset when started after paused", () => {
    stopwatch.start();
    vi.advanceTimersByTime(1000);
    stopwatch.pause();
    stopwatch.start();
    vi.advanceTimersByTime(1000);
    expect(stopwatch.current).toStrictEqual(2000);
  });

  it.each([
    ["PT0.2S", "00:00.20"],
    ["PT12.345S", "00:12.34"],
    ["PT3M39.87S", "03:39.87"],
    ["PT1H49M39.7S", "01:49:39.70"],
  ])("formats the time: %s %s", (ms, expected) => {
    stopwatch = new Stopwatch();
    stopwatch.start();
    vi.advanceTimersByTime(iso8601DurationToMilliseconds(ms));
    expect(stopwatch.format()).toStrictEqual(expected);
  });
});

describe("Timer", () => {
  useFakeTimers();
  let timer: Timer;
  beforeEach(() => {
    timer = new Timer(5000);
  });

  it("counts down in milliseconds", () => {
    timer.start();
    vi.advanceTimersByTime(1000);
    expect(timer.current).toStrictEqual(4000);
  });

  it("can be paused", () => {
    timer.start();
    vi.advanceTimersByTime(1000);
    timer.pause();
    vi.advanceTimersByTime(1000);
    timer.pause();
    vi.advanceTimersByTime(1000);
    expect(timer.current).toStrictEqual(4000);
    timer.start();
    expect(timer.current).toStrictEqual(4000);
  });

  it("can be reset", () => {
    timer.start();
    vi.advanceTimersByTime(1000);
    timer.reset();
    expect(timer.current).toStrictEqual(5000);
    vi.advanceTimersByTime(2000);
    expect(timer.current).toStrictEqual(3000);
  });

  it("does not count down before start is called", () => {
    vi.advanceTimersByTime(1000);
    expect(timer.current).toStrictEqual(5000);
  });

  it("does not reset when started multiple times", () => {
    timer.start();
    vi.advanceTimersByTime(2000);
    timer.start();
    vi.advanceTimersByTime(2000);
    expect(timer.current).toStrictEqual(1000);
  });

  it("does not reset when started after paused", () => {
    timer.start();
    vi.advanceTimersByTime(1000);
    timer.pause();
    timer.start();
    vi.advanceTimersByTime(1000);
    expect(timer.current).toStrictEqual(3000);
  });

  it.each([
    ["PT0.3S", "PT0.1S", "00:00.20"],
    ["PT1M", "PT12.345S", "00:47.65"],
    ["PT5M", "PT1M20.123S", "03:39.87"],
    ["PT2H", "PT10M20.3S", "01:49:39.70"],
  ])("formats the time: %s %s %s", (ms, elapsed, expected) => {
    timer = new Timer(iso8601DurationToMilliseconds(ms));
    timer.start();
    vi.advanceTimersByTime(iso8601DurationToMilliseconds(elapsed));
    expect(timer.format()).toStrictEqual(expected);
  });
});
