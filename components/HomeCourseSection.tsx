import Link from "next/link";
import Image from "next/image";
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
  cover: string;
  badge: string | null;
  start_date: string | null;
  class_time: string | null;
  duration: string | null;
  price: number | null;
  price_note: string | null;
  sort_order: number | null;
  course_schedules: {
    remaining: number;
  }[];
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
      cover,
      badge,
      start_date,
      class_time,
      duration,
      price,
      price_note,
      sort_order,
      course_schedules(
        remaining
      )
    `)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
    return null;
  }

  const courses = (data ?? []) as Course[];

  if (courses.length === 0) {
    return null;
  }

  return (
   <section className="bg-[#FAF8F5] py-24">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <p className="font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
        CURRENT COURSES
      </p>

      <h2 className="mt-4 text-5xl font-black text-slate-900">
        當期課程
      </h2>

      <p className="mt-6 text-xl text-slate-500">
        選擇喜歡的課程，開始孩子的藝術旅程。
      </p>

    </div>

    <div className="mt-16 grid gap-10 md:grid-cols-2">

      {courses.map((course) => {

        const remaining =
          course.course_schedules?.reduce(
            (sum, item) => sum + (item.remaining ?? 0),
            0
          ) ?? 0;

        return (
          <div
            key={course.id}
            className="overflow-hidden rounded-[32px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <div className="relative aspect-[4/3]">

              <Image
                src={course.cover}
                alt={course.title}
                fill
                className="object-cover"
              />

              {course.badge && (
                <div className="absolute left-5 top-5 rounded-full bg-[#8B1E2D] px-4 py-2 text-sm font-bold text-white">
                  {course.badge}
                </div>
              )}

            </div>

            <div className="p-8">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E2D]">
                {course.subtitle}
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {course.title}
              </h3>

              <p className="mt-4 text-slate-600 line-clamp-3">
                {course.description}
              </p>

              <div className="mt-8 space-y-3 text-[15px] text-slate-700">

                {course.start_date && (
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{course.start_date}</span>
                  </div>
                )}

                {course.class_time && (
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span>{course.class_time}</span>
                  </div>
                )}

                {course.duration && (
                  <div className="flex items-center gap-2">
                    <span>🎨</span>
                    <span>{course.duration}</span>
                  </div>
                )} 
                                {course.price && (
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="font-bold text-[#8B1E2D]">
                      NT$ {course.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {course.price_note && (
                  <p className="rounded-xl bg-[#FAF8F5] p-4 text-sm leading-6 text-slate-600">
                    {course.price_note}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>
                    剩餘 <strong>{remaining}</strong> 個名額
                  </span>
                </div>

              </div>

              <div className="mt-8 flex gap-4">

                <Link
                  href={`/course/${course.slug}`}
                  className="flex-1 rounded-full border-2 border-[#8B1E2D] py-3 text-center font-semibold text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
                >
                  查看課程
                </Link>

                <Link
                  href={`/schedule?course=${course.slug}`}
                  className="flex-1 rounded-full bg-[#8B1E2D] py-3 text-center font-semibold text-white transition hover:opacity-90"
                >
                  立即報名
                </Link>

              </div>

            </div>

          </div>
        );
      })}

    </div>

  </div>
</section>
  );
}
  