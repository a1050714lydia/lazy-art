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

          {/* 頁面標題 */}
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#8B1E2D]">
              LAZY ART
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-900">
              課程介紹
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              從日常創作到主題課程，找到適合自己的藝術時光。
            </p>
          </div>

          {/* 常態課程 */}
          <section className="mt-20">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#8B1E2D]">
                REGULAR CLASSES
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                常態課程
              </h2>

              <p className="mt-3 text-slate-600">
                每週固定開課，可依年齡、興趣與學習方向選擇適合的班別。
              </p>
            </div>

            <Link
              href="/course/regular"
              className="group mt-8 block overflow-hidden rounded-[32px] bg-[#8B1E2D] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <p className="text-sm font-semibold tracking-[0.2em] text-white/70">
                  LAZY ART STUDIO
                </p>

                <h3 className="mt-4 text-3xl font-black text-white md:text-4xl">
                  每週常態藝術課
                </h3>

                <p className="mt-4 max-w-2xl leading-8 text-white/80">
                  兒童美術・漫畫・素描・黏土・水彩・升學
                </p>

                <div className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#8B1E2D]">
                  查看常態課程 →
                </div>
              </div>
            </Link>
          </section>

          {/* 期間限定課程 */}
          {courses.length > 0 && (
            <section className="mt-24">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#8B1E2D]">
                  SPECIAL CLASSES
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  期間限定課程
                </h2>

                <p className="mt-3 text-slate-600">
                  不定期推出的主題課程與限定工作坊。
                </p>
              </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-2">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.slug}`}
                    className="group overflow-hidden rounded-[32px] bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {course.cover && (
                      <div className="overflow-hidden bg-gray-100">
                        <Image
                          src={course.cover}
                          alt={course.title}
                          width={900}
                          height={1200}
                          className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-8">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E2D]">
                        {course.subtitle}
                      </p>

                      <h3 className="mt-3 text-3xl font-bold text-slate-900">
                        {course.title}
                      </h3>

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
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}