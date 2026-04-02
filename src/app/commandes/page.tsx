import Navigation from "@/components/Navigation";
import CommandesSpeciales from "@/components/sections/CommandesSpeciales";
import Footer from "@/components/Footer";

export const metadata = { title: "Commandes Spéciales — Baraka Boulangeries" };

export default function CommandesPage() {
  return (
    <main>
      <Navigation />
      <CommandesSpeciales />
      <Footer />
    </main>
  );
}
