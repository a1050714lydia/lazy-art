import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Lazy Art"
            width={66}
            height={66}
            priority
          />

          <div><h1 className="text-4xl font-black text-[#8B1E2D]">
              Lazy Art
            </h1>
<p className="text-[#8B1E2D]/80 text-sm font-medium">
  懶畫得室
</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 font-medium text-slate-700">
          <a href="#about">品牌</a>
          <a href="#classroom">教室</a>
          <a href="#course">課程</a>
          <a href="#signup">報名</a>
        </nav>
      </div>
    </header>
  );
}