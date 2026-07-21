import Header from "@/components/Library/Header/header";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import Footer from "@/components/Library/Footer/footer";
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <SmoothScroll>{children}</SmoothScroll>
      <Footer />
    </>
  );
}