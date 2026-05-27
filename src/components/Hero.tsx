import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col gap-6 pt-10">
      {/* 타이틀 및 소개 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          안녕하세요, 박영현입니다.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
          문제를 정의하고, 코드로 솔루션을 구축하는 개발자입니다.
        </p>
      </div>

      {/* 짧은 자기소개 글 */}
      <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
        현재 컴퓨터학부에서 공부하며 가치 있는 서비스를 세상에 내놓기 위해 웹 및
        모바일 풀스택 기술을 깊이 있게 탐구하고 있습니다. 단순한 기능 구현을
        넘어 사용자 경험 최적화와 비즈니스 모델을 기술로 검증하는 과정에 흥미가
        많습니다.
      </p>

      {/* 연락처 및 소셜 링크 */}
      <div className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
        <a
          href="https://github.com/ololol125"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
        >
          GitHub
        </a>
        <a
          href="mailto:zerohyeon657@gmail.com"
          className="hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
        >
          Email
        </a>
      </div>
    </section>
  );
}
