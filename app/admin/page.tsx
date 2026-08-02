"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  schedule_id: string; //
  created_at: string;
  schedule: string;
  parent_name: string;
  phone: string;
  child_name: string;
  polaroid: boolean;
  extra_person: boolean;
  total_price: number;
  payment_status: string;
  paid?: boolean;

  courses: {
    title: string;
    cover_title: string;
  };
};
export default function AdminPage() {
  const [list, setList] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
const [selectedCourse, setSelectedCourse] = useState<
  "all" | "father" | "clay"
>("all");
  useEffect(() => {
    loadData();
  }, []);
async function updateRemaining(scheduleId: string, diff: number) {
  const { data } = await supabase
    .from("course_schedules")
    .select("remaining")
    .eq("id", scheduleId)
    .single();

  if (!data) return;

  await supabase
    .from("course_schedules")
    .update({
      remaining: data.remaining + diff,
    })
    .eq("id", scheduleId);
}
  async function loadData() {
    setLoading(true);
const { data, error } = await supabase
  .from("registrations")
  .select(`
    *,
    courses (
      title,
      cover_title
    )
  `)
  .order("created_at", {
    ascending: false,
  });
if (error) {
  console.error("Supabase Error:", error);
  alert("讀取資料失敗");
  setLoading(false);
  return;
}

    setList(data || []);
    setLoading(false);
  }

  async function confirmPayment(id: string) {
    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: "已付款",
        paid: true,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("更新失敗");
      return;
    }

    loadData();
  }

  async function markPending(id: string) {
    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: "待付款",
        paid: false,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("更新失敗");
      return;
    }

    loadData();
  }

async function cancelRegistration(item: Registration) {
  if (!confirm("確定取消這筆報名？")) return;

  const { error } = await supabase
    .from("registrations")
    .update({
      payment_status: "已取消",
      paid: false,
    })
    .eq("id", item.id);

  if (error) {
    alert("取消失敗");
    return;
  }

  await updateRemaining(item.schedule_id, 1);

  loadData();
}


async function restoreRegistration(item: Registration) {
  const { error } = await supabase
    .from("registrations")
    .update({
      payment_status: "待付款",
      paid: false,
    })
    .eq("id", item.id);

  if (error) {
    alert("恢復失敗");
    return;
  }

  await updateRemaining(item.schedule_id, -1);

  loadData();
}
const filteredList =
  selectedCourse === "all"
    ? list
    : list.filter(
        (item) =>
          item.courses?.cover_title === selectedCourse
      );

const paidCount = filteredList.filter(
  (i) => i.payment_status === "已付款"
).length;

const pendingCount = filteredList.filter(
  (i) => i.payment_status === "待付款"
).length;

const cancelCount = filteredList.filter(
  (i) => i.payment_status === "已取消"
).length;

  return (
    <main className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-[#8B1E2D]">
          Lazy Art 管理後台
        </h1>

        <p className="mt-3 text-slate-500">
        共 {filteredList.length} 筆報名資料
        </p>
<div className="mt-8 mb-6 flex gap-3">
  <button
    onClick={() => setSelectedCourse("all")}
    className={`rounded-full px-5 py-2 ${
      selectedCourse === "all"
        ? "bg-[#8B1E2D] text-white"
        : "border bg-white"
    }`}
  >
    全部
  </button>

  <button
    onClick={() => setSelectedCourse("father")}
    className={`rounded-full px-5 py-2 ${
      selectedCourse === "father"
        ? "bg-[#8B1E2D] text-white"
        : "border bg-white"
    }`}
  >
    👨 父親節
  </button>

  <button
    onClick={() => setSelectedCourse("clay")}
    className={`rounded-full px-5 py-2 ${
      selectedCourse === "clay"
        ? "bg-[#8B1E2D] text-white"
        : "border bg-white"
    }`}
  >
    🐳 海洋黏土
  </button>
</div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-slate-500">總報名</p>
            <p className="mt-2 text-3xl font-black">{filteredList.length}</p>
          </div>

          <div className="rounded-3xl bg-green-50 p-6 shadow">
            <p className="text-green-700">已付款</p>
            <p className="mt-2 text-3xl font-black text-green-700">
              {paidCount}
            </p>
          </div>

          <div className="rounded-3xl bg-orange-50 p-6 shadow">
            <p className="text-orange-700">待付款</p>
            <p className="mt-2 text-3xl font-black text-orange-700">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-3xl bg-red-50 p-6 shadow">
            <p className="text-red-700">已取消</p>
            <p className="mt-2 text-3xl font-black text-red-700">
              {cancelCount}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-20 text-center text-xl text-slate-500">
            讀取中...
          </div>
        ) : (
          <div className="mt-10 space-y-6">
           {filteredList.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-[#E8D7D9] bg-white p-8 shadow-lg transition hover:shadow-xl"
              >
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                  <div>
                    <h2 className="text-2xl font-bold text-[#8B1E2D]">
                      👩 {item.parent_name}
                    </h2>

                    <p className="mt-3 text-slate-600">
                      👧 小朋友：{item.child_name}
                    </p>

                    <p className="mt-1 text-slate-600">
                      📞 {item.phone}
                    </p>

                    <p className="mt-1 text-slate-600">
                      📅 {item.schedule}
                    </p>
                    <p className="mt-1 text-slate-600">
📚 {item.courses?.title ?? "未指定課程"}
</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">總金額</p>

                    <p className="mt-1 text-3xl font-black text-[#8B1E2D]">
                      NT$ {item.total_price}
                    </p>
                  </div>
                </div>

             {item.courses?.cover_title === "father" && (
  <div className="mt-6 flex flex-wrap gap-3">
    <span className="rounded-full bg-[#FAF7F2] px-4 py-2">
      {item.polaroid
        ? "📸 已加購拍立得"
        : "📸 未加購拍立得"}
    </span>

    <span className="rounded-full bg-[#FAF7F2] px-4 py-2">
      {item.extra_person
        ? "👨‍👩‍👧 多一位同行"
        : "👨‍👩‍👧 1 大 1 小"}
    </span>
  </div>
)}

                <div className="mt-6">
                  <span
                    className={`rounded-full px-5 py-2 font-bold text-white ${
                      item.payment_status === "待付款"
                        ? "bg-orange-500"
                        : item.payment_status === "已付款"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {item.payment_status}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {item.payment_status !== "已付款" && (
                    <button
                      onClick={() => confirmPayment(item.id)}
                      className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      ✓ 確認付款
                    </button>
                  )}

                  {item.payment_status !== "待付款" && (
                    <button
                      onClick={() => markPending(item.id)}
                      className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                      ↺ 改回待付款
                    </button>
                  )}

                  {item.payment_status !== "已取消" ? (
                    <button
                  onClick={() => cancelRegistration(item)}
                      className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                      ✕ 取消報名
                    </button>
                  ) : (
                    <button
                onClick={() => restoreRegistration(item)}
                      className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      ↩ 恢復報名
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}