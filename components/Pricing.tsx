export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-28 bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.25em] text-[#8B1E2D] font-semibold">
            Father's Day Workshop
          </p>

          <h2 className="text-5xl font-black mt-5 text-[#8B1E2D]">
            爸爸節限定課程
          </h2>

          <p className="text-slate-600 text-xl mt-6">
            一場屬於爸爸與孩子的創作時光，
            完成後帶回一盞充滿回憶的專屬檯燈。
          </p>

        </div>

        <div className="mt-16 bg-white rounded-[40px] shadow-xl p-12">

          <div className="grid lg:grid-cols-2 gap-14">

            {/* 左側 */}
            <div>

              <h3 className="text-3xl font-bold text-[#8B1E2D]">
                課程內容
              </h3>

              <div className="mt-8 space-y-5 text-lg">

                <p>👨‍👧 1 大 1 小</p>

                <p>⏰ 2.5 小時</p>

                <p>🎨 爸爸造型檯燈製作</p>

                <p>🖌 壓克力彩繪創作</p>

                <p>☕ 點心、飲品</p>

                <p>🎁 完成即可帶回作品</p>

                <p>📸 拍立得紀念組可加購 NT$150</p>

              </div>

            </div>

            {/* 右側 */}
            <div className="bg-[#FAF7F2] rounded-3xl p-10">

              <div className="text-[#8B1E2D] font-bold">
                EARLY BIRD
              </div>

              <div className="mt-5">

                <span className="text-6xl font-black text-[#8B1E2D]">
                  NT$1880
                </span>

                <span className="text-xl text-slate-500 ml-3">
                  / 前五組
                </span>

              </div>

              <p className="line-through text-slate-400 mt-4">
                原價 NT$2280
              </p>

              <a
                href="#signup"
                className="mt-10 block w-full rounded-full bg-[#8B1E2D] py-5 text-center text-xl font-bold text-white transition hover:bg-[#721825]"
              >
                立即報名
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}