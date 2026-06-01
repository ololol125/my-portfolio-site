import React from "react";
// import Projects from "@/components/Projects"; // 나중에 구현 시 주석을 해제하여 사용하세요.

export default function ProjectsPage() {
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
