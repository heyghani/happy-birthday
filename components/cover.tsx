"use client";

import { useEffect } from "react";
import Image from "next/image";
import { story } from "@/content/story";
import { useGate } from "@/components/gate";
import {
  Balloon,
  Bird,
  BlueSlime,
  Cactus,
  Cake,
  Coin,
  Confetti,
  Float,
  Garland,
  Gift,
  Heart,
  PinkSlime,
  PixelArrow,
  PixelFrame,
  Sparkle,
  Star,
} from "@/components/pixel";

export function Cover() {
  const { start } = useGate();

  useEffect(() => {
    const node = document.getElementById("cover");
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.55)));
        node.style.setProperty("--leave", progress.toFixed(3));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="cover" className="relative flex h-dvh flex-col overflow-hidden px-4">
      <Confetti />
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
        <Float wide className="top-[5%] left-[2%]" delay="0.2s" duration="4s">
          <Balloon tone="pink" scale={3} />
        </Float>
        <Float wide className="top-[4%] right-[2%]" delay="0.7s" duration="4.4s">
          <Balloon tone="gold" scale={3} />
        </Float>
        <Float className="top-[18%] left-[1%]" delay="0.3s" duration="3.2s">
          <PinkSlime scale={3} />
        </Float>
        <Float className="top-[16%] right-[2%]" delay="0.5s" duration="3.4s">
          <Heart scale={3} />
        </Float>
        <Float className="top-[28%] left-[4%]" delay="0.9s" duration="2.9s">
          <Star tone="pink" scale={2} />
        </Float>
        <Float className="top-[26%] right-[5%]" delay="0.15s" duration="3.1s">
          <Star tone="gold" scale={2} />
        </Float>
        <Float className="top-[46%] left-0" delay="0.4s" duration="3s">
          <BlueSlime scale={3} />
        </Float>
        <Float className="top-[44%] right-0" delay="0.85s" duration="2.8s">
          <Bird scale={3} />
        </Float>
        <Float className="top-[58%] left-[6%]" delay="0.25s" duration="3.3s">
          <Coin scale={2} />
        </Float>
        <Float className="top-[56%] right-[8%]" delay="1s" duration="2.7s">
          <Heart scale={2} />
        </Float>
      </div>

      <div className="relative z-20 pt-3">
        <Garland count={16} />
      </div>

      <div className="relative z-20 flex min-h-0 flex-1 flex-col items-center justify-center pb-5">
        <div className="flex w-full max-w-[360px] flex-col items-center">
          <div className="relative">
            <span className="pointer-events-none absolute -top-6 left-1/2 ml-[-16px]">
              <Coin scale={2} />
            </span>
            <p className="px-ribbon font-display text-[9px] leading-[1.6]">Happy Level Up!</p>
          </div>

          <div className="relative mt-4 w-full">
            <span className="pointer-events-none absolute top-0 -left-1">
              <Sparkle delay="0s" />
            </span>
            <span className="pointer-events-none absolute top-1 -right-1">
              <Sparkle delay="0.55s" />
            </span>
            <h1 className="px-2 text-center font-display text-[32px] leading-[1.55] break-words uppercase boss-title">
              {story.birthdayName}
            </h1>
          </div>

          <div className="mt-3 flex max-w-full items-center justify-center gap-2">
            <span className="h-[3px] w-5 shrink-0 bg-[#f6e7b4]" style={{ boxShadow: "0 3px 0 #141414" }} />
            <p className="min-w-0 text-center font-display text-[9px] leading-[1.7] break-words uppercase pixel-outline-sm">
              FROM {story.hostName}
            </p>
            <span className="h-[3px] w-5 shrink-0 bg-[#f6e7b4]" style={{ boxShadow: "0 3px 0 #141414" }} />
          </div>

          <div className="relative mt-5 w-[min(236px,70%)]">
            <div className="pointer-events-none absolute -bottom-1 -left-9 z-20">
              <Cactus side="left" scale={3} />
            </div>
            <div className="pointer-events-none absolute -right-9 -bottom-1 z-20">
              <Cactus side="right" scale={3} />
            </div>
            <div className="pointer-events-none absolute bottom-12 -left-2 z-20">
              <Gift scale={2} />
            </div>
            <div className="pointer-events-none absolute -right-1 bottom-14 z-20">
              <Cake scale={2} />
            </div>
            <div className="pointer-events-none absolute -top-3 -left-3 z-20">
              <Coin scale={2} />
            </div>
            <div className="pointer-events-none absolute -top-2 -right-3 z-20">
              <Coin scale={2} />
            </div>
            <PixelFrame tone="gold" bare className="relative z-10">
              <div className="relative aspect-[3/4] w-full bg-[#1f74d6]">
                <Image
                  src={story.portraitSrc}
                  alt={`${story.birthdayName} portrait`}
                  fill
                  priority
                  sizes="240px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-[#141414] py-2">
                  <Star tone="gold" scale={2} />
                  <span className="font-display text-[8px] leading-loose text-[#f6e7b4]">BIRTHDAY</span>
                  <Star tone="gold" scale={2} />
                </div>
              </div>
            </PixelFrame>
            <div className="mx-auto mt-1 h-[5px] w-[76%] bg-[#0c4e96]" aria-hidden />
            <div className="mx-auto h-[4px] w-[54%] bg-[#08396f]" aria-hidden />
          </div>

          <button type="button" onClick={start} className="px-btn mt-6 w-full">
            <Star tone="gold" scale={2} />
            <span className="blink-step inline-flex items-center gap-2">
              TAP TO START
              <PixelArrow scale={2} />
            </span>
            <Star tone="pink" scale={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
