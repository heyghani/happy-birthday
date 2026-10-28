"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const PALETTE: Record<string, string> = {
  K: "#141414",
  W: "#fffdf8",
  Y: "#f5c518",
  L: "#fff3b0",
  D: "#d79a12",
  R: "#e23b4a",
  r: "#ffb0b8",
  P: "#ffb7d6",
  Q: "#f472b0",
  B: "#7ad4f6",
  b: "#2f8fc4",
  N: "#16324a",
  G: "#3cba4e",
  g: "#1f7a32",
  T: "#e08a45",
  t: "#a85324",
  U: "#f3d2b0",
  H: "#3a2a28",
  S: "#ffe14a",
  M: "#ff7eb3",
  F: "#fff6ea",
  C: "#c9842a",
};

export function Sprite({
  rows,
  scale = 3,
  palette = PALETTE,
  title,
}: {
  rows: readonly string[];
  scale?: number;
  palette?: Record<string, string>;
  title?: string;
}) {
  const height = rows.length;
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const rects: ReactNode[] = [];

  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const fill = palette[row[x]];
      if (!fill) continue;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />);
    }
  });

  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className="pixel-sprite"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {rects}
    </svg>
  );
}

const COIN_WIDE = [
  "................",
  ".....KKKKKK.....",
  "...KKYYYYYYKK...",
  "..KYLLYYYYYYYK..",
  ".KYLLYYYYYYYYYK.",
  ".KYYYYYYYYYYYYK.",
  ".KYYYYYYYYYYYYK.",
  ".KYYYYYYYYYYYYK.",
  ".KYYYYYYYYYYYYK.",
  ".KYYYYYYYYYYDDK.",
  "..KYYYYYYYYDDK..",
  "..KYYYYYYYDDK...",
  "...KKYYYYKK.....",
  ".....KKKKK......",
  "................",
  "................",
];

const COIN_MID = [
  "................",
  "......KKKK......",
  "....KKYYYYKK....",
  "...KYLLYYYYK....",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYDDK...",
  "....KYYYYDDK....",
  "....KKYYDDK.....",
  ".....KKKKK......",
  "................",
  "................",
  "................",
];

const COIN_THIN = [
  "................",
  ".......KK.......",
  "......KYLK......",
  "......KYYK......",
  "......KYYK......",
  "......KYYK......",
  "......KYYK......",
  "......KYYK......",
  "......KYYK......",
  "......KYDK......",
  "......KYDK......",
  ".......KK.......",
  "................",
  "................",
  "................",
  "................",
];

const COIN_MID_ALT = [
  "................",
  "......KKKK......",
  "....KKYYYYKK....",
  "....KYYYYLLYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KYYYYYYYYK...",
  "...KDDYYYYYYK...",
  "....KDDYYYYK....",
  ".....KDDYYKK....",
  "......KKKKK.....",
  "................",
  "................",
  "................",
];

export function Coin({ scale = 3 }: { scale?: number }) {
  const size = 16 * scale;
  return (
    <span className="coin-spin" style={{ width: size, height: size }} aria-hidden>
      <Sprite rows={COIN_WIDE} scale={scale} />
      <Sprite rows={COIN_MID} scale={scale} />
      <Sprite rows={COIN_THIN} scale={scale} />
      <Sprite rows={COIN_MID_ALT} scale={scale} />
    </span>
  );
}

const HEART = [
  ".KK....KK.",
  "KRRr..KRrK",
  "KRRRRRRRRK",
  "KRRRRRRRRK",
  ".KRRRRRRK.",
  "..KRRRRK..",
  "...KRRK...",
  "....KK....",
];

export function Heart({ scale = 3 }: { scale?: number }) {
  return <Sprite rows={HEART} scale={scale} />;
}

const STAR_GOLD = [
  ".....K.....",
  "....KSK....",
  "...KSSSK...",
  "KKSSSSSSSKK",
  ".KSSSSSSSK.",
  "..KSSSSSK..",
  ".KSSK.KSSK.",
  "KKK.....KKK",
];

const STAR_PINK = [
  ".....K.....",
  "....KMK....",
  "...KMMMK...",
  "KKMMMMMMMK.",
  ".KMMMMMMK..",
  "..KMMMMK...",
  ".KMMK.KMK..",
  "KKK.....KK.",
];

export function Star({
  tone = "gold",
  scale = 3,
}: {
  tone?: "gold" | "pink";
  scale?: number;
}) {
  return <Sprite rows={tone === "pink" ? STAR_PINK : STAR_GOLD} scale={scale} />;
}

