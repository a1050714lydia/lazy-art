"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

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

export default function RegularPage() {
  const [regularClasses, setRegularClasses] = useState<RegularClass[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedClass, setSelectedClass] = useState<RegularClass | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("single");

  useEffect(() => {
    loadRegularClasses();
  }, []);

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

    const classes = data ?? [];
    setRegularClasses(classes);

    const days = Array.from(
      new Set(classes.map((item) => item.day_of_week))
    ).sort(
      (a, b) => (dayOrder[a] ?? 99) - (dayOrder[b] ?? 99)
    );

    if (days.length > 0) {
      setSelectedDay(days[0]);
    }
  }

  const availableDays = Array.from(
    new Set(regularClasses.map((item) => item.day_of_week))
  ).sort(
    (a, b) => (dayOrder[a] ?? 99) - (dayOrder[b] ?? 99)
  );

  const selectedClasses = regularClasses.filter(
    (item) => item.day_of_week === selectedDay
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <section className="mx-auto max-w-6xl px-6 py-20">

          {/* 標題 */}
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.25em] text-[#8B1E2D]">
              REGULAR CLASSES
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-900">
              常態課程
            </h1>

            <p className="mt-5 text-slate-500">
              選擇方便的星期，再查看當天開設的藝術課程。
            </p>
          </div>

          {/* 星期 */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {availableDays.map((day) => {
              const active = selectedDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedClass(null);
                  }}
                  className={`rounded-full px-6 py-3 font-semibold transition ${
                    active
                      ? "bg-[#8B1E2D] text-white shadow-lg"
                      : "border border-[#E4DDD8] bg-white text-slate-600 hover:border-[#8B1E2D]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* 當天課程 */}
          <section className="mt-14">
            <div className="flex items-center gap-5">
              <h2 className="text-2xl font-black text-slate-900">
                {selectedDay}
              </h2>

              <div className="h-px flex-1 bg-[#E8E0DA]" />

              <p className="text-sm text-slate-400">
                {selectedClasses.length} 堂課程
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {selectedClasses.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[26px] border border-[#EEE7E2] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-sm font-bold text-[#8B1E2D]">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-slate-900">
                    {item.title}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm text-slate-500">
                    <p>
                      {item.start_time}–{item.end_time}
                    </p>

                    <p className="font-bold text-slate-700">
                      NT$ {Number(item.price).toLocaleString("zh-TW")} / 堂
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClass(item);
                      setSelectedPlan("single");

                      setTimeout(() => {
                        document
                          .getElementById("regular-signup")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }, 100);
                    }}
                    className="mt-6 text-sm font-bold text-[#8B1E2D] transition hover:opacity-60"
                  >
                    選擇此課程 →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 優惠 */}
          <div className="mt-10 rounded-[26px] bg-[#8B1E2D] px-7 py-6 text-white">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-white/60">
                  REGULAR CLASS SPECIAL
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  常態課程優惠
                </h3>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <p>
                  <strong>買 11 堂送 1 堂</strong> ・共 12 堂
                </p>

                <p>
                  <strong>買 12 堂送 2 堂</strong> ・共 14 堂＋畫袋
                </p>
              </div>
            </div>
          </div>

          {/* 選到課程才出現 */}
          {selectedClass && (
            <section
              id="regular-signup"
              className="mx-auto mt-16 max-w-3xl rounded-[32px] bg-white p-8 shadow-xl md:p-10"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-[#8B1E2D]">
                REGISTRATION
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                常態課程報名
              </h2>

              {/* 已選課程 */}
              <div className="mt-7 rounded-[24px] bg-[#FAF8F5] p-6">
                <p className="text-xs font-bold text-[#8B1E2D]">
                  已選擇課程
                </p>

                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {selectedClass.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {selectedClass.day_of_week} ・{" "}
                      {selectedClass.start_time}–
                      {selectedClass.end_time}
                    </p>
                  </div>

                  <p className="font-black text-slate-800">
                    NT$
                    {Number(selectedClass.price).toLocaleString("zh-TW")} / 堂
                  </p>
                </div>
              </div>

              {/* 方案 */}
              <div className="mt-8">
                <h3 className="font-bold text-slate-900">
                  選擇報名方案
                </h3>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("single")}
                    className={`rounded-[20px] border p-5 text-left transition ${
                      selectedPlan === "single"
                        ? "border-[#8B1E2D] bg-[#FFF9F9]"
                        : "border-[#E4DDD8]"
                    }`}
                  >
                    <p className="font-bold text-slate-900">
                      單堂報名
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      NT$
                      {Number(selectedClass.price).toLocaleString("zh-TW")}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("12")}
                    className={`rounded-[20px] border p-5 text-left transition ${
                      selectedPlan === "12"
                        ? "border-[#8B1E2D] bg-[#FFF9F9]"
                        : "border-[#E4DDD8]"
                    }`}
                  >
                    <p className="font-bold text-slate-900">
                      買 11 堂送 1 堂
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      共 12 堂課
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("14")}
                    className={`rounded-[20px] border p-5 text-left transition ${
                      selectedPlan === "14"
                        ? "border-[#8B1E2D] bg-[#FFF9F9]"
                        : "border-[#E4DDD8]"
                    }`}
                  >
                    <p className="font-bold text-slate-900">
                      買 12 堂送 2 堂
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      共 14 堂＋畫袋
                    </p>
                  </button>
                </div>
              </div>

        <button
  type="button"
  onClick={() => {
    if (!selectedPlan) return;

    setTimeout(() => {
      document
        .getElementById("regular-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }}
  className="mt-8 w-full rounded-full bg-[#8B1E2D] px-6 py-4 font-bold text-white transition hover:opacity-60"
>
  下一步填寫報名資料 →
</button>
            </section>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}