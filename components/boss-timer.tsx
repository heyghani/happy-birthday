"use client";

import { story } from "@/content/story";
import { useNow } from "@/lib/hooks";
import { parseInstant, progressBetween, remainingParts } from "@/lib/time";
import { PixelFrame, Section, Star } from "@/components/pixel";

const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
};

function Digit({ char, ghost = false }: { char: string; ghost?: boolean }) {
  const on = ghost ? "" : (SEGMENTS[char] ?? "");
  return (
    <span className="led-digit" aria-hidden>
      {["a", "b", "c", "d", "e", "f", "g"].map((segment) => (
        <i key={segment} className={`seg-${segment}${on.includes(segment) ? " on" : ""}`} />
      ))}
    </span>
  );
}

function Group({ value, ghost }: { value: string; ghost?: boolean }) {
  return (
    <span className="inline-flex gap-1">
      {value.split("").map((char, index) => (
        <Digit key={`${char}-${index}`} char={char} ghost={ghost} />
      ))}
    </span>
  );
}

function ClockUnit({ label, value, ghost }: { label: string; value: string; ghost?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-2">
      <Group value={value} ghost={ghost} />
      <span className="font-display text-[7px] leading-loose text-[#f6e7b4]">{label}</span>
    </span>
  );
}

function Colon() {
  return (
    <span className="led-colon" aria-hidden>
      <i />
      <i />
    </span>
  );
}

const BARS = 16;

export function BossTimer() {
  const now = useNow();
  const eventAt = now === null ? null : parseInstant(story.eventAt);
  const done = now !== null && eventAt !== null && now >= eventAt;
  const parts =
    now === null || eventAt === null
      ? null
      : remainingParts(done ? 0 : eventAt - now);
  const progress = now === null ? 0 : done ? 1 : progressBetween(story.countdownFrom, story.eventAt, now);
  const filled = Math.round(progress * BARS);
  const ghost = parts === null;

  const days = ghost ? "88" : String(parts.days).padStart(2, "0");
  const hours = ghost ? "88" : String(parts.hours).padStart(2, "0");
  const minutes = ghost ? "88" : String(parts.minutes).padStart(2, "0");
  const seconds = ghost ? "88" : String(parts.seconds).padStart(2, "0");

  const spoken = ghost
    ? "Counting"
    : done
      ? "Boss battle started"
      : `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds`;

  return (
    <Section id="boss" title="TIME LEFT UNTIL BOSS BATTLE">
      <div className="relative">
        <PixelFrame tone="ink" dense>
          <p className="sr-only" aria-live="polite">
            {spoken}
          </p>
          <div className="bg-[#070d16] px-1 py-3" style={{ boxShadow: "inset 0 0 0 3px #141414" }}>
            <div className="flex items-start justify-center gap-1">
              <ClockUnit label="DAYS" value={days} ghost={ghost} />
              <Colon />
              <ClockUnit label="HRS" value={hours} ghost={ghost} />
              <Colon />
              <ClockUnit label="MIN" value={minutes} ghost={ghost} />
              <Colon />
              <ClockUnit label="SEC" value={seconds} ghost={ghost} />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between font-display text-[8px] leading-loose text-[#f6e7b4]">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 bg-[#f5c518]" style={{ boxShadow: "0 0 0 2px #141414" }} />
                EXP
              </span>
              <span>{ghost ? "--" : `${Math.round(progress * 100)}%`}</span>
            </div>
            <div
              className="flex gap-[3px] bg-[#070d16] p-1"
              style={{ boxShadow: "0 0 0 3px #141414" }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-label="Experience"
            >
              {Array.from({ length: BARS }, (_, index) => (
                <span
                  key={index}
                  className="h-5 flex-1"
                  style={{
                    background: index < filled ? "#f5c518" : "#1e3354",
                    boxShadow:
                      index < filled
                        ? "inset 0 3px 0 #fff3b0, inset 0 -3px 0 #b47b12"
                        : "inset 0 3px 0 #2a4060",
                  }}
                />
              ))}
            </div>
          </div>

          {done ? (
            <p className="mt-4 flex items-center justify-center gap-2 text-center font-dialog text-[15px] leading-relaxed text-[#fff4c8]">
              <Star tone="gold" scale={2} />
              Boss battle started
              <Star tone="gold" scale={2} />
            </p>
          ) : null}
        </PixelFrame>
      </div>
    </Section>
  );
}
