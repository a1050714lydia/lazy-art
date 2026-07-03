"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Classroom from "@/components/Classroom";
import Pricing from "@/components/Pricing";
import Schedule from "@/components/Schedule";
import Signup from "@/components/Signup";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedSchedule, setSelectedSchedule] = useState("");

  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Features />
        <Classroom />
        <Pricing />

        <Schedule
          onSelect={setSelectedSchedule}
        />

        <Signup
          selectedSchedule={selectedSchedule}
        />
      </main>

      <Footer />
    </>
  );
}