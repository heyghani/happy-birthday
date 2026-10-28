"use client";

import { useState } from "react";
import { story } from "@/content/story";
import { FlagWave, PixelFrame, Section, Sprite } from "@/components/pixel";

const MAP = [
  "wwwwwwwwwwwwwwwwwwww",
  "wGGGGGGGGGGGGGGGGGGw",
  "wGGTGGGGgGGGgGGTGGGw",
  "wGGGGGGGGhhhhGGGGGGw",
  "wGgGGGGGhHHHHhGGGGgw",
  "wGGGGGGGhHddHhGGTGGw",
  "wGGTGGGGhhhhhhGGGGGw",
  "wGGGGGgGGppGGGGgGGGw",
  "wGGGGGGGGppGGGGGTGGw",
  "wGgGGGGGGppGGGGgGGGw",
  "wGGGGTGGGGppGGGGGGGw",
  "wGGGGGGGGppGGgGGGGGw",
  "wGGTGGGGppGGGGGGgGGw",
  "wGGGGGGGGppGGGGGGTGw",
  "wGgGGGGGGGGGGGGGgGGw",
  "wwwwwwwwwwwwwwwwwwww",
];

const MAP_PALETTE: Record<string, string> = {
  w: "#1568b8",
  G: "#3cba4e",
  g: "#217a34",
  T: "#145c28",
  h: "#e23b4a",
  H: "#f6e7b4",
  d: "#6b3a22",
  p: "#f0d39a",
};

export function DungeonMap() {
  const [open, setOpen] = useState(false);
  const query = encodeURIComponent(story.mapsQuery);
  const embedSrc = `https://www.google.com/maps?q=${query}&hl=en&z=16&output=embed`;
  const openSrc = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <Section id="dungeon" title="DUNGEON LOCATION">
      <button
        type="button"
        className="block w-full"
        aria-expanded={open}
        aria-controls="dungeon-embed"
        onClick={() => setOpen(true)}
      >
        <PixelFrame tone="paper" dense>
          <span className="relative mx-auto block w-fit">
            <Sprite rows={MAP} scale={14} palette={MAP_PALETTE} />
            <span className="absolute top-[8%] left-[46%]">
              <FlagWave scale={4} />
            </span>
          </span>
          <span className="mt-3 flex justify-center">
            <span className="bg-[#141414] px-2 py-1 font-display text-[8px] leading-loose text-[#f6e7b4]">
              {open ? "AREA MAP" : "OPEN MAP"}
            </span>
          </span>
        </PixelFrame>
      </button>

      <PixelFrame tone="paper" className="mt-5">
        <div className="flex items-center gap-3">
          <FlagWave scale={3} />
          <p className="min-w-0 flex-1 text-center font-dialog text-[16px] leading-[1.7]">
            New Area Unlocked:
            <span className="mt-1 block font-display text-[11px] leading-[1.7] break-words">
              {story.venueName}
            </span>
          </p>
        </div>
      </PixelFrame>

      {open ? (
        <div id="dungeon-embed" className="mt-5">
          <PixelFrame tone="paper" dense>
            <iframe
              title={`Map of ${story.venueName}`}
              src={embedSrc}
              className="h-[240px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </PixelFrame>
        </div>
      ) : null}

      <a href={openSrc} target="_blank" rel="noreferrer" className="px-btn mt-5 w-full px-3 py-3 text-[10px]">
        OPEN IN GOOGLE MAPS
      </a>
    </Section>
  );
}
