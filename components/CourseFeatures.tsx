type Props = {
  courseInfo: {
    cover_title: string | null;
  } | null;
};

export default function CourseFeatures({
  courseInfo,
}: Props) {
  if (!courseInfo) return null;

  if (courseInfo.cover_title === "father") {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-black text-slate-900">
          課程介紹
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow">
            <div className="text-5xl">👨‍👧</div>

            <h3 className="mt-6 text-3xl font-bold">
              親子共同創作
            </h3>

            <p className="mt-5 text-xl leading-9 text-slate-600">
              陪伴孩子一起完成專屬作品，
              留下爸爸節最珍貴的回憶。
            </p>
          </div>

          <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow">
            <div className="text-5xl">💡</div>

            <h3 className="mt-6 text-3xl font-bold">
              專屬爸爸檯燈
            </h3>

            <p className="mt-5 text-xl leading-9 text-slate-600">
              完成後即可帶回真正可以使用的
              爸爸造型檯燈。
            </p>
          </div>

          <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow">
            <div className="text-5xl">🍪</div>

            <h3 className="mt-6 text-3xl font-bold">
              點心與飲品
            </h3>

            <p className="mt-5 text-xl leading-9 text-slate-600">
              課程中提供小點心與飲料，
              讓親子輕鬆享受創作時光。
            </p>
          </div>

          <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow">
            <div className="text-5xl">📸</div>

            <h3 className="mt-6 text-3xl font-bold">
              拍立得紀念組
            </h3>

            <p className="mt-5 text-xl leading-9 text-slate-600">
              可加購拍立得與手作封套，
              收藏爸爸節最溫暖的回憶。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-slate-900">
        課程介紹
      </h2>

      <div className="rounded-3xl bg-[#FAF7F2] p-8 shadow">
        <div className="text-5xl">🌊</div>

        <h3 className="mt-6 text-3xl font-bold">
          海洋黏土磁鐵創作
        </h3>

        <p className="mt-5 text-xl leading-9 text-slate-600">
          六週完成海洋磁鐵與專屬磁鐵板，
          從捏塑到彩繪，打造自己的海底世界。
        </p>
      </div>
    </div>
  );
}