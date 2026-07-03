import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 overflow-x-hidden">
        <About />
      </main>

      <Footer />
    </>
  );
}