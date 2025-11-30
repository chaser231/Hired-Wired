import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Instrument Serif - для заголовков H1, H2
const instrumentSerif = localFont({
  src: [
    {
      path: "../../fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

// Akkurat LL Cyrillic - основной sans-serif
const akkurat = localFont({
  src: [
    {
      path: "../../fonts/AkkuratLLCyr-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../fonts/AkkuratLLCyr-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../fonts/AkkuratLLCyr-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/AkkuratLLCyr-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../fonts/AkkuratLLCyr-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/AkkuratLLCyr-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/AkkuratLLCyr-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/AkkuratLLCyr-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../fonts/AkkuratLLCyr-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../fonts/AkkuratLLCyr-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

// Pixform - пиксельный шрифт для labels
const pixform = localFont({
  src: [
    {
      path: "../../fonts/Pixform.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hired & Wired",
  description: "HR Platform MVP - Team Management, Hiring, Onboarding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${akkurat.variable} ${pixform.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
