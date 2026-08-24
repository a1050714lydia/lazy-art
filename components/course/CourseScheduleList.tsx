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
      <div className="rounded-[32px] border border-[#E8D7D9] bg-[#FAF7F2] p-8 md:p-10">

        <h2 className="text-3xl font-black text-[#8B1E2D]">
          可報名日期
        </h2>

        <p className="mt-3 text-slate-500">
          以下為本期課程日期，實際上課日期於報名時選擇
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {schedules.map((schedule) => {
            const date = new Date(schedule.class_date);

            const dateText = `${date.getMonth() + 1}/${date.getDate()}（${
              week[date.getDay()]
            }）`;

            const full = schedule.remaining <= 0;

            return (
              <div
                key={schedule.id}
                className={`rounded-2xl border px-5 py-4 ${
                  full
                    ? "border-gray-200 bg-gray-100"
                    : "border-[#E5DDD7] bg-white"
                }`}
              >
                <p
                  className={`text-xl font-bold ${
                    full ? "text-gray-400" : "text-[#8B1E2D]"
                  }`}
                >
                  {dateText}
                </p>

                <p
                  className={`mt-1 text-sm ${
                    full ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  {schedule.start_time.slice(0, 5)}－
                  {schedule.end_time.slice(0, 5)}
                </p>

                {full && (
                  <p className="mt-2 text-sm font-semibold text-red-500">
                    已額滿
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-slate-500">
            單堂、兩堂或四堂皆可報名，日期可於下一步自由選擇。
          </p>

          <Link
            href="/schedule"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#8B1E2D] px-9 py-4 font-semibold text-white transition hover:bg-[#731827]"
          >
            立即報名
          </Link>
        </div>

      </div>
    </section>
  );
}