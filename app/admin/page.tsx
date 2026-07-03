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
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setList(data || []);
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] p-10">

      <h1 className="text-4xl font-black text-[#8B1E2D]">
        Lazy Art 管理後台
      </h1>

      <p className="mt-2 text-slate-500">
        共有 {list.length} 筆報名
      </p>

      <div className="mt-10 space-y-6">

        {list.map((item) => (

          <div
            key={item.id}
            className="rounded-3xl bg-white p-8 shadow"
          >

            <h2 className="text-2xl font-bold text-[#8B1E2D]">
              {item.parent_name}
            </h2>

            <p className="mt-2">
              👧 {item.child_name}
            </p>

            <p>
              📞 {item.phone}
            </p>

            <p>
              📅 {item.schedule}
            </p>

            <p>
              💰 NT${item.total_price}
            </p>

            <p>
              📸 {item.polaroid ? "有加購" : "無"}
            </p>

            <p>
              👨 {item.extra_person ? "多一位同行" : "無"}
            </p>

            <p className="mt-4 font-bold">
              {item.payment_status}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}