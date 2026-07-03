import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 md:h-24 px-5 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0">

          <Image
            src="/images/logo.png"
            alt="Lazy Art"
            width={55}
            height={55}
            priority
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />

          <div>
            <h1 className="text-2xl md:text-3xl font-black leading-none text-[#8B1E2D]">
              Lazy Art
            </h1>

            <p className="mt-1 text-xs tracking-wide text-[#8B1E2D]/80 font-medium">
              懶畫得室
            </p>
          </div>

        </a>

        {/* 桌機版選單 */}
        <nav className="hidden lg:flex items-center gap-8 text-[17px] font-medium text-slate-700">

          <a
            href="#about"
            className="hover:text-[#8B1E2D] transition"
          >
            品牌
          </a>

          <a
            href="#classroom"
            className="hover:text-[#8B1E2D] transition"
          >
            教室
          </a>

          <a
            href="#course"
            className="hover:text-[#8B1E2D] transition"
          >
            課程
          </a>

          <a
            href="#schedule"
            className="hover:text-[#8B1E2D] transition"
          >
            梯次
          </a>

          <a
            href="#signup"
            className="rounded-full bg-[#8B1E2D] px-6 py-3 text-white hover:bg-[#721825] transition"
          >
            立即報名
          </a>

        </nav>

        {/* 手機版 */}
        <div className="flex lg:hidden">
          <a
            href="#signup"
            className="rounded-full bg-[#8B1E2D] px-5 py-2.5 text-sm font-semibold text-white"
          >
            立即報名
          </a>
        </div>

      </div>
    </header>
  );
}