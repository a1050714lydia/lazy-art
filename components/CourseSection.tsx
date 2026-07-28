"use client";

import Link from "next/link";
import Image from "next/image";
import { courses } from "@/lib/courses";

export default function CourseSection() {
  const activeCourses = courses.filter((course) => course.active);

  return (
    <section className="bg-[#FAF8F5] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
            CURRENT COURSES
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            當期課程
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            每一堂課，都是孩子探索與創作的新旅程。
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {activeCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link href={course.href}>
                <div className="group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={course.cover}
                      alt={course.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E2D]">
                      {course.subtitle}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {course.description}
                    </p>

                    <div className="mt-8">
                      <span className="inline-flex w-full justify-center rounded-full bg-[#8B1E2D] px-6 py-3 font-semibold text-white transition group-hover:bg-[#721825]">
                        了解更多 →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}