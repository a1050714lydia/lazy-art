type ScheduleProps = {
  onSelect: (schedule: string) => void;
};

const schedules = [
  {
    date: "7/13（一）",
    time: "14:30－17:00",
  },
  {
    date: "7/14（二）",
    time: "09:30－12:00",
  },
  {
    date: "7/15（三）",
    time: "14:30－17:00",
  },
  {
    date: "7/16（四）",
    time: "09:30－12:00",
  },
  {
    date: "7/17（五）",
    time: "09:30－12:00",
  },
  {
    date: "7/18（六）",
    time: "14:30－17:00",
  },
];

export default function Schedule({ onSelect }: ScheduleProps) {
  return (
    <section
      id="schedule"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.25em] text-[#8B1E2D] font-semibold">
            Schedule
          </p>

          <h2 className="mt-5 text-5xl font-black text-[#8B1E2D]">
            活動梯次
          </h2>

          <p className="mt-6 text-xl text-slate-600">
            每梯僅招收 <strong>5 組家庭</strong>，
            名額有限，依完成付款順序保留。
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {schedules.map((item) => (
            <div
              key={item.date}
              className="rounded-[30px] border border-[#E8D7D9] bg-[#FAF7F2] p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-3xl font-bold text-[#8B1E2D]">
                {item.date}
              </h3>

              <p className="mt-5 text-lg text-slate-600">
                {item.time}
              </p>

              <button
                onClick={() => {
                  onSelect(`${item.date}　${item.time}`);

                  document
                    .getElementById("signup")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="mt-8 rounded-full bg-[#8B1E2D] px-8 py-3 text-white transition hover:bg-[#721825]"
              >
                我要報名
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}