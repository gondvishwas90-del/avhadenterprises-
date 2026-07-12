import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
