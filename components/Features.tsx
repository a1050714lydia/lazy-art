export default function Features() {
  const features = [
    {
      emoji: "👨‍👧",
      title: "親子共同創作",
      text: "陪伴孩子一起完成專屬作品，留下爸爸節最珍貴的回憶。",
    },
    {
      emoji: "💡",
      title: "專屬爸爸檯燈",
      text: "完成後即可帶回一盞真正可以使用的爸爸造型檯燈。",
    },
    {
      emoji: "🍪",
      title: "點心與飲品",
      text: "創作之餘，一起享受輕鬆愉快的親子時光。",
    },
    {
      emoji: "📸",
      title: "拍立得紀念組",
      text: "可加購拍立得與手作封套，收藏今年爸爸節最溫暖的回憶。",
    },
  ];

  return (
    <section
      id="course"
      className="bg-white py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-amber-500 font-semibold tracking-widest uppercase">
            Course Features
          </p>

          <h2 className="text-5xl font-black mt-4">
            當期課程特色
          </h2>

          <p className="text-slate-600 mt-6 text-xl">
            一場屬於爸爸與孩子的溫暖創作時光。
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item) => (
            <div
              key={item.title}
              className="bg-[#faf7f2] rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="text-5xl">
                {item.emoji}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-8 mt-4">
                {item.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}