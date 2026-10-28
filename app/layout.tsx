import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Silkscreen } from "next/font/google";
import { story } from "@/content/story";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silk",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${story.birthdayName} — Happy Level Up!`,
  description: `A birthday quest for ${story.birthdayName}.`,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#2A86E8",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${pressStart.variable} ${silkscreen.variable} scroll-lock`}
    >
      <body>
        <noscript>
          <style>{`html.scroll-lock, html.scroll-lock body { overflow: auto !important; height: auto !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
