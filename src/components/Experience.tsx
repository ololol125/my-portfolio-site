import React from "react";
import { EXPERIENCE_DATA } from "../data/experience";

export default function Experience() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight">Experience</h2>

      <div className="flex flex-col gap-8 relative border-l border-gray-200 dark:border-gray-800 ml-2 pl-6">
        {EXPERIENCE_DATA.map((exp, index) => (
          <div key={index} className="relative flex flex-col gap-1">
            {/* 타임라인 왼쪽 점 기믹 */}
            <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-700 border-2 border-white dark:border-black" />

            {/* 기간 */}
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {exp.period}
            </span>

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
          </div>
        ))}
      </div>
    </section>
  );
}
