import localFont from "next/font/local";
import Providers from "@/components/providers";
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.scss";

const aspekta = localFont({
  src: [{ path: "../assets/fonts/AspektaVF.woff2", style: "normal" }],
  variable: "--font-aspekta",
  weight: "100 900",
});

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${aspekta.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}