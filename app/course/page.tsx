"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Course = {
  id: string;
  title: string;
 subtitle: string;
  description: string;
  cover: string;
  href: string;
  slug: string;
  active: boolean;
};

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error(error);
      return;
    }

    setCourses(data ?? []);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
              LAZY ART
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-900">
              當期課程
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              選擇喜歡的課程，開始孩子的藝術旅程。
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="group overflow-hidden rounded-[32px] bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden bg-gray-100">
                  <Image
                    src={course.cover}
                    alt={course.title}
                    width={900}
                    height={1200}
                    className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E2D]">
                    {course.subtitle}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-8 inline-flex rounded-full bg-[#8B1E2D] px-6 py-3 font-semibold text-white">
                    查看課程 →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}