const SPARKLE = ["..K..", ".KYK.", "KKYKK", ".KYK.", "..K.."];

export function Sparkle({ scale = 2, delay = "0s" }: { scale?: number; delay?: string }) {
  return (
    <span className="twinkle inline-block" style={{ animationDelay: delay }}>
      <Sprite rows={SPARKLE} scale={scale} />
    </span>
  );
}

const NOTE = ["...KK..", "...KYK.", "...KKK.", ".KKKKK.", "KYKKKK.", ".KKKK.."];

export function MusicNote({ scale = 2 }: { scale?: number }) {
  return <Sprite rows={NOTE} scale={scale} />;
}

const PINK_SLIME = [
  "....KK...KK...",
  "...KPPK.KPPK..",
  "...KPKKKKPK...",
  "....KPPPPPK...",
  "..KKPPPPPPKK..",
  ".KPWWPPPPWWPK.",
  ".KPKKPPPPKKPK.",
  ".KPPPPPPPPPPK.",
  ".KPPPQPPQPPPK.",
  "..KPPPPPPPPK..",
  "...KKPPPPKK...",
  ".....KPPK.....",
  "....KK..KK....",
];

export function PinkSlime({ scale = 3 }: { scale?: number }) {
  return <Sprite rows={PINK_SLIME} scale={scale} />;
}

const BLUE_SLIME = [
  "....KKKKKK....",
  "..KBBBBBBBBK..",
  ".KBBBBBBBBBBK.",
  ".KBWWBBBBWWBK.",
  ".KBKKBBBBKKBN.",
  ".KBBBBBBBBBBK.",
  ".KBBBQQQBBBBK.",
  "..KBBBBBBBBK..",
  "...KKBBBBKK...",
  ".....KBBK.....",
  "....KK..KK....",
];

export function BlueSlime({ scale = 3 }: { scale?: number }) {
  return <Sprite rows={BLUE_SLIME} scale={scale} />;
}

const BIRD = [
  ".....KKKK......",
  "...KKGGGGK.....",
  "..KGWWGGGGK....",
  ".KGGKKGGGGMKK..",
  ".KGGGGGGGGMMK..",
  "..KGGGGGGGKK...",
  "...KGGGGGGK....",
  "....KKYYKK.....",
  ".....KTTK......",
  "....KK..KK.....",
];

export function Bird({ scale = 3 }: { scale?: number }) {
  return <Sprite rows={BIRD} scale={scale} />;
}

const CACTUS_LEFT = [
  "......KK........",
  ".....KGGK.......",
  ".....KGGK.......",
  "..KK.KGGK..KK...",
  ".KQGKGGKKKKQGK..",
  ".KQGKGGGGGGQGK..",
  "..KK.KGGGGK.KK..",
  ".....KGGGGK.....",
  ".....KGGGGK.....",
  ".....KGGGGK.....",
  ".....KGGGGK.....",
  "....KKGGGGKK....",
  "...KTTTTTTTTK...",
  "...KTTtTTTtTK...",
  "...KTTtTTTtTK...",
  "....KTTTTTTTK...",
  ".....KKKKKKK....",
];

const CACTUS_RIGHT = [
  "........KK......",
  ".......KGGK.....",
  ".......KGGK.....",
  "...KK..KGGK.KK..",
  "..KGQKKKGGKGQK..",
  "..KGQKGGGGGKGQK.",
  "..KK.KGGGGK.KK..",
  ".....KGGGGK.....",
  ".....KGGGGK.....",
  ".....KGGGGK.....",
  ".....KGGGGK.....",
  "....KKGGGGKK....",
  "...KTTTTTTTTK...",
  "...KTTtTTTtTK...",
  "...KTTtTTTtTK...",
  "....KTTTTTTTK...",
  ".....KKKKKKK....",
];

export function Cactus({
  side = "left",
  scale = 3,
}: {
  side?: "left" | "right";
  scale?: number;
}) {
  return <Sprite rows={side === "left" ? CACTUS_LEFT : CACTUS_RIGHT} scale={scale} />;
}

const BALLOON = [
  "...KKKKKK...",
  "..KHHHHHHK..",
  ".KHHBBBBBBK.",
  ".KHHBBBBBBK.",
  ".KBBBBBBBBK.",
  ".KBBBBBBBBK.",
  ".KBBBBDDBBK.",
  "..KBBBBBBK..",
  "...KKKKKK...",
  ".....KK.....",
  ".....KK.....",
  "......K.....",
  "......K.....",
  ".....K.K....",
  "....K...K...",
];

