"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import CourseSummary from "./CourseSummary";
import SignupForm from "./SignupForm";
import PriceCard from "./PriceCard";
import ContactInfo from "./ContactInfo";

type SignupProps = {
  selectedSchedule: string;
};

type Course = {
  id: string;
  title: string;
  subtitle: string | null;
  price: number | null;
  duration: string | null;
  materials: string | null;
  target_age: string | null;
  notice: string | null;
  cover_title: string | null;
};

type Schedule = {
  id: string;
  title: string;
  class_date: string;
  start_time: string;
  end_time: string;
  remaining: number;
  course_id: string;
  courses: Course;
};

export default function Signup({
  selectedSchedule,
}: SignupProps) {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [childName, setChildName] = useState("");
  const [note, setNote] = useState("");

  const [extraPerson, setExtraPerson] = useState(false);
  const [polaroid, setPolaroid] = useState(false);

  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [remaining, setRemaining] = useState(0);

  const [courseInfo, setCourseInfo] =
    useState<Course | null>(null);

  useEffect(() => {
    if (selectedSchedule) {
      loadSchedule();
    }
  }, [selectedSchedule]);

  useEffect(() => {
    setTotalPrice(
      price +
        (extraPerson ? 500 : 0) +
        (polaroid ? 150 : 0)
    );
  }, [price, extraPerson, polaroid]);

  async function loadSchedule() {
    const { data, error } = await supabase
      .from("course_schedules")
      .select(`
        *,
        courses (
          id,
          title,
          subtitle,
          price,
          duration,
          materials,
          target_age,
          notice,
          cover_title
        )
      `)
      .eq("id", selectedSchedule)
      .single();
if (error || !data) {
  console.log("selectedSchedule =", selectedSchedule);
  console.log("error =", error);
  console.log("data =", data);
  return;
}
    const schedule = data as Schedule;

    setCourseInfo(schedule.courses);
    setCourseId(schedule.course_id);

    setCourseTitle(schedule.courses.title);

    const date = new Date(schedule.class_date);
    const week = ["日","一","二","三","四","五","六"];

    setScheduleTitle(
      `${date.getMonth() + 1}/${date.getDate()}（${week[date.getDay()]}）`
    );

    setScheduleTime(
      `${schedule.start_time.slice(0,5)}－${schedule.end_time.slice(0,5)}`
    );

    setPrice(schedule.courses.price ?? 0);
    setRemaining(schedule.remaining);
  }
    async function handleSubmit() {
    if (!selectedSchedule) {
      alert("請先選擇課程梯次");
      return;
    }

    if (!parentName || !phone || !childName) {
      alert("請填寫完整資料");
      return;
    }

    setLoading(true);

    const { data: latestSchedule, error: latestError } =
      await supabase
        .from("course_schedules")
        .select("*")
        .eq("id", selectedSchedule)
        .single();

    if (latestError || !latestSchedule) {
      setLoading(false);
      alert("找不到課程梯次");
      return;
    }

    if (latestSchedule.remaining <= 0) {
      setLoading(false);
      alert("❌ 此梯次已額滿");
      return;
    }

    const { error: insertError } = await supabase
      .from("registrations")
      .insert([
        {
          course_id: courseId,
          schedule_id: selectedSchedule,

          schedule: scheduleTitle,

          parent_name: parentName,
          phone,
          line_id: lineId,
          child_name: childName,
          note,

          extra_person: extraPerson,
          polaroid,

          price,
          total_price: totalPrice,

          payment_status: "待付款",
          paid: false,
        },
      ]);

    if (insertError) {
      console.error(insertError);
      setLoading(false);
      alert(insertError.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("course_schedules")
      .update({
        remaining: latestSchedule.remaining - 1,
      })
      .eq("id", selectedSchedule);

    if (updateError) {
      console.error(updateError);
    }

    setRemaining((prev) => Math.max(prev - 1, 0));

    setLoading(false);

    alert(`🎉 報名成功！

課程：
${courseTitle}

梯次：
${scheduleTitle}

時間：
${scheduleTime}

課程費：
NT$${price}

同行加購：
${extraPerson ? "有 (+500)" : "沒有"}

拍立得：
${polaroid ? "有 (+150)" : "沒有"}

總金額：
NT$${totalPrice}

請加入官方 LINE 完成付款。`);

    setParentName("");
    setPhone("");
    setLineId("");
    setChildName("");
    setNote("");

    setExtraPerson(false);
    setPolaroid(false);
  }
    return (
    <section
      id="signup"
      className="bg-[#FAF7F2] py-28"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
            SIGN UP
          </p>

          <h2 className="mt-5 text-5xl font-black text-[#8B1E2D]">
            立即報名
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-slate-600">
            填寫以下資料，我們會盡快與您聯繫。
          </p>
        </div>

        <div className="mt-12 space-y-8 rounded-[36px] bg-white p-10 shadow-xl">
          <CourseSummary
            courseTitle={courseTitle}
            scheduleTitle={scheduleTitle}
            scheduleTime={scheduleTime}
            remaining={remaining}
          />

          <SignupForm
            courseInfo={courseInfo}
            courseTitle={courseTitle}
            parentName={parentName}
            setParentName={setParentName}
            phone={phone}
            setPhone={setPhone}
            lineId={lineId}
            setLineId={setLineId}
            childName={childName}
            setChildName={setChildName}
            note={note}
            setNote={setNote}
            extraPerson={extraPerson}
            setExtraPerson={setExtraPerson}
            polaroid={polaroid}
            setPolaroid={setPolaroid}
          />

          <PriceCard
            courseInfo={courseInfo}
            price={price}
            totalPrice={totalPrice}
            extraPerson={extraPerson}
            polaroid={polaroid}
            remaining={remaining}
            loading={loading}
            handleSubmit={handleSubmit}
          />

          {remaining <= 2 && remaining > 0 && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <p className="font-semibold text-orange-600">
                ⚠️ 剩餘名額僅剩 {remaining} 位，額滿即截止報名。
              </p>
            </div>
          )}

          {remaining === 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="font-semibold text-red-600">
                ❌ 此梯次已額滿，目前暫停報名。
              </p>
            </div>
          )}

          <ContactInfo />
        </div>
      </div>
    </section>
  );
}