type Props = {
  courseTitle: string;
  scheduleTitle: string;
  scheduleTime: string;
  remaining: number;
};

export default function CourseSummary({
  courseTitle,
  scheduleTitle,
  scheduleTime,
  remaining,
}: Props) {
  const lines = scheduleTime.split("\n");

  return (
    <div className="rounded-3xl border border-[#E6D5D7] bg-[#FAF7F2] p-10">
      <h3 className="text-4xl font-black text-[#8B1E2D]">
        已選擇課程
      </h3>

      <div className="mt-10 grid grid-cols-[120px_1fr] gap-y-7">
        <p className="text-2xl text-slate-500">課程</p>

        <p className="text-right text-3xl font-bold">
          {courseTitle}
        </p>

        <p className="text-2xl text-slate-500">梯次</p>

        <p className="text-right text-3xl font-bold">
          {scheduleTitle}
        </p>

        <p className="text-2xl text-slate-500">
          上課時間
        </p>

        <div className="text-right">
          <p className="text-3xl font-bold">
            {lines[0] || "-"}
          </p>

          {lines[1] && (
            <p className="mt-2 text-2xl font-semibold">
              {lines[1]}
            </p>
          )}
        </div>

        <p className="text-2xl text-slate-500">
          剩餘名額
        </p>

        <p
          className={`text-right text-3xl font-black ${
            remaining > 3
              ? "text-green-600"
              : remaining > 0
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {remaining} 組
        
        </p>
      </div>
    </div>
  );
}