const BALLOON_TONES = {
  pink: { B: "#ff8fbf", H: "#ffd6ea", D: "#e2558a" },
  gold: { B: "#f5c518", H: "#fff3b0", D: "#d79a12" },
  red: { B: "#e23b4a", H: "#ffb0b8", D: "#a31f2c" },
  cream: { B: "#f6e7b4", H: "#fffdf8", D: "#e0c56a" },
} as const;

export function Balloon({
  tone = "pink",
  scale = 3,
}: {
  tone?: keyof typeof BALLOON_TONES;
  scale?: number;
}) {
  return <Sprite rows={BALLOON} scale={scale} palette={{ ...PALETTE, ...BALLOON_TONES[tone] }} />;
}

const GIFT = [
  ".....KKKK.....",
  "....KRRRRK....",
  "...KRRRRRRK...",
  "..KKKKKKKKKK..",
  ".KCCCCCCCCCCK.",
  ".KCCCRRRRRCCK.",
  ".KCCCRRRRRCCK.",
  ".KCCCCCCCCCCK.",
  ".KCCCWCCCCCCK.",
  ".KCCCCCCCCCCK.",
  "..KKKKKKKKKK..",
];

export function Gift({ scale = 3 }: { scale?: number }) {
  return (
    <Sprite
      rows={GIFT}
      scale={scale}
      palette={{ ...PALETTE, C: "#f6e7b4", R: "#e23b4a", W: "#fffdf8" }}
    />
  );
}

const CAKE_A = [
  "................",
  "......KYYK......",
  "......KRRK......",
  ".......KK.......",
  "....KKKKKKKK....",
  "...KWWWWWWWWK...",
  "...KWWWWWWWWK...",
  "..KKKKKKKKKKKK..",
  "..KPPPPPPPPPPK..",
  "..KPPMPPPMPPPK..",
  "..KPPPPPPPPPPK..",
  "..KTTTTTTTTTTK..",
  "..KTtTTTtTTTtK..",
  "..KTTTTTTTTTTK..",
  "...KKKKKKKKKK...",
  "................",
];

const CAKE_B = [
  "......KYYK......",
  ".....KYYYYK.....",
  "......KRRK......",
  ".......KK.......",
  "....KKKKKKKK....",
  "...KWWWWWWWWK...",
  "...KWWWWWWWWK...",
  "..KKKKKKKKKKKK..",
  "..KPPPPPPPPPPK..",
  "..KPPMPPPMPPPK..",
  "..KPPPPPPPPPPK..",
  "..KTTTTTTTTTTK..",
  "..KTtTTTtTTTtK..",
  "..KTTTTTTTTTTK..",
  "...KKKKKKKKKK...",
  "................",
];

export function Cake({ scale = 3 }: { scale?: number }) {
  const size = 16 * scale;
  return (
    <span className="flame" style={{ width: size, height: size }} aria-hidden>
      <Sprite rows={CAKE_A} scale={scale} />
      <Sprite rows={CAKE_B} scale={scale} />
    </span>
  );
}

const BADGE = [
  "....KKKKKK....",
  "..KKYYYYYYKK..",
  ".KYLLYYYYLLYK.",
  ".KYYYYSSYYYYK.",
  ".KYYSSSSSSYYK.",
  ".KYSSSSSSSSYK.",
  ".KYYSSSSSSYYK.",
  ".KYYYYSSYYYYK.",
  ".KYYYYYYYYYYK.",
  "..KKYYYYYYKK..",
  "....KKKKKK....",
  ".....KYYK.....",
  "....KYYYYK....",
  "....KKKKKK....",
];

export function Badge({ scale = 4 }: { scale?: number }) {
  return <Sprite rows={BADGE} scale={scale} title="Badge" />;
}

const FLAG = [
  "K...........",
  "KRRRRRRK....",
  "KRRRRRRRRK..",
  "KRRRRRRK....",
  "K...........",
  "K...........",
  "K...........",
  "K...........",
  "KKK.........",
];

const FLAG_B = [
  "K...........",
  "K.RRRRRRK...",
  "K.RRRRRRRRK.",
  "K.RRRRRRK...",
  "K...........",
  "K...........",
  "K...........",
  "K...........",
  "KKK.........",
];

export function Flag({ scale = 3 }: { scale?: number }) {
  return <Sprite rows={FLAG} scale={scale} />;
}

