"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  // 💡 주소창 직접 접근 및 새로고침 방지용 인증 상태 추가
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const targetUrl = "/projects";
    const authStatus = sessionStorage.getItem(`auth_${targetUrl}`);

    // sessionStorage에 인증 기록이 없다면 올바르지 않은 접근으로 판단하여 차단
    if (authStatus !== "true") {
      alert(
        "보호된 페이지입니다. 메뉴를 통해 올바른 단계를 거쳐 진입해 주세요.",
      );
      router.replace("/"); // 홈 화면이나 이전 화면으로 안전하게 리다이렉트
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // 💡 세션 인증이 검증 완료되기 전까지 레이아웃 깜빡임(FOUC) 및 내부 콘텐츠 노출 방지
  if (!isAuthorized) {
    return <div className="min-h-[60vh] bg-[var(--background)]" />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      {/* 아이콘 영역 */}
      <div className="text-4xl mb-4">🚀</div>

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
        Projects
      </h1>

      {/* 안내 메시지 */}
      <p className="text-gray-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed">
        현재 포트폴리오를 업데이트하고 있습니다. <br />
        멋진 프로젝트들로 곧 찾아뵙겠습니다!
      </p>

      {/* 대기 중인 느낌을 주는 미니멀한 인디케이터 */}
      <div className="mt-8 flex gap-1.5 justify-center">
        <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-zinc-600 animate-pulse"></span>
        <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-zinc-700 animate-pulse delay-150"></span>
        <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse delay-300"></span>
      </div>
    </div>
  );
}
