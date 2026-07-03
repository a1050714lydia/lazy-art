import Navbar from "@/components/Navbar";
import Signup from "@/components/Signup";
import Footer from "@/components/Footer";

export default function SignupPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 overflow-x-hidden">
        <Signup
          selectedSchedule=""
        />
      </main>

      <Footer />
    </>
  );
}