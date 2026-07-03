"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto h-20 md:h-24 px-5 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

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

            <p className="mt-1 text-xs tracking-wide text-[#8B1E2D]/80">
              懶畫得室
            </p>
          </div>

        </Link>

        {/* 電腦版 */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-700">

          <Link href="/about" className="hover:text-[#8B1E2D] transition">
            關於畫室
          </Link>

          <Link href="/classroom" className="hover:text-[#8B1E2D] transition">
            教室環境
          </Link>

          <Link href="/course" className="hover:text-[#8B1E2D] transition">
            課程介紹
          </Link>

          <Link href="/schedule" className="hover:text-[#8B1E2D] transition">
            課程梯次
          </Link>

          <Link href="/contact" className="hover:text-[#8B1E2D] transition">
            聯絡我們
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#8B1E2D] px-6 py-3 text-white hover:bg-[#721825] transition"
          >
            立即報名
          </Link>

        </nav>

        {/* 手機版 */}
        <div className="flex lg:hidden items-center gap-3">

          <Link
            href="/signup"
            className="rounded-full bg-[#8B1E2D] px-4 py-2 text-sm font-semibold text-white"
          >
            報名
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-[#8B1E2D]"
          >
            ☰
          </button>

        </div>

      </div>

      {/* 手機展開選單 */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">

          <nav className="flex flex-col py-4">

            <Link
              href="/about"
              className="px-6 py-3 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              關於畫室
            </Link>

            <Link
              href="/classroom"
              className="px-6 py-3 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              教室環境
            </Link>

            <Link
              href="/course"
              className="px-6 py-3 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              課程介紹
            </Link>

            <Link
              href="/schedule"
              className="px-6 py-3 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              課程梯次
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              聯絡我們
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}