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

  // 1. 고정된 EXPERIENCE_DATA 배열에서 현재 주소의 id와 일치하는 이력 항목 탐색
  const experience = EXPERIENCE_DATA.find((item) => item.id === id);

  // 2. 예외 처리: 데이터가 존재하지 않는다면 404 페이지로 유도
  if (!experience) {
    notFound();
  }

  // 3. 사용자가 직접 풀어 쓴 detailContent가 있다면 우선 사용하고, 없다면 description을 대체 적용
  const contentToDisplay =
    experience.detailContent && experience.detailContent.length > 0
      ? experience.detailContent
      : experience.description;

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 flex flex-col gap-8">
      {/* 상단 내비게이션 바 */}
      <Link
        href={`/experience#exp-${id}`}
        className="text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors text-sm"
      >
        ← 이력 목록으로 돌아가기
      </Link>

      {/* 헤더 섹션: 기간, 대제목, 직무 역할 */}
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

      {/* 메인 상세 본문 섹션: 패러그래프 단위 줄글 정렬 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          주요 성과 및 상세 내용
        </h2>
        <div className="flex flex-col gap-4 text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed text-justify">
          {contentToDisplay.map((paragraph, idx) => (
            <p key={idx} className="indent-1">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* 고도화된 다중 증빙 자료 리스트 다운로드 코너 */}
      {experience.certificates && experience.certificates.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            첨부 증빙 자료
          </h2>
          <div className="grid gap-2.5">
            {experience.certificates.map((cert, idx) => {
              // 파일 주소 매핑 시 루트 슬래시(/) 오타 안전 마감 방어용 변수
              const fileUrl = cert.url.startsWith("/")
                ? cert.url
                : `/${cert.url}`;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-zinc-400 text-sm">📄</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-zinc-200">
                      {cert.name}
                    </span>
                  </div>
                  <a
                    href={fileUrl}
                    download
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    다운로드
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 미디어 자료 시각화 섹션: 수직 정렬 와이드 풀뷰 */}
      {experience.detailImages && experience.detailImages.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            시각 자료 및 스크린샷
          </h2>
          <div className="flex flex-col gap-4">
            {experience.detailImages.map((url, idx) => (
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
