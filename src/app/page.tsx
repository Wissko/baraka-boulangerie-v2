import Hero from "@/components/sections/Hero";
import Histoire from "@/components/sections/Histoire";
import Creations from "@/components/sections/Creations";
import CommandesSpeciales from "@/components/sections/CommandesSpeciales";
import SavoirFaire from "@/components/sections/SavoirFaire";
import Adresses from "@/components/sections/Adresses";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
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
