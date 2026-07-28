"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Signup from "@/components/Signup";
import Footer from "@/components/Footer";

function SignupContent() {
  const searchParams = useSearchParams();

  const scheduleId =
    searchParams.get("schedule") ?? "";

  return (
    <main className="pt-24 md:pt-28">
      <Signup selectedSchedule={scheduleId} />
    </main>
  );
}

export default function SchedulePage() {
  return (
    <>
      <Navbar />

      <Suspense fallback={null}>
        <SignupContent />
      </Suspense>

      <Footer />
    </>
  );
}