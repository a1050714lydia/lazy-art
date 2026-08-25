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

type RegularClass = {
  id: string;
  title: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  price: number;
  category: string;
  active: boolean;
  sort_order: number;
  registration_type: string;
};

const dayOrder: Record<string, number> = {
  週一: 1,
  週二: 2,
  週三: 3,
  週四: 4,
  週五: 5,
  週六: 6,
  週日: 7,
};

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [regularClasses, setRegularClasses] = useState<RegularClass[]>([]);

  useEffect(() => {
    loadCourses();
    loadRegularClasses();
  }, []);

  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error("讀取期間限定課程失敗：", error);
      return;
    }

    setCourses(data ?? []);
  }

  async function loadRegularClasses() {
    const { data, error } = await supabase
      .from("regular_classes")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("讀取常態課程失敗：", error);
      return;
    }

    setRegularClasses(data ?? []);
  }

  const groupedClasses = regularClasses.reduce<
    Record<string, RegularClass[]>
  >((groups, item) => {
    if (!groups[item.day_of_week]) {
      groups[item.day_of_week] = [];
    }

    groups[item.day_of_week].push(item);

    return groups;
  }, {});

  const sortedDays = Object.keys(groupedClasses).sort(
    (a, b) => (dayOrder[a] ?? 99) - (dayOrder[b] ?? 99)
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <section className="mx-auto max-w-7xl px-6 py-20">

          {/* 頁面標題 */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
              LAZY ART
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-900">
              課程介紹
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              從日常創作到主題課程，找到適合自己的藝術時光。
            </p>
          </div>

          {/* =========================
              常態課程
          ========================= */}

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

            {/* 優惠方案 */}
            <div className="mt-8 rounded-[32px] bg-[#8B1E2D] p-8 text-white shadow-xl md:p-10">
              <p className="text-sm font-semibold tracking-[0.2em] text-white/70">
                REGULAR CLASS SPECIAL
              </p>

              <h3 className="mt-3 text-2xl font-black md:text-3xl">
                常態課程優惠
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-lg font-bold">
                    買 11 堂・送 1 堂
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    共可上 12 堂課
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-lg font-bold">
                    買 12 堂・送 2 堂＋畫袋
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    共可上 14 堂課，另贈 Lazy Art 畫袋
                  </p>
                </div>
              </div>
            </div>

            {/* 星期課表 */}
            <div className="mt-12 space-y-10">
              {sortedDays.map((day) => (
                <div key={day}>
                  <div className="mb-5 flex items-center gap-4">
                    <h3 className="text-2xl font-black text-slate-900">
                      {day}
                    </h3>

                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {groupedClasses[day].map((item) => {
                      const isWatercolor =
                        item.registration_type === "watercolor";

                      return (
                        <div
                          key={item.id}
                          className="rounded-[28px] bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-[#8B1E2D]">
                                {item.category}
                              </p>

                              <h4 className="mt-1 text-2xl font-black text-slate-900">
                                {item.title}
                              </h4>
                            </div>

                            {isWatercolor && (
                              <span className="shrink-0 rounded-full bg-[#F3E7E9] px-3 py-1 text-xs font-bold text-[#8B1E2D]">
                                水彩專班
                              </span>
                            )}
                          </div>

                          <div className="mt-5 space-y-2 text-slate-600">
                            <p>
                              🕒 {item.start_time}–{item.end_time}
                            </p>

                            {item.price && (
                              <p>
                                💰 NT$ {Number(item.price).toLocaleString("zh-TW")} / 堂
                              </p>
                            )}
                          </div>

                         <a
  href="#regular-signup"
  className="mt-6 inline-flex rounded-full bg-[#8B1E2D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6f1724]"
>
  選擇此課程 →
</a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* 報名區先預留 */}
            <div
              id="regular-signup"
              className="mt-14 rounded-[32px] bg-white p-8 shadow-xl md:p-10"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-[#8B1E2D]">
                SIGN UP
              </p>

              <h3 className="mt-2 text-3xl font-black text-slate-900">
                常態課程報名
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                選擇適合的上課時段與課程方案，完成資料填寫後即可送出報名。
              </p>

              <p className="mt-5 text-sm text-slate-400">
                報名表單下一步接上。
              </p>
            </div>
          </section>

          {/* =========================
              期間限定課程
          ========================= */}

          {courses.length > 0 && (
            <section className="mt-28">
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