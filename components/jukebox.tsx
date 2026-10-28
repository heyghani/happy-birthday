"use client";

import { useEffect, useState } from "react";
import { MusicNote, PixelFrame, Section, Sprite } from "@/components/pixel";
import { onTune, toggleTune } from "@/lib/tune";

const SPEAKER = [
  "KKKKKKKKKKKK",
  "KDDDDDDDDDDK",
  "KDGGGGGGGGDK",
  "KDGLLLLLLGDK",
  "KDGLDDDDLGDK",
  "KDGLDWWDLGDK",
  "KDGLDWWDLGDK",
  "KDGLDDDDLGDK",
  "KDGLLLLLLGDK",
  "KDGGGGGGGGDK",
  "KDDDDDDDDDDK",
  "KKKKKKKKKKKK",
];

const SPEAKER_PALETTE: Record<string, string> = {
  K: "#141414",
  D: "#1a120c",
  G: "#c9842a",
  L: "#f3c84a",
  W: "#0c0a08",
};

const REEL_FRAMES = [
  [".KKKKKK.", "KKWYYYKK", "KWYKKYYK", "KWYKKKYK", "KWYKKKYK", "KWYKKYYK", "KKWYYYKK", ".KKKKKK."],
  [".KKKKKK.", "KKWWWKKK", "KWYYKYYK", "KYKKKKYK", "KYKKKKYK", "KYKKKKYK", "KKYYYYKK", ".KKKKKK."],
  [".KKKKKK.", "KKYYYWWK", "KYYKKWYK", "KYKKKWYK", "KYKKKWYK", "KYYKKWYK", "KKYYYWWK", ".KKKKKK."],
  [".KKKKKK.", "KKYYYYKK", "KYKKKKYK", "KYKKKKYK", "KYKKKKYK", "KWYYKYYK", "KKWWWKKK", ".KKKKKK."],
];

const REEL_PALETTE: Record<string, string> = {
  K: "#141414",
  W: "#fff3b0",
  Y: "#c9842a",
};

function Screw({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-2 w-2 bg-[#e0b15a] ${className}`}
      style={{ boxShadow: "inset 1px 1px 0 #fff3b0, inset -1px -1px 0 #8a5a18, 0 0 0 1px #141414" }}
      aria-hidden
    />
  );
}

function Speaker() {
  return <Sprite rows={SPEAKER} scale={3} palette={SPEAKER_PALETTE} />;
}

function Reel({ late = false }: { late?: boolean }) {
  const size = 24;
  return (
    <span className={`reel ${late ? "reel-late" : ""}`} style={{ width: size, height: size }} aria-hidden>
      {REEL_FRAMES.map((rows) => (
        <Sprite key={rows[1]} rows={rows} scale={3} palette={REEL_PALETTE} />
      ))}
    </span>
  );
}

export function Jukebox() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => onTune(setPlaying), []);

  return (
    <Section id="now-playing" title="NOW PLAYING">
      <PixelFrame tone="ink" bare>
        <div className="relative px-3 pt-5 pb-4">
          <Screw className="top-2 left-2" />
          <Screw className="top-2 right-2" />
          <Screw className="bottom-2 left-2" />
          <Screw className="bottom-2 right-2" />

          <div className={playing ? "is-playing" : undefined}>
            <div
              className="flex items-center gap-2 bg-[#1a120c] p-2"
              style={{ boxShadow: "inset 0 0 0 3px #c9842a, inset 0 0 0 6px #141414" }}
            >
              <Speaker />
              <div
                className="min-w-0 flex-1 bg-[#0c0a08] px-2 py-2"
                style={{ boxShadow: "inset 0 0 0 3px #f6e7b4" }}
              >
                <div className="flex items-center justify-between gap-1">
                  <Reel />
                  <div className="flex h-7 flex-1 items-end justify-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className="eq-bar" style={{ animationDelay: `${index * 0.08}s` }} />
                    ))}
                  </div>
                  <Reel late />
                </div>
                <p className="mt-2 truncate text-center font-display text-[8px] leading-loose text-[#f6e7b4]">
                  YOUR MIX
                </p>
              </div>
              <Speaker />
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <span className={playing ? "twinkle" : undefined}>
                <MusicNote scale={2} />
              </span>
              <div className="flex gap-[6px]">
                {["#f5c518", "#ff8fbf", "#fffdf8", "#e23b4a", "#f5c518", "#7ad4f6", "#ff8fbf", "#f6e7b4"].map(
                  (color, index) => (
                    <span
                      key={`${color}-${index}`}
                      className="lamp"
                      style={{ background: color, animationDelay: `${index * 0.09}s` }}
                    />
                  ),
                )}
              </div>
              <span className={playing ? "twinkle" : undefined} style={{ animationDelay: "0.4s" }}>
                <MusicNote scale={2} />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTune}
            className={`px-btn mt-4 w-full px-4 py-3 text-[12px] ${playing ? "px-btn-hot" : ""}`}
          >
            {playing ? "PAUSE" : "PLAY"}
          </button>
          <p className="mt-3 text-center font-display text-[8px] leading-loose text-[#fff4c8]">
            {playing ? "ON AIR" : "READY"}
          </p>

          <div className="mt-4" style={{ boxShadow: "0 0 0 3px #141414" }}>
            <div className="bg-[#f6e7b4] py-1 text-center font-display text-[8px] leading-loose text-[#141414]">
              SOUNDTRACK
            </div>
            <div className="bg-[#0b1020] px-3 py-3 text-center">
              <p className="font-dialog text-[14px] leading-relaxed text-[#fff4c8]">
                Starts with the cover tap, then loops until you pause it.
              </p>
            </div>
          </div>
        </div>
      </PixelFrame>
    </Section>
  );
}
