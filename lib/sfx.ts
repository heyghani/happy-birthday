let context: AudioContext | null = null;
let unlocked = false;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!context) context = new Ctx();
  return context;
}

export function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();
  unlocked = true;
}

export function audioIsUnlocked() {
  return unlocked;
}

function blip(ctx: AudioContext, frequency: number, when: number, duration: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(frequency, when);
  gain.gain.setValueAtTime(0.045, when);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(when);
  osc.stop(when + duration);
}

export function playStart() {
  if (!unlocked) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  blip(ctx, 523.25, now, 0.07);
  blip(ctx, 659.25, now + 0.08, 0.07);
  blip(ctx, 783.99, now + 0.16, 0.12);
}

export function playAchievement() {
  if (!unlocked) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  blip(ctx, 659.25, now, 0.08);
  blip(ctx, 880, now + 0.09, 0.08);
  blip(ctx, 1174.66, now + 0.18, 0.14);
}
