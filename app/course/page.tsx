import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function CoursePage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 overflow-x-hidden">
        <Features />
        <Pricing />
      </main>

      <Footer />
    </>
  );
}