import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Footer";

export const metadata = { title: "Baraka Boulangeries — Maison artisanale depuis 2010" };

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Footer />
    </main>
  );
}
