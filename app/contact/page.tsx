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

            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📍 畫室地址
              </h2>

              <p className="mt-3 text-slate-600 leading-8">
                台北市中山區龍江路209巷17號2樓
              </p>
            </div>

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

            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📸 Instagram
              </h2>

              <p className="mt-3 text-slate-600 leading-8">
                @lazyart_us
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                📧 Email
              </h2>

              <p className="mt-3 text-slate-600 leading-8">
                lazyartus@gmail.com
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D]">
                🕒 營業時間
              </h2>

              <p className="mt-3 text-slate-600 leading-8">
                採預約制<br />
                歡迎先透過 LINE 或 Instagram 預約。
              </p>
            </div>

            {/* Google 地圖 */}
            <div>
              <h2 className="text-xl font-bold text-[#8B1E2D] mb-4">
                🗺️ 地圖位置
              </h2>

              <div className="overflow-hidden rounded-3xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=台北市中山區龍江路&output=embed"
                  width="100%"
                  height="350"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            </div>

            {/* 按鈕 */}
            <div className="pt-4">

              <Link
                href="/signup"
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