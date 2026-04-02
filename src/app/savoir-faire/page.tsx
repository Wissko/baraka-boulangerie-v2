import Navigation from "@/components/Navigation";
import SavoirFaire from "@/components/sections/SavoirFaire";
import Footer from "@/components/Footer";

export const metadata = { title: "Notre Savoir-Faire — Baraka Boulangeries" };

export default function SavoirFairePage() {
  return (
    <main>
      <Navigation />
      <SavoirFaire />
      <Footer />
    </main>
  );
}
