import React from "react";
import { PROJECTS_DATA } from "../data/projects"; // 아까 만든 프로젝트 데이터를 가져옵니다.

export default function Projects() {
  return (
    <section className="flex flex-col gap-6">
      {/* 섹션 타이틀 */}
      <h2 className="text-2xl font-bold tracking-tight">Projects</h2>

      {/* 프로젝트 카드들이 들어갈 컨테이너 (세로로 정렬) */}
      <div className="flex flex-col gap-4">
        {PROJECTS_DATA.map((project, index) => (
          <div
            key={index}
            // Tailwind v4 스타일: 테두리선, 안쪽 여백, 모서리 둥글게, 마우스 올렸을 때 부드러운 배경색 변화
            className="border border-gray-200 dark:border-gray-800 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
          >
            {/* 프로젝트 제목 */}
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

            {/* 프로젝트 설명 */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* 기술 스택 태그 리스트 */}
            {/* flex-wrap을 주어야 가로로 나열되다가 화면 끝에 닿으면 알아서 다음 줄로 예쁘게 내려가! */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* GitHub 및 배포 링크 버튼 */}
            <div className="flex gap-4 text-xs font-medium text-gray-500">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white underline underline-offset-2"
                >
                  GitHub
                </a>
              )}
              {project.deployLink && (
                <a
                  href={project.deployLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white underline underline-offset-2"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
