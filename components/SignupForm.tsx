"use client";
type Course = {
  cover_title: string | null;
};

type Props = {
  courseInfo: Course | null;
  courseTitle: string;

  parentName: string;
  setParentName: (v: string) => void;

  phone: string;
  setPhone: (v: string) => void;

  lineId: string;
  setLineId: (v: string) => void;

  childName: string;
  setChildName: (v: string) => void;

  note: string;
  setNote: (v: string) => void;

  extraPerson: boolean;
  setExtraPerson: (v: boolean) => void;

  polaroid: boolean;
  setPolaroid: (v: boolean) => void;
};

export default function SignupForm({
  courseInfo,
  courseTitle,

  parentName,
  setParentName,

  phone,
  setPhone,

  lineId,
  setLineId,

  childName,
  setChildName,

  note,
  setNote,

  extraPerson,
  setExtraPerson,

  polaroid,
  setPolaroid,
}: Props) {
  return (
    <div className="space-y-8">
      {/* 家長姓名 */}
      <div>
        <label className="mb-2 block font-semibold">
          家長姓名
        </label>

        <input
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          placeholder="請輸入家長姓名"
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>

      {/* 電話 */}
      <div>
        <label className="mb-2 block font-semibold">
          聯絡電話
        </label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="09xxxxxxxx"
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>

      {/* LINE */}
      <div>
        <label className="mb-2 block font-semibold">
          LINE ID（選填）
        </label>

        <input
          type="text"
          value={lineId}
          onChange={(e) => setLineId(e.target.value)}
          placeholder="方便聯絡"
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>

      {/* 小朋友姓名 */}
      <div>
        <label className="mb-2 block font-semibold">
          小朋友姓名
        </label>

        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="請輸入小朋友姓名"
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>

{/* 父親節課程專屬 */}
{courseInfo?.cover_title === "father" && (
  <>
    {/* 多一位同行 */}
    <div className="space-y-4">
      <label className="block text-xl font-bold">
        多一位同行（選填）
      </label>

      <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setExtraPerson(false)}
          className={`h-36 rounded-3xl border-2 transition ${
            !extraPerson
              ? "border-[#8B1E2D] bg-[#8B1E2D] text-white"
              : "border-gray-300 bg-white hover:border-[#8B1E2D]"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl font-bold">不需要</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setExtraPerson(true)}
          className={`h-36 rounded-3xl border-2 transition ${
            extraPerson
              ? "border-[#8B1E2D] bg-[#8B1E2D] text-white"
              : "border-gray-300 bg-white hover:border-[#8B1E2D]"
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span className="text-3xl font-black">+ NT$500</span>
            <span className="mt-2 text-lg">多一位同行</span>
          </div>
        </button>
      </div>
    </div>

    {/* 加購拍立得 */}
    <div className="space-y-4">
      <label className="block text-xl font-bold">
        加購拍立得（選填）
      </label>

      <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setPolaroid(false)}
          className={`h-36 rounded-3xl border-2 transition ${
            !polaroid
              ? "border-[#8B1E2D] bg-[#8B1E2D] text-white"
              : "border-gray-300 bg-white hover:border-[#8B1E2D]"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl font-bold">不需要</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setPolaroid(true)}
          className={`h-36 rounded-3xl border-2 transition ${
            polaroid
              ? "border-[#8B1E2D] bg-[#8B1E2D] text-white"
              : "border-gray-300 bg-white hover:border-[#8B1E2D]"
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span className="text-3xl font-black">+ NT$150</span>
            <span className="mt-2 text-lg">拍立得紀念照</span>
          </div>
        </button>
      </div>
    </div>
  </>
)}

      {/* 過敏食物／其他備註 */}
      <div>
        <label className="mb-2 block font-semibold">
          過敏食物／其他備註（選填）
        </label>

        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="例如：花生過敏、牛奶過敏、特殊需求、其他想告知老師的事項..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
 </div>
  </div>

)}
