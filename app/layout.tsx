import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wvnis.github.io/portfoliowaniss/"),

  title: "Waniss Saggal | Développeur web junior",
  description:
    "Portfolio de Waniss Saggal, étudiant en BTS SIO SLAM. Découvrez mes projets, mes compétences en développement web et mon parcours.",

  keywords: [
    "Waniss Saggal",
    "portfolio développeur",
    "développeur web junior",
    "BTS SIO SLAM",
    "portfolio étudiant",
    "JavaScript",
    "Python",
    "SQL",
    "Next.js",
  ],

  authors: [{ name: "Waniss Saggal" }],
  creator: "Waniss Saggal",

  openGraph: {
    title: "Waniss Saggal | Développeur web junior",
    description:
      "Découvrez mon portfolio, mes projets et mon parcours en développement web.",
    url: "https://wvnis.github.io/portfoliowaniss/",
    siteName: "Waniss Saggal Portfolio",
    images: [
      {
        url: "https://wvnis.github.io/portfoliowaniss/preview.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Waniss Saggal",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Waniss Saggal | Portfolio",
    description:
      "Portfolio de Waniss Saggal - Étudiant en BTS SIO SLAM et développement web",
    images: ["https://wvnis.github.io/portfoliowaniss/preview.png"],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}