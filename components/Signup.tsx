"use client";

import { useEffect, useState } from "react";
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

  // 加購
  const [extraPerson, setExtraPerson] = useState(false);
  const [polaroid, setPolaroid] = useState(false);

  // 價格
  const [price, setPrice] = useState(2280);
  const [totalPrice, setTotalPrice] = useState(2280);

  const [loading, setLoading] = useState(false);

  // 前五組早鳥
  useEffect(() => {
    loadPrice();
  }, []);

  // 自動算總金額
  useEffect(() => {
    setTotalPrice(
      price +
      (extraPerson ? 500 : 0) +
      (polaroid ? 150 : 0)
    );
  }, [price, extraPerson, polaroid]);

  async function loadPrice() {

    const { count, error } = await supabase
      .from("registrations")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    if ((count ?? 0) < 5) {
      setPrice(1880);
    } else {
      setPrice(2280);
    }

  }

  const handleSubmit = async () => {

    if (!selectedSchedule) {
      alert("請先選擇活動梯次");
      return;
    }

    if (!parentName || !phone || !childName) {
      alert("請填寫完整資料");
      return;
    }
// 再確認梯次是否額滿（只計算已付款）
const { count: scheduleCount, error: scheduleError } = await supabase
  .from("registrations")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("schedule", selectedSchedule)
  .eq("payment_status", "已付款");

if (scheduleError) {
  console.error(scheduleError);
  alert("無法確認梯次名額");
  return;
}

if ((scheduleCount ?? 0) >= 5) {
  alert("❌ 此梯次已額滿，請選擇其他時段。");
  return;
}
    setLoading(true);

    const { error } = await supabase
      .from("registrations")
      .insert([
        {
          schedule: selectedSchedule,

          parent_name: parentName,

          phone,

          line_id: lineId,

          child_name: childName,

          note,

          extra_person: extraPerson,

          polaroid,

          price,

          total_price: totalPrice,

          payment_status: "未付款",
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);

      alert(error.message);

      return;
    }

    alert(`🎉 報名成功！

梯次：
${selectedSchedule}

課程費：
NT$${price}

多一位同行：
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

    await loadPrice();
    window.location.reload();
  };

  return (
    <section
      id="signup"
      className="py-28 bg-[#FAF7F2]"
    >
      <div className="max-w-3xl mx-auto px-6">

        {/* 標題 */}
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

          {/* 梯次 */}
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

          {/* 家長姓名 */}
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

          {/* 電話 */}
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

          {/* LINE */}
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

          {/* 小朋友 */}
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

          {/* 多一位同行 */}
          <div>

            <label className="mb-3 block font-semibold">
              加購人數
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#E5D6D8] p-5">

              <input
                type="checkbox"
                checked={extraPerson}
                onChange={(e) => setExtraPerson(e.target.checked)}
                className="h-5 w-5"
              />

              <div>

                <p className="font-semibold">
                  👨‍👩‍👧 多一位同行 ＋ NT$500
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  再增加一位家人一起參與課程
                </p>

              </div>

            </label>

          </div>
                    {/* 拍立得 */}
          <div>

            <label className="mb-3 block font-semibold">
              拍立得紀念組
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#E5D6D8] p-5">

              <input
                type="checkbox"
                checked={polaroid}
                onChange={(e) => setPolaroid(e.target.checked)}
                className="h-5 w-5"
              />

              <div>

                <p className="font-semibold">
                  📸 加購拍立得紀念組 ＋ NT$150
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  拍立得照片 1 張＋親手製作拍立得紀念封套
                </p>

              </div>

            </label>

          </div>

          {/* 備註 */}
          <div>

            <label className="mb-2 block font-semibold">
              備註
            </label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例如：食物過敏、特殊需求..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          {/* 金額 */}
          <div className="rounded-2xl bg-[#FAF7F2] p-6">

            <div className="flex justify-between">
              <span>課程費用</span>
              <span>NT${price}</span>
            </div>

            {extraPerson && (
              <div className="mt-3 flex justify-between">
                <span>多一位同行</span>
                <span>NT$500</span>
              </div>
            )}

            {polaroid && (
              <div className="mt-3 flex justify-between">
                <span>拍立得紀念組</span>
                <span>NT$150</span>
              </div>
            )}

            <div className="mt-5 border-t pt-5 flex justify-between text-xl font-bold text-[#8B1E2D]">

              <span>總金額</span>

              <span>NT${totalPrice}</span>

            </div>

          </div>

          {/* 送出 */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full bg-[#8B1E2D] py-5 text-xl font-bold text-white transition hover:bg-[#721825] disabled:bg-gray-400"
          >
            {loading ? "送出中..." : "送出報名"}
          </button>

        </div>

        {/* 聯絡資訊 */}
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
                className="mt-5 inline-block rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#721825]"
              >
                加入官方 LINE
              </a>

              <p className="mt-4 text-sm text-slate-500 leading-7">
                報名完成後，我們將透過官方 LINE
                與您確認付款方式、保留名額及課程通知。
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}