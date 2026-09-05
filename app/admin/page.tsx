"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  created_at: string;

  schedule_id: string | null;
  class_id: string | null;

  schedule: string;
  parent_name: string;
  phone: string;
  email?: string | null;
  child_name: string | null;

  polaroid: boolean;
  extra_person: boolean;

  price?: number | null;
  total_price: number;

  payment_status: string;
  paid?: boolean;

  note?: string | null;

  registration_type?: string | null;
  course_name?: string | null;
  plan?: string | null;

  courses?: {
    title: string;
    cover_title: string;
  } | null;
};

type MainFilter = "all" | "regular" | "workshop";

type StatusFilter =
  | "all"
  | "已付款"
  | "待付款"
  | "已取消";

export default function AdminPage() {
  const [list, setList] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  // 第一層：全部 / 常態 / 限定
  const [mainFilter, setMainFilter] =
    useState<MainFilter>("all");

  // 第二層：實際課程
  const [courseFilter, setCourseFilter] =
    useState("all");

  // 第三層：付款狀態
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  useEffect(() => {
    loadData();
  }, []);

  /* =========================
      判斷報名類型
  ========================= */

  function getRegistrationType(
    item: Registration
  ): "regular" | "workshop" {
    // 新資料直接看 registration_type
    if (item.registration_type === "regular") {
      return "regular";
    }

    // 舊資料沒有 registration_type，
    // 但有 courses 關聯 → 視為限定課
    return "workshop";
  }

  /* =========================
      取得顯示用課程名稱
  ========================= */

  function getCourseName(item: Registration) {
    if (getRegistrationType(item) === "regular") {
      return (
        item.course_name ||
        getRegularCourseNameFromNote(item.note) ||
        "未指定常態課"
      );
    }

    return item.courses?.title || "未指定限定課";
  }

  /* =========================
      舊/過渡資料：
      從 note 讀常態課名稱
      常態課程｜黏土｜單堂報名
  ========================= */

  function getRegularCourseNameFromNote(
    note?: string | null
  ) {
    if (!note?.startsWith("常態課程｜")) {
      return null;
    }

    const parts = note.split("｜");

    return parts[1] || null;
  }

  /* =========================
      取得方案名稱
  ========================= */

  function getPlanName(item: Registration) {
    if (item.plan === "12") {
      return "買 11 堂送 1 堂";
    }

    if (item.plan === "14") {
      return "買 12 堂送 2 堂";
    }

    if (item.plan === "single") {
      return "單堂報名";
    }

    // 相容之前已經寫進 note 的資料
    if (item.note?.includes("買 11 堂送 1 堂")) {
      return "買 11 堂送 1 堂";
    }

    if (item.note?.includes("買 12 堂送 2 堂")) {
      return "買 12 堂送 2 堂";
    }

    if (item.note?.includes("單堂報名")) {
      return "單堂報名";
    }

    return null;
  }

  /* =========================
      讀取資料
  ========================= */

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

    setList((data || []) as Registration[]);
    setLoading(false);
  }

  /* =========================
      限定課剩餘名額
  ========================= */

  async function updateRemaining(
    scheduleId: string,
    diff: number
  ) {
    const { data, error } = await supabase
      .from("course_schedules")
      .select("remaining")
      .eq("id", scheduleId)
      .single();

    if (error || !data) {
      console.error(
        "讀取限定課剩餘名額失敗：",
        error
      );
      return;
    }

    const nextRemaining =
      Number(data.remaining) + diff;

    const { error: updateError } = await supabase
      .from("course_schedules")
      .update({
        remaining: nextRemaining,
      })
      .eq("id", scheduleId);

    if (updateError) {
      console.error(
        "更新限定課剩餘名額失敗：",
        updateError
      );
    }
  }

  /* =========================
      確認付款
  ========================= */

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

    await loadData();
  }

  /* =========================
      改回待付款
  ========================= */

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

    await loadData();
  }

  /* =========================
      取消報名
  ========================= */

  async function cancelRegistration(
    item: Registration
  ) {
    if (!confirm("確定取消這筆報名？")) {
      return;
    }

    // 避免已取消資料再次加回名額
    if (item.payment_status === "已取消") {
      return;
    }

    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: "已取消",
        paid: false,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert("取消失敗");
      return;
    }

    /*
      只有限定課才有 course_schedules.remaining
      常態課不可以碰這張表
    */
    if (
      getRegistrationType(item) === "workshop" &&
      item.schedule_id
    ) {
      await updateRemaining(
        item.schedule_id,
        1
      );
    }

    await loadData();
  }

  /* =========================
      恢復報名
  ========================= */

  async function restoreRegistration(
    item: Registration
  ) {
    if (item.payment_status !== "已取消") {
      return;
    }

    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: "待付款",
        paid: false,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert("恢復失敗");
      return;
    }

    /*
      只有限定課才需要扣回名額
    */
    if (
      getRegistrationType(item) === "workshop" &&
      item.schedule_id
    ) {
      await updateRemaining(
        item.schedule_id,
        -1
      );
    }

    await loadData();
  }

  /* =========================
      第一層篩選
  ========================= */

  const mainFilteredList = useMemo(() => {
    if (mainFilter === "all") {
      return list;
    }

    return list.filter(
      (item) =>
        getRegistrationType(item) ===
        mainFilter
    );
  }, [list, mainFilter]);

  /* =========================
      第二層可選課程
  ========================= */

  const availableCourses = useMemo(() => {
    const names = mainFilteredList
      .map((item) => getCourseName(item))
      .filter(Boolean);

    return Array.from(new Set(names));
  }, [mainFilteredList]);

  /* =========================
      最終篩選
  ========================= */

  const filteredList = useMemo(() => {
    return mainFilteredList.filter(
      (item) => {
        const courseMatch =
          courseFilter === "all" ||
          getCourseName(item) === courseFilter;

        const statusMatch =
          statusFilter === "all" ||
          item.payment_status ===
            statusFilter;

        return courseMatch && statusMatch;
      }
    );
  }, [
    mainFilteredList,
    courseFilter,
    statusFilter,
  ]);

  /* =========================
      統計
  ========================= */

  const paidCount = filteredList.filter(
    (item) =>
      item.payment_status === "已付款"
  ).length;

  const pendingCount = filteredList.filter(
    (item) =>
      item.payment_status === "待付款"
  ).length;

  const cancelCount = filteredList.filter(
    (item) =>
      item.payment_status === "已取消"
  ).length;

  /* =========================
      切換主要分類
  ========================= */

  function changeMainFilter(
    value: MainFilter
  ) {
    setMainFilter(value);

    // 換大分類時重設課程
    setCourseFilter("all");
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-8 sm:px-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            標題
        ========================= */}

        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-[#8B1E2D]/60">
            ADMIN DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-black leading-tight text-[#8B1E2D] sm:text-5xl">
            Lazy Art 管理後台
          </h1>

          <p className="mt-3 text-slate-500">
            共 {filteredList.length} 筆報名資料
          </p>
        </div>

        {/* =========================
            第一層：課程類型
        ========================= */}

        <section className="mt-10">
          <p className="mb-3 text-sm font-bold text-slate-500">
            課程類型
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                changeMainFilter("all")
              }
              className={`rounded-full px-5 py-3 font-semibold transition ${
                mainFilter === "all"
                  ? "bg-[#8B1E2D] text-white"
                  : "border border-[#DDD5CF] bg-white text-slate-700"
              }`}
            >
              全部
            </button>

            <button
              type="button"
              onClick={() =>
                changeMainFilter("regular")
              }
              className={`rounded-full px-5 py-3 font-semibold transition ${
                mainFilter === "regular"
                  ? "bg-[#8B1E2D] text-white"
                  : "border border-[#DDD5CF] bg-white text-slate-700"
              }`}
            >
              🎨 常態課程
            </button>

            <button
              type="button"
              onClick={() =>
                changeMainFilter("workshop")
              }
              className={`rounded-full px-5 py-3 font-semibold transition ${
                mainFilter === "workshop"
                  ? "bg-[#8B1E2D] text-white"
                  : "border border-[#DDD5CF] bg-white text-slate-700"
              }`}
            >
              ✨ 限定課程
            </button>
          </div>
        </section>

        {/* =========================
            第二層：課程
        ========================= */}

        {availableCourses.length > 0 && (
          <section className="mt-7">
            <p className="mb-3 text-sm font-bold text-slate-500">
              課程
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  setCourseFilter("all")
                }
                className={`rounded-full px-5 py-3 font-semibold transition ${
                  courseFilter === "all"
                    ? "bg-slate-800 text-white"
                    : "border border-[#DDD5CF] bg-white text-slate-700"
                }`}
              >
                全部課程
              </button>

              {availableCourses.map(
                (course) => (
                  <button
                    key={course}
                    type="button"
                    onClick={() =>
                      setCourseFilter(course)
                    }
                    className={`rounded-full px-5 py-3 font-semibold transition ${
                      courseFilter === course
                        ? "bg-slate-800 text-white"
                        : "border border-[#DDD5CF] bg-white text-slate-700"
                    }`}
                  >
                    {course}
                  </button>
                )
              )}
            </div>
          </section>
        )}

        {/* =========================
            第三層：狀態
        ========================= */}

        <section className="mt-7">
          <p className="mb-3 text-sm font-bold text-slate-500">
            報名狀態
          </p>

          <div className="flex flex-wrap gap-3">
            {(
              [
                "all",
                "已付款",
                "待付款",
                "已取消",
              ] as StatusFilter[]
            ).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  setStatusFilter(status)
                }
                className={`rounded-full px-5 py-3 font-semibold transition ${
                  statusFilter === status
                    ? "bg-[#8B1E2D] text-white"
                    : "border border-[#DDD5CF] bg-white text-slate-700"
                }`}
              >
                {status === "all"
                  ? "全部狀態"
                  : status}
              </button>
            ))}
          </div>
        </section>

        {/* =========================
            統計
        ========================= */}

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

          <div className="rounded-[24px] bg-white p-5 shadow-sm md:p-6">
            <p className="text-sm text-slate-500">
              總報名
            </p>

            <p className="mt-2 text-3xl font-black">
              {filteredList.length}
            </p>
          </div>

          <div className="rounded-[24px] bg-green-50 p-5 shadow-sm md:p-6">
            <p className="text-sm text-green-700">
              已付款
            </p>

            <p className="mt-2 text-3xl font-black text-green-700">
              {paidCount}
            </p>
          </div>

          <div className="rounded-[24px] bg-orange-50 p-5 shadow-sm md:p-6">
            <p className="text-sm text-orange-700">
              待付款
            </p>

            <p className="mt-2 text-3xl font-black text-orange-700">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-[24px] bg-red-50 p-5 shadow-sm md:p-6">
            <p className="text-sm text-red-700">
              已取消
            </p>

            <p className="mt-2 text-3xl font-black text-red-700">
              {cancelCount}
            </p>
          </div>

        </div>

        {/* =========================
            報名列表
        ========================= */}

        {loading ? (
          <div className="mt-20 text-center text-xl text-slate-500">
            讀取中...
          </div>
        ) : filteredList.length === 0 ? (
          <div className="mt-10 rounded-[28px] bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-700">
              目前沒有符合條件的報名
            </p>

            <p className="mt-2 text-sm text-slate-400">
              可以切換上方課程或報名狀態查看
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {filteredList.map((item) => {
              const type =
                getRegistrationType(item);

              const courseName =
                getCourseName(item);

              const planName =
                getPlanName(item);

              return (
                <div
                  key={item.id}
                  className="rounded-[28px] border border-[#E8D7D9] bg-white p-6 shadow-md transition hover:shadow-lg md:p-8"
                >

                  {/* 類型標籤 */}

                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        type === "regular"
                          ? "bg-[#F4E9EA] text-[#8B1E2D]"
                          : "bg-[#EEF1F5] text-slate-600"
                      }`}
                    >
                      {type === "regular"
                        ? "常態課程"
                        : "限定課程"}
                    </span>

                    <span className="rounded-full bg-[#FAF7F2] px-3 py-1 text-xs font-bold text-slate-700">
                      {courseName}
                    </span>

                    {type === "regular" &&
                      planName && (
                        <span className="rounded-full bg-[#FAF7F2] px-3 py-1 text-xs font-bold text-slate-500">
                          {planName}
                        </span>
                      )}
                  </div>

                  <div className="flex flex-col justify-between gap-6 md:flex-row">

                    {/* 左側資料 */}

                    <div>
                      <h2 className="text-2xl font-black text-[#8B1E2D]">
                        👩 {item.parent_name}
                      </h2>

                      <div className="mt-4 space-y-2 text-slate-600">
                        <p>
                          👧 小朋友：
                          {item.child_name ||
                            "未填寫"}
                        </p>

                        <p>
                          📞 {item.phone}
                        </p>

                        <p>
                          📚 {courseName}
                        </p>

                        <p>
                          📅 {item.schedule}
                        </p>

                        {type === "regular" &&
                          planName && (
                            <p>
                              🎟 {planName}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* 金額 */}

                    <div className="md:text-right">
                      <p className="text-sm text-slate-500">
                        總金額
                      </p>

                      <p className="mt-1 text-3xl font-black text-[#8B1E2D]">
                        NT${" "}
                        {Number(
                          item.total_price || 0
                        ).toLocaleString(
                          "zh-TW"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* 父親節限定資訊 */}

                  {item.courses?.cover_title ===
                    "father" && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full bg-[#FAF7F2] px-4 py-2 text-sm">
                        {item.polaroid
                          ? "📸 已加購拍立得"
                          : "📸 未加購拍立得"}
                      </span>

                      <span className="rounded-full bg-[#FAF7F2] px-4 py-2 text-sm">
                        {item.extra_person
                          ? "👨‍👩‍👧 多一位同行"
                          : "👨‍👩‍👧 1 大 1 小"}
                      </span>
                    </div>
                  )}

                  {/* 狀態 */}

                  <div className="mt-6">
                    <span
                      className={`inline-flex rounded-full px-5 py-2 text-sm font-bold text-white ${
                        item.payment_status ===
                        "待付款"
                          ? "bg-orange-500"
                          : item.payment_status ===
                            "已付款"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.payment_status}
                    </span>
                  </div>

                  {/* 操作 */}

                  <div className="mt-6 flex flex-wrap gap-3">

                    {item.payment_status !==
                      "已付款" &&
                      item.payment_status !==
                        "已取消" && (
                        <button
                          type="button"
                          onClick={() =>
                            confirmPayment(
                              item.id
                            )
                          }
                          className="rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                          ✓ 確認付款
                        </button>
                      )}

                    {item.payment_status ===
                      "已付款" && (
                      <button
                        type="button"
                        onClick={() =>
                          markPending(item.id)
                        }
                        className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                      >
                        ↺ 改回待付款
                      </button>
                    )}

                    {item.payment_status !==
                    "已取消" ? (
                      <button
                        type="button"
                        onClick={() =>
                          cancelRegistration(
                            item
                          )
                        }
                        className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        ✕ 取消報名
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          restoreRegistration(
                            item
                          )
                        }
                        className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        ↩ 恢復報名
                      </button>
                    )}

                  </div>

                  {/* 報名時間 */}

                  <p className="mt-6 border-t border-[#EEE7E2] pt-4 text-xs text-slate-400">
                    報名時間：
                    {new Date(
                      item.created_at
                    ).toLocaleString("zh-TW")}
                  </p>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}