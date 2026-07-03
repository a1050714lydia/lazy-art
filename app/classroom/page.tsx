import Navbar from "@/components/Navbar";
import Classroom from "@/components/Classroom";
import Footer from "@/components/Footer";

export default function ClassroomPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 overflow-x-hidden">
        <Classroom />
      </main>

      <Footer />
    </>
  );
}