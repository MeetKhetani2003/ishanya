import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  FloatingActions,
  HideOnAdmin,
  PageTransition,
  Preloader,
} from "@/components/site/Chrome";
import { LuxCursor, ScrollLine, SmoothScroll } from "@/components/ui/Interactive";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ishanayarealty.com"),
  title: {
    default: "Ishanaya Realty — Curators of Address",
    template: "%s · Ishanaya Realty",
  },
  description:
    "A private luxury real estate advisory for Mumbai, Navi Mumbai, Panvel, Karjat and Khalapur. Isle of Calm by GHP Group and a curated collection of India's most considered residences.",
  keywords: [
    "luxury real estate Mumbai",
    "Isle of Calm Powai",
    "GHP Group",
    "Powai luxury apartments",
    "Navi Mumbai investment",
    "Panvel NAINA",
    "Karjat villas",
  ],
  openGraph: {
    title: "Ishanaya Realty — Curators of Address",
    description:
      "A private luxury real estate advisory. Isle of Calm, Powai by GHP Group and a curated collection of India's finest addresses.",
    type: "website",
    images: ["/images/hero-skyline.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmSans.variable}`}>
      <body className="bg-ink text-ivory antialiased">
        <Preloader />
        <SmoothScroll />
        <LuxCursor />
        <ScrollLine />
        <Header />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
        <FloatingActions />
      </body>
    </html>
  );
}
