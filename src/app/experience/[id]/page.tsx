import React from "react";
import { notFound } from "next/navigation";
import { EXPERIENCE_DATA } from "@/data/experience";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 1. 데이터 배열에서 현재 주소의 id와 일치하는 이력 항목 탐색
  const experience = EXPERIENCE_DATA.find((item) => item.id === id);

  // 2. 일치하는 데이터 데이터가 없다면 예외적으로 404 페이지 배출
  if (!experience) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 flex flex-col gap-8">
      {/* 상단 네비게이션: 뒤로가기 링크 */}
      <Link
        href="/experience"
        className="text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 w-fit transition-colors"
      >
        ← 이력 목록으로 돌아가기
      </Link>

      {/* 헤더 섹션: 기간, 대제목, 역할 */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">
          {experience.period}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          {experience.title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-medium">
          {experience.role}
        </p>
      </div>

      <hr className="border-gray-100 dark:border-zinc-800/60" />

      {/* 메인 섹션: 세부 수행 내용 상세 기술 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          주요 성과 및 수행 내용
        </h2>
        <ul className="flex flex-col gap-3.5 list-none pl-0">
          {experience.description.map((desc, idx) => (
            <li
              key={idx}
              className="flex gap-2.5 text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed"
            >
              <span className="text-zinc-400 dark:text-zinc-600 font-bold mt-0.5">
                ✓
              </span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 고도화 섹션: 첨부 서류 리스트 코너 */}
      {experience.certificates && experience.certificates.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            첨부 증빙 자료
          </h2>
          <div className="grid gap-2.5">
            {experience.certificates.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-zinc-400 text-sm">📄</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    {cert.name}
                  </span>
                </div>
                <a
                  href={cert.url}
                  download
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  다운로드
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 미디어 섹션: 미디어 갤러리 와이드 풀뷰 */}
      {experience.imageUrls && experience.imageUrls.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            관련 스크린샷 및 시각 자료
          </h2>
          <div className="flex flex-col gap-4">
            {experience.imageUrls.map((url, idx) => (
              <div
                key={idx}
                className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center shadow-sm"
              >
                <Image
                  src={url}
                  alt={`${experience.title} 상세 스크린샷 ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-contain p-4"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
