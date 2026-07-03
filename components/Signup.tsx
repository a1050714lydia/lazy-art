"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type SignupProps = {
  selectedSchedule: string;
};

export default function Signup({
  selectedSchedule,
}: SignupProps) {

  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [childName, setChildName] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!selectedSchedule) {
      alert("請先選擇活動梯次");
      return;
    }

    if (!parentName || !phone || !childName) {
      alert("請填寫完整資料");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("registrations")
      .insert([
        {
          schedule: selectedSchedule,
          parent_name: parentName,
          phone: phone,
          line_id: lineId,
          child_name: childName,
          note: note,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("送出失敗");
      return;
    }

    alert("🎉 報名成功！");

    setParentName("");
    setPhone("");
    setLineId("");
    setChildName("");
    setNote("");
  };

  return (
    <section
      id="signup"
      className="py-28 bg-[#FAF7F2]"
    >
      <div className="max-w-3xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.25em] text-[#8B1E2D] font-semibold">
            SIGN UP
          </p>

          <h2 className="mt-5 text-5xl font-black text-[#8B1E2D]">
            立即報名
          </h2>

          <p className="mt-6 text-slate-600 text-xl leading-relaxed">
            填寫以下資料，我們會盡快與您聯繫。
          </p>

        </div>

        <div className="mt-12 rounded-[36px] bg-white p-10 shadow-xl space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-[#8B1E2D]">
              已選擇梯次
            </label>

            <input
              type="text"
              value={selectedSchedule || "請先選擇活動梯次"}
              readOnly
              className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              家長姓名
            </label>

            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="請輸入家長姓名"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              聯絡電話
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xxxxxxxx"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              LINE ID（選填）
            </label>

            <input
              type="text"
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              placeholder="方便聯絡"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              小朋友姓名
            </label>

            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="請輸入小朋友姓名"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              備註
            </label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例如：食物過敏、是否加購拍立得紀念組..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full bg-[#8B1E2D] py-5 text-xl font-bold text-white hover:bg-[#721825] disabled:bg-gray-400"
          >
            {loading ? "送出中..." : "送出報名"}
          </button>

        </div>

        <div className="mt-12 rounded-[36px] bg-white p-10 shadow-xl">

          <h3 className="text-2xl font-bold text-[#8B1E2D]">
            聯絡資訊
          </h3>

          <div className="mt-8 space-y-8">

            <div>

              <p className="text-lg font-semibold text-[#8B1E2D]">
                📍 上課地點
              </p>

              <p className="mt-3 text-slate-600">
                台北市中山區龍江路209巷17號2樓
              </p>

            </div>

            <div>

              <p className="text-lg font-semibold text-[#8B1E2D]">
                💬 官方 LINE
              </p>

              <p className="mt-3 text-slate-600">
                @lazyart
              </p>

              <a
                href="https://lin.ee/sQ3gXXg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-[#8B1E2D] px-8 py-4 text-white font-semibold hover:bg-[#721825]"
              >
                加入官方 LINE
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}