// Ganti lagunya dengan menimpa file ini, nama filenya jangan diubah:
// public/audio/soundtrack.mp3

const SRC = "/audio/soundtrack.mp3";

let audio: HTMLAudioElement | null = null;
let playing = false;
const listeners = new Set<(playing: boolean) => void>();

function notify() {
  for (const listener of listeners) listener(playing);
}

function element() {
  if (typeof window === "undefined") return null;
  if (audio) return audio;

  const node = new Audio(SRC);
  node.loop = true;
  node.preload = "auto";
  node.volume = 0.55;
  node.addEventListener("play", () => {
    playing = true;
    notify();
  });
  node.addEventListener("pause", () => {
    playing = false;
    notify();
  });
  audio = node;
  return node;
}

export function onTune(listener: (playing: boolean) => void) {
  listeners.add(listener);
  listener(playing);
  return () => {
    listeners.delete(listener);
  };
}

export function startTune() {
  const node = element();
  if (!node) return;
  void node.play().catch(() => {
    playing = false;
    notify();
  });
}

export function pauseTune() {
  element()?.pause();
}

export function toggleTune() {
  const node = element();
  if (!node) return;
  if (node.paused) startTune();
  else pauseTune();
}
