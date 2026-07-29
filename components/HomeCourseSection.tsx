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
    return null;
  }

  const courses = (data ?? []) as Course[];

  if (courses.length === 0) return null;

  return (
    <section className="bg-[#FAF8F5] py-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* 標題 */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
            CURRENT WORKSHOPS
          </p>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            當期課程
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-500">
            每一堂課，都是一次自由創作的開始。
            <br />
            陪伴孩子探索藝術、想像與創造力。
          </p>
        </div>

        {/* 課程 */}
        <div className="mt-24 space-y-24">
          {courses.map((course) => (
            <div
              key={course.id}
              className="mx-auto max-w-3xl border-b border-[#E7E0D8] pb-20 last:border-0"
            >
              <div className="text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
                  {course.subtitle}
                </p>

                <h3 className="mt-5 text-5xl font-black text-slate-900">
                  {course.title}
                </h3>

                <p className="mx-auto mt-8 max-w-2xl text-xl leading-10 text-slate-600">
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

      </div>
    </section>
  );
}