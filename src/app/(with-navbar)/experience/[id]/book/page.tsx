import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPERIENCE_DATA } from "@/data/experience";
import { BOOK_DATA } from "@/data/book";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectBookListPage({ params }: PageProps) {
  const { id } = await params;

  // 1. 해당 프로젝트 이력이 실존하는지 체크
  const experience = EXPERIENCE_DATA.find((exp) => exp.id === id);
  if (!experience) notFound();

  // 2. 이 프로젝트(experienceId)를 위해 읽은 서적들 필터링
  const projectBooks = BOOK_DATA.filter((book) => book.experienceId === id);

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 flex flex-col gap-8">
      {/* 상단 네비게이션 */}
      <Link
        href={`/experience/${id}`}
        className="text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 w-fit transition-colors"
      >
        ← {experience.title.split(" ")[0]} 프로젝트 상세로 돌아가기
      </Link>

      {/* 헤더 타이틀 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          📚 {experience.title.includes("'마중'") ? "'마중'" : "프로젝트"}을
          빌드하며 이정표가 되어준 도서들
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          단순히 요구사항대로 개발하는 것을 넘어, 비즈니스의 성장과 기술
          아키텍처의 한계를 극복하기 위해 탐독하고 서비스에 녹여낸 독서 기록
          서재입니다.
        </p>
      </div>

      <hr className="border-gray-100 dark:border-zinc-800/60" />

      {/* 도서 그리드 뷰 */}
      {projectBooks.length === 0 ? (
        <p className="text-sm text-zinc-400 py-8 text-center">
          아직 등록된 독서 노트가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {projectBooks.map((book) => (
            <Link
              key={book.id}
              href={`/experience/${id}/book/${book.id}`}
              className="group relative flex flex-col gap-3 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-900/20 hover:bg-white dark:hover:bg-zinc-900 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* 책 표지 모션 컨테이너 */}
              <div className="relative aspect-[3/4] w-full max-w-[180px] mx-auto rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-md transition-transform duration-300 group-hover:scale-102 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-700/30">
                {/* 만약 표지 이미지가 public 폴더에 아직 없다면 미니멀한 타이틀 플레이트로 백업 */}
                <span className="text-xs font-bold text-zinc-400 px-4 text-center z-0 absolute">
                  {book.title}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              </div>

              {/* 하단 메타 정보 */}
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase">
                    {book.period}
                  </span>
                  <span className="text-amber-400 text-xs">
                    {"★".repeat(book.rating)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                  {book.oneLineReview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
