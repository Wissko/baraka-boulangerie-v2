import Navigation from "@/components/Navigation";
import Adresses from "@/components/sections/Adresses";
import Footer from "@/components/Footer";

export const metadata = { title: "Adresses & Horaires — Baraka Boulangeries" };

export default function AdressesPage() {
  return (
    <main>
      <Navigation />
      <Adresses />
      <Footer />
    </main>
  );
}
