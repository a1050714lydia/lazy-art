"use client";

import { useEffect, useState } from "react";

const images = [
  "/images/clay-dessert-1.png",
  "/images/clay-dessert-2.png",
  "/images/clay-dessert-3.png",
  "/images/clay-dessert-4.png",
  "/images/clay-dessert-5.png",
];

export default function ClayCarousel() {
  const [current, setCurrent] = useState(0);

  // 每 2.5 秒自動切換下一張
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const previousImage = () => {
    setCurrent(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="mx-auto mt-7 w-full max-w-[520px]">

      {/* 輪播照片區 */}
      <div
        className="
          relative
          h-[260px]
          w-full
          overflow-hidden
          rounded-[22px]
          bg-[#FAF8F5]
          sm:h-[320px]
          md:h-[380px]
        "
      >

        {/* 五張照片橫向排列，但一次只顯示一張 */}
        <div
          className="
            flex
            h-full
            w-full
            transition-transform
            duration-700
            ease-in-out
          "
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((src, index) => (
            <div
              key={src}
              className="
                flex
                h-full
                w-full
                min-w-full
                flex-shrink-0
                items-center
                justify-center
                p-3
                sm:p-4
                md:p-5
              "
            >
              <img
                src={src}
                alt={`甜點黏土作品 ${index + 1}`}
                className="
                  block
                  h-full
                  w-full
                  object-contain
                "
              />
            </div>
          ))}
        </div>

        {/* 左箭頭 */}
        <button
          type="button"
          onClick={previousImage}
          aria-label="上一張"
          className="
            absolute
            left-3
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/85
            text-xl
            text-slate-700
            shadow-md
            backdrop-blur-sm
            transition
            hover:scale-105
            hover:bg-white
          "
        >
          ‹
        </button>

        {/* 右箭頭 */}
        <button
          type="button"
          onClick={nextImage}
          aria-label="下一張"
          className="
            absolute
            right-3
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/85
            text-xl
            text-slate-700
            shadow-md
            backdrop-blur-sm
            transition
            hover:scale-105
            hover:bg-white
          "
        >
          ›
        </button>

      </div>

      {/* 下方圓點 */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`切換到第 ${index + 1} 張`}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-6 bg-[#8B1E2D]"
                : "w-2 bg-[#D8D0C8] hover:bg-[#BEB4AA]"
            }`}
          />
        ))}
      </div>

    </div>
  );
}