export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  href: string;
  active: boolean;
};

export const courses: Course[] = [
  {
    id: "clay",
    slug: "clay",
    title: "海洋生物黏土磁鐵",
    subtitle: "六週系列課程",
    description:
      "每週完成不同海洋生物，最後打造專屬海底世界磁鐵畫板。",
    cover:
      "https://mnaimrbgcupayvznxreg.supabase.co/storage/v1/object/public/course-images/IMG_8180.JPG",
    href: "/course/clay",
    active: true,
  },
  {
    id: "fathers-day",
    slug: "fathers-day",
    title: "父親節親子燈",
    subtitle: "期間限定課程",
    description:
      "親子一起設計溫暖小夜燈，留下專屬父親節回憶。",
    cover: "/images/hero/lamp.png",
    href: "/course/fathers-day",
    active: true,
  },
];