export function FlagWave({ scale = 3 }: { scale?: number }) {
  return (
    <span className="flag-wave" style={{ width: 12 * scale, height: 9 * scale }} aria-hidden>
      <Sprite rows={FLAG} scale={scale} />
      <Sprite rows={FLAG_B} scale={scale} />
    </span>
  );
}

const ARROW = ["K....", "KK...", "KKK..", "KKKK.", "KKKKK", "KKKK.", "KKK..", "KK...", "K...."];

export function PixelArrow({ scale = 2 }: { scale?: number }) {
  return <Sprite rows={ARROW} scale={scale} />;
}

export function HollowDot() {
  return (
    <span
      className="inline-block h-3 w-3 bg-[#fffdf8]"
      style={{ boxShadow: "inset 0 0 0 3px #141414" }}
      aria-hidden
    />
  );
}

const PENNANT = [
  "KKKKKKKK",
  "KCCCCCCK",
  "KCCCCCCK",
  ".KCCCCK.",
  ".KCCCCK.",
  "..KCCK..",
  "..KCCK..",
  "...KK...",
];

const PENNANT_COLORS = ["#e23b4a", "#f6e7b4", "#f5c518", "#ff8fbf", "#fffdf8", "#7ad4f6"];

export function Garland({ count = 15 }: { count?: number }) {
  const width = count * 8;
  const rects: ReactNode[] = [];

  for (let i = 0; i < count; i += 1) {
    const color = PENNANT_COLORS[i % PENNANT_COLORS.length];
    PENNANT.forEach((row, y) => {
      for (let x = 0; x < row.length; x += 1) {
        const cell = row[x];
        if (cell === ".") continue;
        rects.push(
          <rect
            key={`${i}-${x}-${y}`}
            x={i * 8 + x}
            y={y}
            width={1}
            height={1}
            fill={cell === "K" ? "#141414" : color}
          />,
        );
      }
    });
  }

  return (
    <div className="flex justify-center" aria-hidden>
      <svg
        width={width * 2}
        height={16}
        viewBox={`0 0 ${width} 8`}
        shapeRendering="crispEdges"
        className="pixel-sprite"
      >
        {rects}
      </svg>
    </div>
  );
}

const CONFETTI = [
  { x: "7%", y: "16%", c: "#f5c518", w: "6px", h: "4px", delay: "0s", dur: "7.2s", drift: "8px" },
  { x: "15%", y: "40%", c: "#ff8fbf", w: "4px", h: "8px", delay: "1.1s", dur: "8s", drift: "-6px" },
  { x: "22%", y: "64%", c: "#fffdf8", w: "4px", h: "4px", delay: "0.4s", dur: "6.6s", drift: "10px" },
  { x: "76%", y: "20%", c: "#e23b4a", w: "6px", h: "4px", delay: "0.8s", dur: "7.6s", drift: "-8px" },
  { x: "84%", y: "48%", c: "#f6e7b4", w: "4px", h: "6px", delay: "1.5s", dur: "8.4s", drift: "6px" },
  { x: "91%", y: "72%", c: "#7ad4f6", w: "4px", h: "4px", delay: "0.2s", dur: "6.8s", drift: "-10px" },
  { x: "11%", y: "78%", c: "#f5c518", w: "4px", h: "4px", delay: "2s", dur: "9s", drift: "8px" },
];

