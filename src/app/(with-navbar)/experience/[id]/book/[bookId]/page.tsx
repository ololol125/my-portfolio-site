import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOK_DATA } from "@/data/book";
import { EXPERIENCE_DATA } from "@/data/experience";

interface PageProps {
  params: Promise<{ id: string; bookId: string }>;
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id, bookId } = await params;

  // 1. 주소창의 id와 bookId 조건이 맞아떨어지는 서재 데이터 탐색
  const book = BOOK_DATA.find((b) => b.id === bookId && b.experienceId === id);
  const experience = EXPERIENCE_DATA.find((exp) => exp.id === id);

  if (!book || !experience) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 flex flex-col gap-8">
      {/* 상단 네비게이션 서재 리스트로 빽 */}
      <Link
        href={`/experience/${id}/book`}
        className="text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 w-fit transition-colors"
      >
        ← 독서 목록 서재로 돌아가기
      </Link>

      {/* 히어로 헤더 구조 (상세 도서 카드 정보 뷰) */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="relative aspect-[3/4] w-32 sm:w-36 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-md flex items-center justify-center flex-shrink-0 text-center border border-zinc-200/50">
          <span className="text-[10px] font-bold text-zinc-400 p-2">
            {book.title}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 text-center sm:text-left mt-2 sm:mt-0">
          <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
            {book.period}
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            {book.title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            {book.author}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
            <span className="text-amber-400 text-sm">
              {"★".repeat(book.rating)}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              ({book.rating}.0 / 5.0)
            </span>
          </div>
        </div>
      </div>

      {/* 1) 왜 읽었는가? (Why I Read) 섹션 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          1. 독서 동기 (Why I Read)
        </h2>
        <div className="flex flex-col gap-3.5 text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed text-justify">
          {book.whyIRead.map((para, idx) => (
            <p key={idx} className="indent-1">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 2) 핵심 임팩트 테이블 컴포넌트 (배운 개념 vs 실제 프로젝트 적용) */}
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          2. 실전 적용 사례 (Key Takeaways)
        </h2>
        <div className="flex flex-col gap-4">
          {book.takeaways.map((take, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900"
            >
              {/* 좌측: 책의 이론 */}
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/40 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase block mb-1">
                  💡 배운 개념 (Concept)
                </span>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                  {take.concept}
                </p>
              </div>
              {/* 우측: 실제 비즈니스 적용 적재 */}
              <div className="p-4 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-wider uppercase block mb-1">
                  🚀 프로젝트 적용 (Application)
                </span>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {take.application}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3) 느낀 점 및 액션 플랜 (Detail Notes) 에세이 마감 */}
      <div className="flex flex-col gap-3 mt-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          3. 총평 및 액션 플랜 (Detail Notes)
        </h2>
        <div className="flex flex-col gap-3.5 text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed text-justify">
          {book.detailNotes.map((para, idx) => (
            <p key={idx} className="indent-1">
              {para}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
