import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#FCFAF8] via-[#F8F4EF] to-[#F6F2EC]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-24 pb-16 md:px-6 md:pt-36 md:pb-20 lg:grid-cols-[1.15fr_0.85fr]">

        {/* 圖片 */}
        <div className="relative order-1 flex flex-col items-center lg:order-2">
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 md:text-lg">
            LAZY ART × FATHER'S DAY
          </p>

          <div className="pointer-events-none absolute top-20 h-72 w-72 rounded-full bg-[#8B1E2D]/10 blur-3xl md:h-96 md:w-96" />

          <Image
            src="/images/hero/lamp.png"
            alt="爸爸節親子檯燈"
            width={550}
            height={750}
            priority
            sizes="(max-width:768px) 340px, 550px"
            className="pointer-events-none relative w-full max-w-[340px] rounded-[28px] shadow-2xl md:max-w-md"
          />
        </div>

        {/* 文字 */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="inline-block rounded-full bg-[#F7E8EA] px-5 py-2 text-xs font-semibold tracking-wider text-[#8B1E2D] md:text-sm">
            FATHER'S DAY SPECIAL
          </span>

          <p className="mt-6 hidden text-lg font-semibold uppercase tracking-[0.25em] text-slate-500 lg:block">
            LAZY ART × FATHER'S DAY
          </p>

          <h2 className="mt-5 text-[30px] font-black leading-tight text-slate-900 sm:text-[34px] md:text-5xl lg:text-6xl">
            讓爸爸一直「罩」著你。
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-xl md:leading-9 lg:mx-0">
            親手完成一盞專屬爸爸的檯燈，
            <br className="hidden md:block" />
            不只是送一份禮物，
            <br className="hidden md:block" />
            更是留下一段今年爸爸節最溫暖的親子回憶。
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/course"
              prefetch={false}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#721825] sm:w-auto"
            >
              立即報名 →
            </Link>

            <Link
              href="/course"
              prefetch={false}
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#8B1E2D] px-10 py-4 text-lg font-semibold text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white sm:w-auto"
            >
              了解課程
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}