import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Histoire from "@/components/sections/Histoire";
import Creations from "@/components/sections/Creations";
import CommandesSpeciales from "@/components/sections/CommandesSpeciales";
import SavoirFaire from "@/components/sections/SavoirFaire";
import Adresses from "@/components/sections/Adresses";
import Footer from "@/components/Footer";

export const metadata = { title: "Baraka Boulangeries — Maison artisanale depuis 2010" };

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Histoire />
      <Creations />
      <CommandesSpeciales />
      <SavoirFaire />
      <Adresses />
      <Footer />
    </main>
  );
}
