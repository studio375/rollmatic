import "./globals.scss";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import localFont from "next/font/local";

const ppNeue = localFont({
  src: [
    {
      path: "../assets/fonts/PPNeueMontreal-Book.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue",
  weight: "400",
});

const ppHatton = localFont({
  src: [
    {
      path: "../assets/fonts/PPHatton-Ultralight.woff",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-hatton",
  weight: "300",
});

export const metadata = {
  title: "Next375 - A Next.js Starter Kit",
  description:
    "A Next.js starter kit for building modern web applications, by Studio375.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it-IT">
      <body className={`${ppNeue.variable} ${ppHatton.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
