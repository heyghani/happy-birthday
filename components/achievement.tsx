"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { story } from "@/content/story";
import { useGate } from "@/components/gate";
import { playAchievement } from "@/lib/sfx";
import { useReducedMotion } from "@/lib/hooks";
import { Badge, Garland, PixelFrame, Section, Star } from "@/components/pixel";

const BURST = [
  { x: "6%", y: "12%", dx: "-26px", dy: "-34px", c: "#f5c518", w: "6px", h: "6px", delay: "0s" },
  { x: "88%", y: "10%", dx: "30px", dy: "-28px", c: "#ff8fbf", w: "6px", h: "4px", delay: "0.05s" },
  { x: "18%", y: "0%", dx: "-10px", dy: "-36px", c: "#fffdf8", w: "4px", h: "8px", delay: "0.08s" },
  { x: "72%", y: "4%", dx: "18px", dy: "-32px", c: "#e23b4a", w: "4px", h: "4px", delay: "0.02s" },
  { x: "0%", y: "42%", dx: "-32px", dy: "8px", c: "#f6e7b4", w: "6px", h: "4px", delay: "0.1s" },
  { x: "94%", y: "48%", dx: "28px", dy: "12px", c: "#7ad4f6", w: "4px", h: "6px", delay: "0.06s" },
  { x: "22%", y: "92%", dx: "-16px", dy: "26px", c: "#f5c518", w: "4px", h: "4px", delay: "0.12s" },
  { x: "70%", y: "88%", dx: "20px", dy: "24px", c: "#ff8fbf", w: "6px", h: "4px", delay: "0.04s" },
];

export function Achievement() {
  const { started } = useGate();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const sounded = useRef(false);

  useEffect(() => {
    const node = document.getElementById("quote");
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: [0.45, 0.7] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open || !started || sounded.current) return;
    if (reduced !== false) return;
    sounded.current = true;
    playAchievement();
  }, [open, started, reduced]);

  const motion = reduced === false;

  return (
    <Section id="quote" className="min-h-[280px]">
      <div data-unlocked={open ? "yes" : "no"} aria-hidden={open ? undefined : true}>
        {open ? (
          <div className={motion ? "pop-once" : undefined}>
            <Garland />
            <div className="relative mt-4">
              {motion
                ? BURST.map((bit) => (
                    <span
                      key={`${bit.x}-${bit.y}`}
                      className="burst-bit"
                      style={
                        {
                          "--x": bit.x,
                          "--y": bit.y,
                          "--dx": bit.dx,
                          "--dy": bit.dy,
                          "--c": bit.c,
                          "--w": bit.w,
                          "--h": bit.h,
                          "--delay": bit.delay,
                        } as CSSProperties
                      }
                      aria-hidden
                    />
                  ))
                : null}
              <PixelFrame tone="gold" clip>
                {motion ? <span className="shine-strip" aria-hidden /> : null}
                {motion ? (
                  <>
                    <span className="spark top-2 left-3" aria-hidden>
                      <Star tone="gold" scale={2} />
                    </span>
                    <span className="spark top-3 right-4" style={{ animationDelay: "0.12s" }} aria-hidden>
                      <Star tone="pink" scale={2} />
                    </span>
                    <span className="spark bottom-8 left-4" style={{ animationDelay: "0.2s" }} aria-hidden>
                      <Star tone="gold" scale={2} />
                    </span>
                  </>
                ) : null}
                <div className="flex flex-col items-center px-1 py-2 text-center">
                  <Badge scale={5} />
                  <p className="px-ribbon mt-3 font-display text-[9px] leading-[1.65]">
                    ACHIEVEMENT UNLOCKED!
                  </p>
                  <div
                    className="mt-4 w-full bg-[#fffdf8] px-3 py-3 text-[#141414]"
                    style={{ boxShadow: "0 0 0 3px #141414" }}
                  >
                    <p className="font-dialog text-[16px] leading-[1.85]">{story.quote}</p>
                    <p className="mt-3 flex flex-wrap items-center justify-center gap-2 font-dialog text-[14px] leading-[1.6]">
                      <Star tone="gold" scale={2} />
                      {story.quoteBy}
                      <Star tone="gold" scale={2} />
                    </p>
                  </div>
                </div>
              </PixelFrame>
            </div>
          </div>
        ) : (
          <div className="h-[220px]" />
        )}
      </div>
    </Section>
  );
}
