type Props = {
  courseInfo: {
    cover_title: string | null;
  } | null;

  price: number;
  totalPrice: number;

  extraPerson: boolean;
  polaroid: boolean;

  remaining: number;
  loading: boolean;

  handleSubmit: () => void;
};

export default function PriceCard({
  courseInfo,
  price,
  totalPrice,
  extraPerson,
  polaroid,
  remaining,
  loading,
  handleSubmit,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="rounded-[28px] bg-[#FAF7F2] p-8 shadow-sm border border-[#EFE5DE]">
        <h3 className="mb-8 text-3xl font-black text-[#8B1E2D]">
          課程費用
        </h3>

        <div className="space-y-5 text-lg">
          <div className="flex items-center justify-between">
            <span>課程費</span>
            <span className="font-semibold">
              NT${price}
            </span>
          </div>

          {courseInfo?.cover_title === "father" && (
            <div className="flex items-center justify-between">
              <span>多一位同行</span>

              <span
                className={
                  extraPerson
                    ? "font-semibold"
                    : "text-gray-400"
                }
              >
                {extraPerson ? "NT$500" : "—"}
              </span>
            </div>
          )}

          {courseInfo?.cover_title === "father" && (
            <div className="flex items-center justify-between">
              <span>拍立得紀念組</span>

              <span
                className={
                  polaroid
                    ? "font-semibold"
                    : "text-gray-400"
                }
              >
                {polaroid ? "NT$150" : "—"}
              </span>
            </div>
          )}

          <div className="my-3 border-t border-dashed" />

          <div className="flex items-center justify-between text-2xl font-black text-[#8B1E2D]">
            <span>總金額</span>

            <span>NT${totalPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || remaining <= 0}
        className="w-full rounded-full bg-[#8B1E2D] py-5 text-xl font-bold text-white transition hover:bg-[#741827] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading
          ? "送出中..."
          : remaining <= 0
          ? "已額滿"
          : "立即報名"}
      </button>
    </div>
  );
}