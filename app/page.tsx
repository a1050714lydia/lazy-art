import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeCourseSection from "@/components/HomeCourseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />

        {/* 當期課程 */}
        <HomeCourseSection />
      </main>

      <Footer />
    </>
  );
}