import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 bg-[#FCFAF8] min-h-screen">
        <section className="max-w-5xl mx-auto px-6 py-16">
          {/* 標題 */}
          <div className="text-center">
            <p className="uppercase tracking-[0.3em] text-[#8B1E2D] font-semibold">
              CONTACT
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-black text-[#8B1E2D]">
              聯絡我們
            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-8">
              如果有任何課程問題、報名相關或合作邀約，
              <br className="hidden md:block" />
              歡迎透過以下方式與我們聯繫。
            </p>
          </div>

          {/* 聯絡資訊 */}
          <div className="mt-16 rounded-[36px] bg-white shadow-xl p-8 md:p-12 space-y-10">

            {/* 地址 */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📍 畫室地址
              </h2>

              <a
                href="https://maps.google.com/?cid=17909403056208662334"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-slate-600 leading-8 hover:text-[#8B1E2D] hover:underline transition"
              >
                台北市中山區龍江路209巷17號2樓
              </a>
            </div>

            {/* LINE */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📱 LINE 官方
              </h2>

              <p className="mt-3 text-slate-600">
                有任何課程問題或報名需求，
                歡迎加入官方 LINE 與我們聯繫。
              </p>

              <a
                href="https://lin.ee/sQ3gXXg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-5 rounded-full bg-[#06C755] px-8 py-3 text-white font-semibold hover:opacity-90 transition"
              >
                加入官方 LINE
              </a>
            </div>

            {/* IG */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📸 Instagram
              </h2>

              <a
                href="https://www.instagram.com/lazyart_us"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-slate-600 hover:text-[#8B1E2D] hover:underline transition"
              >
                @lazyart_us
              </a>
            </div>

            {/* Email */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📧 Email
              </h2>

              <a
                href="mailto:lazyartus@gmail.com"
                className="mt-3 inline-block text-slate-600 hover:text-[#8B1E2D] hover:underline transition"
              >
                lazyartus@gmail.com
              </a>
            </div>

            {/* 營業時間 */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                🕒 營業時間
              </h2>

              <p className="mt-3 text-slate-600 leading-8">
                採預約制
                <br />
                歡迎先透過 LINE 或 Instagram 預約。
              </p>
            </div>

            {/* Google 地圖 */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D] mb-4">
                🗺️ 地圖位置
              </h2>

              <div className="overflow-hidden rounded-3xl shadow-xl border border-[#E8E2DD]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7228.902706281145!2d121.53155804150845!3d25.052686780703254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd02bf948ad%3A0xf88d117cc943af3e!2z5oe25b6X55Wr5a6kIExhenkgQXJ0!5e0!3m2!1szh-TW!2stw!4v1783234406738!5m2!1szh-TW!2stw"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <a
                href="https://maps.google.com/?cid=17909403056208662334"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-5 rounded-full border-2 border-[#8B1E2D] px-8 py-3 font-semibold text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
              >
                📍 在 Google 地圖開啟
              </a>
            </div>

            {/* 報名按鈕 */}
            <div className="pt-4">
              <Link
   href="/schedule"
                className="block w-full rounded-full bg-[#8B1E2D] py-5 text-center text-xl font-bold text-white transition hover:bg-[#721825]"
              >
                立即報名 →
              </Link>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}