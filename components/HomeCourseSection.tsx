import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number | null;
  sort_order: number | null;
};

export default async function HomeCourseSection() {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      slug,
      title,
      subtitle,
      description,
      price,
      sort_order
    `)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
  }

  const courses = (data ?? []) as Course[];

  return (
    <section className="bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* =========================
            常態課程
        ========================= */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
            REGULAR CLASSES
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            常態課程
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-600">
            每週固定開課，依照不同年齡與興趣，
            選擇適合自己的藝術課程。
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-500">
            兒童美術・漫畫・素描・黏土・水彩・升學
          </p>

          <div className="mt-10">
            <Link
              href="/course/regular"
              className="inline-flex items-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#741826] hover:shadow-lg"
            >
              查看常態課程 →
            </Link>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="mx-auto my-24 max-w-3xl border-t border-[#E7E0D8]" />

        {/* =========================
            當期課程
        ========================= */}
        {courses.length > 0 && (
          <>
            <div className="text-center">
              <p className="font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
                CURRENT WORKSHOPS
              </p>

              <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
                當期課程
              </h2>
            </div>

            <div className="mt-16 space-y-20">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="mx-auto max-w-3xl border-b border-[#E7E0D8] pb-20 last:border-0"
                >
                  <div className="text-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
                      {course.subtitle}
                    </p>

                    <h3 className="mt-5 text-4xl font-black text-slate-900 md:text-5xl">
                      {course.title}
                    </h3>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-600">
                      {course.description}
                    </p>

                    {course.price && (
                      <div className="mt-10">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                          PRICE
                        </p>

                        <p className="mt-2 text-4xl font-black text-[#8B1E2D]">
                          NT$ {course.price.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div className="mt-12">
                      <Link
                        href={`/course/${course.slug}`}
                        className="inline-flex items-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#741826] hover:shadow-lg"
                      >
                        了解更多 →
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}