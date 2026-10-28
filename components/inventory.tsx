"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { story } from "@/content/story";
import { PixelFrame, Section, Star } from "@/components/pixel";

export function Inventory() {
  const [active, setActive] = useState<number | null>(null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const item = active === null ? null : story.gallery[active];

  useEffect(() => {
    if (active === null) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      buttons.current[active]?.focus();
    };
  }, [active]);

  return (
    <Section id="gallery" title="INVENTORY">
      <ul className="grid grid-cols-2 gap-4">
        {story.gallery.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              ref={(node) => {
                buttons.current[index] = node;
              }}
              onClick={() => setActive(index)}
              className="slot-btn block w-full"
              aria-label={`Open ${photo.label}`}
            >
              <PixelFrame tone="gold" bare>
                <span className="relative block aspect-square bg-[#10182a] p-1">
                  <span className="relative block h-full w-full bg-[#d7ecff]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </span>
                </span>
                <span className="flex items-center justify-center gap-1 bg-[#141414] px-1 py-2 text-center font-dialog text-[12px] leading-none text-[#f6e7b4]">
                  <span className="h-1.5 w-1.5 shrink-0 bg-[#f5c518]" aria-hidden />
                  {photo.label}
                </span>
              </PixelFrame>
            </button>
          </li>
        ))}
      </ul>

      {item ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#071422]/90 p-4"
          onClick={() => setActive(null)}
        >
          <div className="pop-once w-full max-w-[380px]">
            <p className="mb-3 flex items-center justify-center gap-2 text-center font-display text-[10px] leading-[1.7] pixel-outline">
              <Star tone="gold" scale={2} />
              ITEM
              <Star tone="pink" scale={2} />
            </p>
            <PixelFrame tone="gold" bare>
              <button type="button" onClick={() => setActive(null)} className="block w-full">
                <span className="relative block aspect-square bg-[#10182a]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="380px"
                    className="object-contain"
                  />
                </span>
              </button>
              <p className="bg-[#141414] px-3 py-2 text-center font-dialog text-[15px] text-[#f6e7b4]">
                {item.label}
              </p>
              <div className="bg-[#fffdf8] p-3">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="px-btn w-full px-4 py-3 text-[11px]"
                >
                  CLOSE
                </button>
              </div>
            </PixelFrame>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
