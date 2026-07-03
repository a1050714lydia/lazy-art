import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#FCFAF8] via-[#F8F4EF] to-[#F6F2EC]">
      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-24 md:pt-36 pb-16 md:pb-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">

        {/* 手機先顯示圖片 */}
        <div className="relative flex justify-center order-1 lg:order-2">

          <div className="absolute h-72 w-72 md:h-96 md:w-96 rounded-full bg-[#8B1E2D]/10 blur-3xl"></div>

          <Image
            src="/images/hero/lamp.png"
            alt="爸爸節親子檯燈"
            width={550}
            height={750}
            priority
            className="relative w-full max-w-[340px] md:max-w-md rounded-[28px] shadow-2xl"
          />

        </div>

        {/* 左側文字 */}
        <div className="order-2 lg:order-1 text-center lg:text-left">

          <span className="inline-block rounded-full bg-[#F7E8EA] px-5 py-2 text-xs md:text-sm font-semibold tracking-wider text-[#8B1E2D]">
            FATHER'S DAY SPECIAL
          </span>

          <p className="mt-6 text-xs md:text-lg font-semibold tracking-[0.22em] uppercase text-slate-500">
            Lazy Art × Father's Day
          </p>

          <h2 className="mt-5 text-[2.7rem] md:text-5xl lg:text-6xl font-black leading-snug text-slate-900">
            讓爸爸一直「罩」著你。
          </h2>

          <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base md:text-xl leading-8 md:leading-9 text-slate-600">
            親手完成一盞專屬爸爸的檯燈，
            <br className="hidden md:block" />
            不只是送一份禮物，
            <br className="hidden md:block" />
            更是留下一段今年爸爸節最溫暖的親子回憶。
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <a
              href="#signup"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#721825]"
            >
              立即報名 →
            </a>

            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-[#8B1E2D] px-10 py-4 text-lg font-semibold text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
            >
              了解課程
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}