import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baraka Boulangeries — L'art de la boulangerie française",
  description:
    "Baraka, maison de boulangerie française artisanale. Croissants, pains au levain, viennoiseries et pâtisseries d'exception. 5 boutiques en Île-de-France.",
  openGraph: {
    title: "Baraka Boulangeries",
    description: "Artisanat boulanger depuis 2010. Île-de-France.",
    type: "website",
    locale: "fr_FR",
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
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="grain">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
