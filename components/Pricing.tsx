import Link from "next/link";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-[#FAF7F2]"
    >
      <div className="max-w-5xl mx-auto px-5">

        {/* 標題 */}
        <div className="text-center">
          <p className="uppercase tracking-[0.22em] text-[#8B1E2D] font-semibold">
            Father's Day Workshop
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#8B1E2D]">
            父親節限定課程
          </h2>

          <p className="mt-5 text-base md:text-lg text-slate-600 leading-8">
            一場屬於爸爸與孩子的創作時光，
            <br />
            完成後帶回一盞充滿回憶的專屬檯燈。
          </p>
        </div>

        {/* 卡片 */}
        <div className="mt-14 max-w-3xl mx-auto rounded-[36px] bg-white p-8 md:p-10 shadow-xl">

          {/* 課程內容 */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#8B1E2D]">
              課程內容
            </h3>

            <div className="mt-6 space-y-4 text-lg">
              <p>👨‍👧 1 大 1 小</p>
              <p>⏰ 2.5 小時</p>
              <p>🎨 爸爸造型檯燈製作</p>
              <p>🖌 壓克力彩繪創作</p>
              <p>☕ 點心、飲品</p>
              <p>🎁 完成即可帶回作品</p>
              <p>📸 拍立得紀念組加購 NT$150</p>
            </div>
          </div>

          {/* 分隔線 */}
          <div className="my-10 border-t border-[#EADFD6]" />

          {/* 價格 */}
          <div className="text-center">

            <p className="text-xl font-bold text-[#8B1E2D]">
              EARLY BIRD
            </p>

            <div className="mt-4 flex flex-wrap items-end justify-center gap-2">
              <span className="text-5xl md:text-6xl font-black text-[#8B1E2D]">
                NT$1880
              </span>

              <span className="mb-2 text-xl text-slate-500">
                / 前五組
              </span>
            </div>

            <p className="mt-3 text-lg text-slate-400 line-through">
              原價 NT$2280
            </p>

            <div className="mt-8">
              <Link
                href="/signup"
                prefetch={false}
                className="block w-full rounded-full bg-[#8B1E2D] py-4 text-center text-lg font-bold text-white transition duration-300 hover:bg-[#721825]"
              >
                立即報名
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}