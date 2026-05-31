import React from "react";
import Image from "next/image";
import { EXPERIENCE_DATA } from "@/data/experience";

export default function Experience() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight">Experience</h2>

      <div className="flex flex-col gap-8 relative border-l border-gray-200 dark:border-gray-800 ml-4 pl-6">
        {EXPERIENCE_DATA.map((exp, index) => (
          <div key={index} className="relative flex flex-col gap-1">
            {/* 타임라인 마커 원형 점 */}
            <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-700 border-2 border-white dark:border-black" />

            {/* 기간 및 증빙 서류 배지 */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-400 dark:text-zinc-500">
                {exp.period}
              </span>

              {exp.certificateUrl && (
                <a
                  href={exp.certificateUrl}
                  download
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[10px] font-medium text-gray-600 dark:text-zinc-400 transition-colors"
                >
                  📎 증빙 자료 보기
                </a>
              )}
            </div>

            {/* 제목 및 역할 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-0.5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {exp.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 sm:before:content-['|'] sm:before:mr-2">
                {exp.role}
              </span>
            </div>

            {/* 상세 수행 내용 리스트 */}
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2 flex flex-col gap-1">
              {exp.description.map((desc, idx) => (
                <li key={idx} className="marker:text-gray-400">
                  <span className="pl-1">{desc}</span>
                </li>
              ))}
            </ul>

            {exp.imageUrls && exp.imageUrls.length > 0 && (
              <div
                className={`grid gap-3 mt-4 w-full max-w-2xl ${
                  exp.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {exp.imageUrls.map((url, imgIdx) => {
                  // 💡 핵심 로직:
                  // 전체 이미지 개수가 홀수(3장, 5장 등)이고, 현재 렌더링하는 이미지가 '마지막 이미지'인 경우!
                  const isLastOddImage =
                    exp.imageUrls!.length % 2 !== 0 &&
                    imgIdx === exp.imageUrls!.length - 1;

                  return (
                    <div
                      key={`${imgIdx}-${url}`}
                      className={`relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-101 ${
                        // ✨ 마지막 홀수 번째 이미지라면 가로 2칸을 통째로 다 쓰도록 격자를 확장합니다 (col-span-2)
                        isLastOddImage ? "col-span-2" : ""
                      }`}
                    >
                      <Image
                        src={url}
                        alt={`${exp.title} 활동 사진 ${imgIdx + 1}`}
                        fill
                        unoptimized
                        className="object-contain p-2"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
