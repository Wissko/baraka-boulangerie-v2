import Navigation from "@/components/Navigation";
import Creations from "@/components/sections/Creations";
import Footer from "@/components/Footer";

export const metadata = { title: "Nos Créations — Baraka Boulangeries" };

export default function CreationsPage() {
  return (
    <main>
      <Navigation />
      <Creations />
      <Footer />
    </main>
  );
}
