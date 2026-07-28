import Image from "next/image";

const teachers = [
  {
    name: "Abby",
    title: "藝術聯想・兒童美術・藝術史啟發",
    image: "/images/teachers/abby.jpg",
    intro:
      "現就讀於國立臺灣師範大學美術碩士班，擅長藝術聯想、圖像分析與繪畫啟發。課程融合水彩、蠟筆、剪紙、壓克力、黏土等多元媒材，透過梵谷、莫內、畢卡索等藝術家的創作，引導孩子培養美感、創造力與藝術素養。",
    tags: ["藝術史", "兒童美術", "水彩", "黏土"],
  },
  {
    name: "Joey",
    title: "兒童美術・黏土創作",
    image: "/images/teachers/joye.jpg",
    intro:
      "畢業於高苑科技大學文化創意數位整合學程，曾任 Otto2 玩具寶貝及 PH7 Studio 繪畫老師。擅長以輕鬆、有趣的教學方式陪伴孩子探索藝術，激發創意與自信。",
    tags: ["兒童美術", "兒童黏土", "創意手作"],
  },
  {
    name: "湯湯",
    title: "進階美術・素描・水彩",
    image: "/images/teachers/tangtang.jpg",
    intro:
      "現就讀於國立臺北藝術大學美術學系，擅長素描、水彩等寫實繪畫，喜歡探索具有光影與透明感的美學風格。希望透過細膩的觀察與創作，帶領學生提升繪畫技巧與美感表現。",
    tags: ["素描", "水彩", "進階美術"],
  },
  {
    name: "蓁蓁",
    title: "兒童美術・科技藝術・新媒體創作",
    image: "/images/teachers/jiazhen.jpg",
    intro:
      "現就讀於國立臺北藝術大學新媒體藝術學系，具兒童與成人美術教學經驗，曾任簡單畫室、新藝向玩藝所及三重國小、重陽國小美術社團老師。擅長結合繪畫、科技藝術與跨媒材創作，引導孩子自由探索、勇於表達，在創作中培養美感、創造力與自信。",
    tags: ["兒童美術", "進階美術", "科技藝術", "新媒體藝術"],
  },
];

export default function TeacherSection() {
  return (
    <section className="bg-[#FAF8F5] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#8B1E2D] uppercase">
            OUR TEACHERS
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            我們的老師
          </h2>

          <p className="mt-4 text-slate-500">
            每位老師都有不同的專長，陪伴孩子探索藝術、發揮創造力。
          </p>
        </div>

        <div className="mt-20 space-y-24">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.name}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={700}
                  height={900}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#8B1E2D]">
                  Teacher
                </p>

                <h3 className="mt-3 text-4xl font-bold text-slate-900">
                  {teacher.name}
                </h3>

                <p className="mt-2 text-lg font-semibold text-[#8B1E2D]">
                  {teacher.title}
                </p>

                <p className="mt-6 leading-8 text-slate-600">
                  {teacher.intro}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {teacher.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#8B1E2D]/10 px-4 py-2 text-sm font-medium text-[#8B1E2D]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}