export function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CONFETTI.map((bit) => (
        <span
          key={`${bit.x}-${bit.delay}`}
          className="confetti"
          style={
            {
              "--x": bit.x,
              "--y": bit.y,
              "--c": bit.c,
              "--w": bit.w,
              "--h": bit.h,
              "--delay": bit.delay,
              "--dur": bit.dur,
              "--drift": bit.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

const TONES = {
  paper: { face: "#fffdf8", trim: "#f6e7b4", text: "text-[#141414]" },
  gold: { face: "#f3c84a", trim: "#fff3b0", text: "text-[#141414]" },
  ink: { face: "#141b30", trim: "#f6e7b4", text: "text-[#fff4c8]" },
  sky: { face: "#2a86e8", trim: "#f6e7b4", text: "text-[#141414]" },
} as const;

export function PixelFrame({
  children,
  tone = "paper",
  dense = false,
  bare = false,
  className = "",
  clip = false,
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  dense?: boolean;
  bare?: boolean;
  className?: string;
  clip?: boolean;
}) {
  const theme = TONES[tone];
  const pad = bare ? "" : dense ? "px-bezel-pad-dense" : "px-bezel-pad";

  return (
    <div className={`px-bezel ${className}`}>
      <div className="px-bezel-trim" style={{ background: theme.trim }}>
        <div className="px-bezel-ink">
          <div
            className={`relative ${theme.text} ${pad} ${clip ? "overflow-hidden" : ""}`}
            style={{ background: theme.face }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DialogBox({
  children,
  label,
  meta,
}: {
  children: ReactNode;
  label?: string;
  meta?: ReactNode;
}) {
  if (!label) {
    return (
      <PixelFrame tone="paper">
        <div className="min-h-[8.75rem] font-dialog text-[16px] leading-[1.85]">{children}</div>
      </PixelFrame>
    );
  }

  return (
    <PixelFrame tone="paper" bare>
      <div className="flex items-center justify-between gap-3 bg-[#141414] px-3 py-2 text-[#f6e7b4]">
        <span className="inline-flex items-center gap-2 font-display text-[8px] leading-loose">
          <Heart scale={2} />
          {label}
        </span>
        {meta}
      </div>
      <div className="min-h-[9.5rem] break-words px-4 py-4 font-dialog text-[16px] leading-[1.85] text-[#141414]">
        {children}
      </div>
    </PixelFrame>
  );
}

export function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<"idle" | "wait" | "show">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal("show");
      return;
    }

    let alive = true;
    const show = () => {
      window.requestAnimationFrame(() => {
        if (!alive) return;
        window.requestAnimationFrame(() => {
          if (alive) setReveal("show");
        });
      });
    };

    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 24;
    setReveal("wait");
    if (visible) {
      show();
      return () => {
        alive = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        show();
      },
      { threshold: 0.14, rootMargin: "0px 0px -3% 0px" },
    );
    observer.observe(node);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-reveal={reveal}
      className={`section-reveal relative scroll-mt-6 px-5 pt-10 pb-12 ${className}`}
    >
      <div className="section-bridge" aria-hidden>
        <span className="section-bridge-line" />
      </div>
      {title ? (
        <header className="mb-6 flex flex-col items-center gap-3">
          <Garland />
          <div className="flex w-full items-center justify-center gap-2">
            <span className="shrink-0">
              <Star tone="gold" scale={2} />
            </span>
            <h2 className="px-banner font-display text-[10px] leading-[1.65]">{title}</h2>
            <span className="shrink-0">
              <Star tone="pink" scale={2} />
            </span>
          </div>
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function CrtOverlay() {
  return (
    <div className="crt" aria-hidden>
      <div className="crt-dither" />
    </div>
  );
}

export function Float({
  children,
  className,
  delay = "0s",
  duration = "2.8s",
  wide = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
  duration?: string;
  wide?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`${wide ? "floaty-wide" : "floaty"} pointer-events-none absolute ${className ?? ""}`}
      style={{ animationDelay: delay, animationDuration: duration, ...style }}
    >
      {children}
    </span>
  );
}

export function PartyMargins() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[1100px]:block"
      aria-hidden
    >
      <Float wide className="top-[8%] left-[max(16px,calc(50%-360px))]" delay="0.2s" duration="4s">
        <Balloon tone="pink" scale={4} />
      </Float>
      <Float className="top-[24%] left-[max(28px,calc(50%-330px))]" delay="0.6s" duration="3.1s">
        <Coin scale={3} />
      </Float>
      <Float wide className="top-[42%] left-[max(20px,calc(50%-390px))]" delay="1s" duration="3.6s">
        <Heart scale={4} />
      </Float>
      <span className="absolute bottom-[18%] left-[max(16px,calc(50%-370px))]">
        <Cactus side="left" scale={4} />
      </span>
      <span className="absolute bottom-[14%] left-[max(78px,calc(50%-300px))]">
        <Gift scale={3} />
      </span>
      <Float wide className="top-[9%] right-[max(16px,calc(50%-360px))]" delay="0.4s" duration="4.2s">
        <Balloon tone="gold" scale={4} />
      </Float>
      <Float className="top-[26%] right-[max(36px,calc(50%-320px))]" delay="0.8s" duration="3s">
        <Star tone="pink" scale={3} />
      </Float>
      <Float wide className="top-[40%] right-[max(18px,calc(50%-390px))]" delay="0.15s" duration="3.4s">
        <Balloon tone="red" scale={3} />
      </Float>
      <span className="absolute bottom-[20%] right-[max(16px,calc(50%-370px))]">
        <Cake scale={3} />
      </span>
      <span className="absolute bottom-[16%] right-[max(84px,calc(50%-290px))]">
        <Cactus side="right" scale={4} />
      </span>
    </div>
  );
}
