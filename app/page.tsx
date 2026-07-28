import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeCourseSection from "@/components/HomeCourseSection";
import About from "@/components/About";
import TeacherSection from "@/components/TeacherSection";
import Classroom from "@/components/Classroom";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />

        {/* 當期課程 */}
        <HomeCourseSection />

        {/* 品牌介紹 */}
        <About />

        {/* 我們的老師 */}
        <TeacherSection />

        {/* 教室環境 */}
        <Classroom />
      </main>

      <Footer />
    </>
  );
}
