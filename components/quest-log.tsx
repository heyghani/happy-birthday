"use client";

import { useEffect, useRef, useState } from "react";
import { story } from "@/content/story";
import { useGate } from "@/components/gate";
import { DialogBox, PixelArrow, Section } from "@/components/pixel";

export function QuestLog() {
  const { started } = useGate();
  const messages = story.messages;
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [armed, setArmed] = useState(false);
  const reducedRef = useRef(false);
  const message = messages[index] ?? "";
  const complete = count >= message.length && message.length > 0;
  const hasNext = index < messages.length - 1;

  useEffect(() => {
    if (!started) return;
    const node = document.getElementById("messages");
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setArmed(true);
        if (reduced) setCount(messages[0]?.length ?? 0);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [started, messages]);

  useEffect(() => {
    if (!armed || reducedRef.current) return;
    if (count >= message.length) return;
    const id = window.setTimeout(() => setCount((current) => current + 1), 64);
    return () => window.clearTimeout(id);
  }, [armed, count, message]);

  const advance = () => {
    if (!complete) {
      setCount(message.length);
      return;
    }
    if (!hasNext) return;
    const next = index + 1;
    setIndex(next);
    setCount(reducedRef.current ? messages[next].length : 0);
  };

  const restart = () => {
    setIndex(0);
    setCount(reducedRef.current ? messages[0].length : 0);
  };

  const shown = message.slice(0, count);

  return (
    <Section id="messages" title="QUEST LOG">
      <button
        type="button"
        onClick={advance}
        className="block w-full text-left"
        aria-label={`Message ${index + 1} of ${messages.length}. ${message}`}
      >
        <DialogBox
          label="MESSAGE"
          meta={
            <span className="font-dialog text-[13px] leading-none text-[#f6e7b4]">
              {String(index + 1).padStart(2, "0")}/{String(messages.length).padStart(2, "0")}
            </span>
          }
        >
          <span aria-hidden="true">{shown}</span>
          {!complete ? (
            <span className="blink-step ml-1 inline-block h-4 w-2 translate-y-[2px] bg-[#141414]" aria-hidden />
          ) : null}
          <span className="mt-4 flex items-end justify-between gap-3">
            <span className="flex flex-wrap gap-1" aria-hidden>
              {messages.map((_, pip) => (
                <span
                  key={pip}
                  className="h-2 w-2"
                  style={{
                    background: pip === index ? "#141414" : pip < index ? "#f5c518" : "#efe2bf",
                    boxShadow: "0 0 0 1px #141414",
                  }}
                />
              ))}
            </span>
            {complete && hasNext ? (
              <span className="px-chip">
                <span className="font-display text-[8px] leading-loose">NEXT</span>
                <span className="blink-step">
                  <PixelArrow scale={2} />
                </span>
              </span>
            ) : null}
            {complete && !hasNext ? (
              <span className="bg-[#141414] px-2 py-1 font-display text-[8px] leading-loose text-[#f6e7b4]">
                END
              </span>
            ) : null}
          </span>
        </DialogBox>
      </button>

      {index > 0 ? (
        <button type="button" onClick={restart} className="px-btn mt-5 px-4 py-3 text-[10px]">
          FROM START
        </button>
      ) : null}

      <noscript>
        <div className="mt-4 space-y-3 font-dialog text-[16px] leading-[1.85] text-[#fffdf8]">
          {messages.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </noscript>
    </Section>
  );
}
