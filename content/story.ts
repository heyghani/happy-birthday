/**
 * Satu-satunya tempat untuk teks pribadi, tanggal, lokasi, dan foto.
 * Label UI berbahasa Inggris tetap di komponen. Jangan pindahkan layout hanya untuk ganti kalimat.
 */

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

export type TimelineItem = {
  level: string;
  title: string;
  time: string;
};

export type Story = {
  birthdayName: string;
  hostName: string;
  eventAt: string;
  countdownFrom: string;
  venueName: string;
  mapsQuery: string;
  messages: string[];
  quote: string;
  quoteBy: string;
  gallery: GalleryItem[];
  timeline: TimelineItem[];
  portraitSrc: string;
};

export const story = {
  // TODO: nama yang ulang tahun
  birthdayName: "Dinda",

  // TODO: nama pengirim undangan
  hostName: "Your beloved, Ghani",

  // TODO: waktu acara, ISO 8601, timezone Asia/Jakarta
  eventAt: "2026-10-30T19:00:00+07:00",

  // TODO: awal progress bar, beberapa hari atau minggu sebelum acara
  countdownFrom: "2026-09-01T00:00:00+07:00",

  // TODO: nama venue
  venueName: "Rocca QBIG",

  // TODO: teks lokasi untuk Google Maps (nama tempat atau alamat)
  mapsQuery: "Rocca QBIG, Jakarta",

  // TODO: tiap string = satu halaman dialog
  messages: [
    "Dinda, this is your birthday quest. The reward is cake. The tutorial is me, waving.",
    "I almost wrote a love letter. Then I remembered we are funnier than that.",
    "October 30, 7:00 PM, Rocca QBIG. If you get lost, follow the person who looks too excited.",
    "Tap through, show up, and steal the last slice. Happy birthday.",
  ],

  // TODO: kutipan singkat
  quote: "Congratulations for your leveling up! The next chapter is about to begin! 🎉",

  // TODO: nama di bawah kutipan
  quoteBy: "Dinda",

  // TODO: ganti src, alt, dan label. Simpan foto di public/photos/
  gallery: [
    {
      src: "/photos/memory-1.jpeg",
      alt: "First photobooth photo",
      label: "First Photobooth 📸",
    },
    {
      src: "/photos/memory-2.jpeg",
      alt: "Photo with a favorite tumbler",
      label: "With tumblr kesayangan 🧋",
    },
    {
      src: "/photos/memory-4.jpeg",
      alt: "Close-up photo",
      label: "Cutipiee 💗",
    },
    {
      src: "/photos/memory-3.jpeg",
      alt: "Second photobooth photo",
      label: "Second Photobooth 📸",
    },
  ],

  // TODO: rundown acara. time pakai HH:mm, dihitung pada tanggal eventAt (Asia/Jakarta)
  timeline: [
    { level: "Level 1", title: "Menjemput princess", time: "15:00" },
    { level: "Level 2", title: "Nongkrong cantik", time: "16:00" },
    { level: "Level 3", title: "Dinner", time: "19:00" },
  ],

  // TODO: PNG potret. Transparan kalau ada potongan orang; foto biasa juga bisa.
  portraitSrc: "/photos/cover.jpeg",
} satisfies Story;
