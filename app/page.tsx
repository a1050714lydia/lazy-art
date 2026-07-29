import Navbar from "@/components/Navbar";
import HomeCourseSection from "@/components/HomeCourseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden pt-20 md:pt-24">
        <HomeCourseSection />
      </main>

      <Footer />
    </>
  );
}