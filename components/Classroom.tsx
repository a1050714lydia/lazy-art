import Image from "next/image";

export default function Classroom() {
  return (
    <section
      id="classroom"
      className="py-28 bg-[#faf7f2]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center">
          教室環境
        </h2>

        <p className="text-center text-slate-600 mt-6 text-xl">
          像咖啡廳一樣舒服，讓孩子自在創作。
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <Image
            src="/images/classroom/classroom1.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/classroom/classroom2.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/classroom/classroom3.png"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

        </div>

      </div>
    </section>
  );
}