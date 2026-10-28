"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { playStart, unlockAudio } from "@/lib/sfx";
import { startTune } from "@/lib/tune";

type GateValue = {
  started: boolean;
  start: () => void;
};

function unlockScroll() {
  const root = document.documentElement;
  root.classList.remove("scroll-lock");
  root.style.overflow = "visible";
  root.style.height = "auto";
  document.body.style.overflow = "visible";
  document.body.style.height = "auto";
}

const GateContext = createContext<GateValue | null>(null);

export function useGate() {
  const value = useContext(GateContext);
  if (!value) throw new Error("useGate must be used inside Gate");
  return value;
}

export function Gate({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      unlockScroll();
      return;
    }

    document.documentElement.classList.add("scroll-lock");

    const blockWheel = (event: WheelEvent) => event.preventDefault();
    const blockTouch = (event: TouchEvent) => event.preventDefault();
    const blockKeys = (event: KeyboardEvent) => {
      const scrolling = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
      if (scrolling.includes(event.key)) event.preventDefault();
      if (event.key === " " && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", blockWheel, { passive: false });
    window.addEventListener("touchmove", blockTouch, { passive: false });
    window.addEventListener("keydown", blockKeys);

    return () => {
      window.removeEventListener("wheel", blockWheel);
      window.removeEventListener("touchmove", blockTouch);
      window.removeEventListener("keydown", blockKeys);
    };
  }, [started]);

  const start = () => {
    if (started) {
      document.getElementById("messages")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      return;
    }

    unlockAudio();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) playStart();
    startTune();
    unlockScroll();
    setStarted(true);

    window.requestAnimationFrame(() => {
      document.getElementById("messages")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
      });
    });
  };

  return (
    <GateContext.Provider value={{ started, start }}>
      <div data-gate={started ? "open" : "locked"}>{children}</div>
    </GateContext.Provider>
  );
}

export function Locked({ children }: { children: ReactNode }) {
  const { started } = useGate();
  return <div inert={started ? undefined : true}>{children}</div>;
}
