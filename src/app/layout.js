import Header from "@/components/Library/Header/header";
import "./globals.scss";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import localFont from "next/font/local";
import Footer from "@/components/Library/Footer/footer";


const aspekta = localFont({
  src: [
    {
      path: "../assets/fonts/AspektaVF.woff2",
      style: "normal",
    },
  ],
  variable: "--font-aspekta",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="it-IT">
      <body className={`${aspekta.variable} antialiased`}>
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
