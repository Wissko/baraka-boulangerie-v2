import Navigation from "@/components/Navigation";
import Histoire from "@/components/sections/Histoire";
import Footer from "@/components/Footer";

export const metadata = { title: "Notre Histoire — Baraka Boulangeries" };

export default function HistoirePage() {
  return (
    <main>
      <Navigation />
      <Histoire />
      <Footer />
    </main>
  );
}
