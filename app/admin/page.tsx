"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
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

    const ok = confirm("確定取消這筆報名？");

    if (!ok) return;

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
        {list.map((item) => (

          <div
            key={item.id}
            className="rounded-3xl bg-white p-8 shadow-lg border border-[#EADFD6]"
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#8B1E2D]">
                  👩 {item.parent_name}
                </h2>

                <p className="mt-2 text-slate-600">
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

                <p className="text-2xl font-bold text-[#8B1E2D]">
                  NT${item.total_price}
                </p>

              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-[#FAF7F2] px-4 py-2">
                📸 {item.polaroid ? "拍立得 ✓" : "無拍立得"}
              </span>

              <span className="rounded-full bg-[#FAF7F2] px-4 py-2">
                👨 {item.extra_person ? "多一位同行 ✓" : "1大1小"}
              </span>

            </div>

            <div className="mt-6">

              <p
                className={`text-xl font-bold
                  ${
                    item.payment_status === "已付款"
                      ? "text-green-600"
                      : item.payment_status === "待付款"
                      ? "text-orange-500"
                      : "text-red-600"
                  }
                `}
              >
                {item.payment_status === "已付款" && "🟢 已付款"}
                {item.payment_status === "待付款" && "🟠 待付款"}
                {item.payment_status === "已取消" && "🔴 已取消"}
              </p>

            </div>

            {item.payment_status === "待付款" && (

              <div className="mt-6 flex gap-3">

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
}