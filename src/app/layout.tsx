import type { Metadata } from "next";
import { Inter, Playfair_Display, Alegreya_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic"],
  weight: ["400", "700"],
  display: "swap",
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  variable: "--font-alegreya-sans",
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Avhad Enterprises | Global Strategy, Technology & Digital Transformation",
  description: "Avhad Enterprises is a premier global strategy, technology consulting, and digital transformation company. We engineer high-performance ecosystems, design intelligent automated operations, and build future-proof systems.",
  keywords: ["Digital Transformation", "Enterprise Architecture", "Technology Consulting", "Global Strategy", "AI Solutions", "Systems Integration", "Avhad Enterprises"],
  authors: [{ name: "Avhad Enterprises" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, alegreyaSans.variable, "font-sans", geist.variable)}>
      <body>
        {children}
      </body>
    </html>
  );
}
