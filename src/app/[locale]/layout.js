import Header from "@/components/Library/Header/header";
import "../globals.scss";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import localFont from "next/font/local";
import Footer from "@/components/Library/Footer/footer";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { setRequestLocale } from "next-intl/server";

const aspekta = localFont({
  src: [
    {
      path: "../../assets/fonts/AspektaVF.woff2",
      style: "normal",
    },
  ],
  variable: "--font-aspekta",
  weight: "100 900",
});


export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({ children, params }) {
  const {locale} = await params;
  console.log(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={`${aspekta.variable} antialiased`}>
        <NextIntlClientProvider>
          <Header />
          <SmoothScroll>{children}</SmoothScroll>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
