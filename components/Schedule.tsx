"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ScheduleProps = {
  onSelect: (schedule: string) => void;
};

const schedules = [
  {
    date: "7/13（一）",
    time: "14:30－17:00",
  },
  {
    date: "7/14（二）",
    time: "09:30－12:00",
  },
  {
    date: "7/15（三）",
    time: "14:30－17:00",
  },
  {
    date: "7/16（四）",
    time: "09:30－12:00",
  },
  {
    date: "7/17（五）",
    time: "09:30－12:00",
  },
  {
    date: "7/18（六）",
    time: "14:30－17:00",
  },
];

export default function Schedule({
  onSelect,
}: ScheduleProps) {

  const [countMap, setCountMap] = useState<Record<string, number>>({});

  useEffect(() => {

    loadCount();

    const timer = setInterval(() => {
      loadCount();
    }, 10000);

    return () => clearInterval(timer);

  }, []);

  async function loadCount() {
const { data, error } = await supabase
  .from("registrations")
  .select("schedule, payment_status")
  .neq("payment_status", "已取消");
    if (error) {
      console.error(error);
      return;
    }

    const map: Record<string, number> = {};

    (data ?? []).forEach((item) => {
      map[item.schedule] = (map[item.schedule] || 0) + 1;
    });

    setCountMap(map);

  }

  return (

    <section
      id="schedule"
      className="py-28 bg-white"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.25em] text-[#8B1E2D] font-semibold">
            Schedule
          </p>

          <h2 className="mt-5 text-5xl font-black text-[#8B1E2D]">
            活動梯次
          </h2>

          <p className="mt-6 text-xl text-slate-600">
            每梯僅招收 <strong>5 組家庭</strong>，
            名額有限，依完成付款順序保留。
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{schedules.map((item) => {

  const scheduleText = `${item.date}　${item.time}`;

  const count = countMap[scheduleText] || 0;

  const full = count >= 5;

  return (

    <div
      key={scheduleText}
      className={`rounded-[30px] border p-8 transition ${
        full
          ? "border-gray-200 bg-gray-100"
          : "border-[#E8D7D9] bg-[#FAF7F2] hover:-translate-y-1 hover:shadow-xl"
      }`}
    >

      <h3 className="text-3xl font-bold text-[#8B1E2D]">
        {item.date}
      </h3>

      <p className="mt-5 text-lg text-slate-600">
        {item.time}
      </p>

     <div className="mt-6">

  {full ? (
    <>
      <p className="mt-4 text-3xl font-bold text-red-600">
        🔴 已額滿
      </p>
    </>
  ) : (
    <>
      <p className="text-sm text-slate-500">
        剩餘名額
      </p>

      <p className="mt-2 text-3xl font-bold text-green-600">
        {5 - count} / 5 組
      </p>
    </>
  )}

</div>

      <button
        disabled={full}
        onClick={() => {

          onSelect(scheduleText);

          document
            .getElementById("signup")
            ?.scrollIntoView({
              behavior: "smooth",
            });

        }}
        className={`mt-8 w-full rounded-full py-4 text-lg font-bold transition ${
          full
            ? "cursor-not-allowed bg-gray-400 text-white"
            : "bg-[#8B1E2D] text-white hover:bg-[#721825]"
        }`}
      >
     {
  full
    ? "已額滿"
    : count === 4
    ? "🔥 最後 1 組"
    : "立即報名"
}
      </button>

    </div>

  );

})}

        </div>

      </div>

    </section>

  );
}