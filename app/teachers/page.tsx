import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeacherSection from "@/components/TeacherSection";

export default function TeachersPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="bg-[#FAF8F5] py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
              OUR TEACHERS
            </p>

            <h1 className="mt-5 text-5xl font-bold text-slate-900">
              師資介紹
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Lazy Art 擁有不同專長的教師團隊，
              從兒童美術、進階繪畫到科技藝術，
              陪伴每位孩子找到屬於自己的創作方式。
            </p>
          </div>
        </section>

        <TeacherSection />
      </main>

      <Footer />
    </>
  );
}