import React from "react";
import { SKILLS_DATA } from "../data/skills";

export default function Skills() {
  return (
    <section className="flex flex-col gap-6">
      {/* 섹션 타이틀 */}
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>

      {/* 카테고리들을 세로로 나열 */}
      <div className="flex flex-col gap-6">
        {SKILLS_DATA.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:gap-8 items-start"
          >
            {/* 카테고리 이름 (예: Frontend, Backend) - 왼쪽 고정 영역 */}
            <div className="w-full md:w-32 font-medium text-gray-900 dark:text-gray-100 mb-2 md:mb-0 pt-1 text-sm shrink-0">
              {item.category}
            </div>

            {/* 해당 카테고리의 기술 태그들 - 오른쪽 영역 */}
            {/* flex-wrap: 화면 우측 끝에 도달하면 알아서 다음 줄로 예쁘게 내려가게 해주는 필수 속성 */}
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, idx) => (
                <span
                  key={idx}
                  // text-sm: 읽기 편한 폰트 크기, px-3 py-1: 깔끔한 여백, border: 얇은 선으로 정돈된 느낌
                  className="text-sm px-3 py-1 rounded-md bg-transparent border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-medium hover:border-gray-900 dark:hover:border-gray-100 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
