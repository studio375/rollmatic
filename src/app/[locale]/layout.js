import Header from "@/components/Library/Header/header";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import Footer from "@/components/Library/Footer/footer";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from "next-intl/server";
import Providers from "@/components/providers";
import localFont from "next/font/local";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const aspekta = localFont({
  src: [{ path: "../../assets/fonts/AspektaVF.woff2", style: "normal" }],
  variable: "--font-aspekta",
  weight: "100 900",
});

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) notFound();
  
  return (
    <>
    <html lang={locale} suppressHydrationWarning>
      <body className={`${aspekta.variable} antialiased`}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <SmoothScroll>{children}</SmoothScroll>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
    </>
  );
}