"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  created_at: string;
  schedule: string;
  parent_name: string;
  phone: string;
  child_name: string;
  polaroid: boolean;
  extra_person: boolean;
  total_price: number;
  payment_status: string;
};

export default function AdminPage() {
  const [list, setList] = useState<Registration[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setList(data || []);
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
      alert("更新失敗");
      console.error(error);
      return;
    }

    loadData();
  }

  async function cancelRegistration(id: string) {
    if (!confirm("確定取消這筆報名？")) return;

    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: "已取消",
        paid: false,
      })
      .eq("id", id);

    if (error) {
      alert("取消失敗");
      console.error(error);
      return;
    }

    loadData();
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] p-10">

      <h1 className="text-5xl font-black text-[#8B1E2D]">
        Lazy Art 管理後台
      </h1>

      <p className="mt-3 text-slate-500">
        共 {list.length} 筆報名
      </p>

      <div className="mt-10 space-y-6">
      {list.map((item) => (

  <div
    key={item.id}
    className="rounded-3xl border border-[#E8D7D9] bg-white p-8 shadow-lg"
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

      </div>

      <div className="text-right">

        <p className="text-sm text-slate-500">
          總金額
        </p>

        <p className="mt-1 text-3xl font-black text-[#8B1E2D]">
          NT${item.total_price}
        </p>

      </div>

    </div>

    <div className="mt-6 flex flex-wrap gap-3">

      <span className="rounded-full bg-[#FAF7F2] px-4 py-2">
        {item.polaroid ? "📸 已加購拍立得" : "📸 未加購"}
      </span>

      <span className="rounded-full bg-[#FAF7F2] px-4 py-2">
        {item.extra_person ? "👨‍👩‍👧 多一位同行" : "👨‍👩‍👧 1 大 1 小"}
      </span>

    </div>

    <div className="mt-6">      {item.payment_status === "未付款" && (
        <p className="text-xl font-bold text-orange-500">
          🟠 待付款
        </p>
      )}

      {item.payment_status === "已付款" && (
        <p className="text-xl font-bold text-green-600">
          🟢 已付款
        </p>
      )}

      {item.payment_status === "已取消" && (
        <p className="text-xl font-bold text-red-600">
          🔴 已取消
        </p>
      )}

    </div>

    {item.payment_status === "未付款" && (

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() => confirmPayment(item.id)}
          className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          ✓ 確認付款
        </button>

        <button
          onClick={() => cancelRegistration(item.id)}
          className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          ✕ 取消報名
        </button>

      </div>

    )}

    </div>

))}

</div>

</main>
  );
}
    