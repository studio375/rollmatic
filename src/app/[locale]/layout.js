import Header from "@/components/Library/Header/header";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import Footer from "@/components/Library/Footer/footer";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}