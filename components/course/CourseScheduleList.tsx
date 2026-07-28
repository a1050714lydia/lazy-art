import Link from "next/link";

type Schedule = {
  id: string;
  title: string;
  class_date: string;
  start_time: string;
  end_time: string;
  remaining: number;
  capacity: number;
};

type Props = {
  schedules: Schedule[];
};

export default function CourseScheduleList({
  schedules,
}: Props) {
  if (schedules.length === 0) {
    return (
      <div className="mt-16 rounded-3xl bg-gray-100 p-10 text-center">
        <h3 className="text-2xl font-bold">
          目前沒有可報名梯次
        </h3>

        <p className="mt-3 text-slate-500">
          敬請期待下一梯次。
        </p>
      </div>
    );
  }

  const week = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <section id="schedule" className="mt-20">
      <h2 className="text-3xl font-black text-slate-900">
        可報名梯次
      </h2>

      <div className="mt-8 space-y-6">
        {schedules.map((schedule) => {
          const date = new Date(schedule.class_date);

          const dateText = `${date.getMonth() + 1}/${date.getDate()}（${
            week[date.getDay()]
          }）`;

          const full = schedule.remaining <= 0;
          const lastOne = schedule.remaining === 1;

          return (
            <div
              key={schedule.id}
              className={`rounded-3xl border p-8 transition ${
                full
                  ? "border-gray-200 bg-gray-100"
                  : "border-[#E8D7D9] bg-white shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#8B1E2D]">
                    {dateText}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    🕒 {schedule.start_time.slice(0, 5)}－
                    {schedule.end_time.slice(0, 5)}
                  </p>

                  {full ? (
                    <p className="mt-4 text-2xl font-bold text-red-600">
                      🔴 已額滿
                    </p>
                  ) : (
                    <>
                 <p className="mt-4 text-sm text-slate-500">
  剩餘名額
</p>

<p className="text-3xl font-bold text-green-600">
  {schedule.remaining} 組
</p>
                    </>
                  )}
                </div>

                {full ? (
                  <button
                    disabled
                    className="cursor-not-allowed rounded-full bg-gray-400 px-8 py-4 font-semibold text-white"
                  >
                    已額滿
                  </button>
                ) : (
                  <Link
                    href={`/schedule?schedule=${schedule.id}`}
                    className="rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#731827]"
                  >
                    {lastOne ? "🔥 最後 1 組" : "立即報名"}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}