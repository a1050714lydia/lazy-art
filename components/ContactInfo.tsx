export default function ContactInfo() {
  return (
    <div className="mt-12 rounded-[36px] bg-white p-10 shadow-xl">
      <h3 className="text-2xl font-bold text-[#8B1E2D]">
        聯絡資訊
      </h3>

      <div className="mt-8 space-y-8">
        <div>
          <p className="text-lg font-semibold text-[#8B1E2D]">
            📍 上課地點
          </p>

          <p className="mt-3 text-slate-600">
            台北市中山區龍江路209巷17號2樓
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-[#8B1E2D]">
            💬 官方 LINE
          </p>

          <p className="mt-3 text-slate-600">
            @lazyart
          </p>

          <a
            href="https://lin.ee/sQ3gXXg"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#721825]"
          >
            加入官方 LINE
          </a>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            報名完成後，我們將透過官方 LINE
            與您確認付款方式、保留名額及課程通知。
          </p>
        </div>
      </div>
    </div>
  );
}