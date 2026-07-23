import localFont from "next/font/local";
import Providers from "@/components/providers";
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.scss";

export default async function RootLayout({ children }) {
  return children;
}