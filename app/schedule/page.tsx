"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Schedule from "@/components/Schedule";
import Signup from "@/components/Signup";
import Footer from "@/components/Footer";

export default function SchedulePage() {
  const [selectedSchedule, setSelectedSchedule] = useState("");

  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 overflow-x-hidden">
        <Schedule onSelect={setSelectedSchedule} />

        <Signup
          selectedSchedule={selectedSchedule}
        />
      </main>

      <Footer />
    </>
  );
}