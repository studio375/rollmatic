import localFont from "next/font/local";
import Providers from "@/components/providers";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.scss";

const aspekta = localFont({
  src: [{ path: "../assets/fonts/AspektaVF.woff2", style: "normal" }],
  variable: "--font-aspekta",
  weight: "100 900",
});

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${aspekta.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}