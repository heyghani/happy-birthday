"use client";

import { story } from "@/content/story";
import { useNow } from "@/lib/hooks";
import { jakartaTimelineInstant } from "@/lib/time";
import { Cake, Gift, PixelFrame, Section, Star } from "@/components/pixel";

export function QuestRoadmap() {
  const now = useNow();
  const last = story.timeline.length - 1;

  return (
    <Section id="roadmap" title="QUEST ROADMAP">
      <ol className="relative">
        {story.timeline.map((item, index) => {
          const at = jakartaTimelineInstant(story.eventAt, item.time);
          const passed = now !== null && at !== null && now >= at;
          return (
            <li key={`${item.level}-${item.time}`} className="relative pb-5 last:pb-0">
              {index < last ? (
                <>
                  <span className="absolute top-10 bottom-0 left-[17px] w-[6px] bg-[#141414]" aria-hidden />
                  <span className="absolute top-10 bottom-0 left-[19px] w-[2px] bg-[#f6e7b4]" aria-hidden />
                </>
              ) : null}
              <span
                className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center"
                style={{
                  background: passed ? "#141414" : "#fffdf8",
                  boxShadow: passed
                    ? "inset 0 0 0 3px #f5c518, 0 0 0 3px #141414, 4px 4px 0 0 #0b3e80"
                    : "0 0 0 3px #141414, 4px 4px 0 0 #0b3e80",
                }}
              >
                {passed ? (
                  <Star tone="gold" scale={2} />
                ) : (
                  <span className="block h-3 w-3 bg-[#2a86e8]" style={{ boxShadow: "inset 0 0 0 3px #141414" }} />
                )}
              </span>
              <div className="pl-[60px]">
                <PixelFrame tone="paper" dense>
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#141414] px-2 py-1 font-display text-[8px] leading-loose text-[#f6e7b4]">
                      {item.level}
                    </span>
                    <span className="font-dialog text-[14px] leading-none">{item.time}</span>
                  </div>
                  <p className="mt-2 font-dialog text-[16px] leading-[1.6]">{item.title}</p>
                </PixelFrame>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex items-end justify-center gap-4" aria-hidden>
        <Gift scale={3} />
        <Cake scale={4} />
        <Gift scale={3} />
      </div>
    </Section>
  );
}
