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
      <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2x1">
        현재 <strong>경북대학교 컴퓨터학부</strong>에서 학사과정을 휴학하고
        있으며, 경북대학교 기계공학과 채영훈 교수님이 운영하시는{" "}
        <strong>주식회사 CLMT</strong>에서 사원으로 소프트웨어 엔지니어 역할을
        맡고 있습니다. <br></br>
        <br></br>
        또한 <strong>서울대학교 연합전공 인공지능반도체공학</strong> 김남준
        교수님 연구실에서 NVDIA 및 서울삼성병원과 협력하여 학부부연구생 인턴을
        하고 있습니다. <br></br>
        <br></br>
        마지막으로 <strong>스타트업 '마중(majoong)'</strong> 대표로 활동하며,
        한국에 방문한 외국인이 처음 방문하는 낯선 여행지에서 즐거운 여행 경험을
        가질 수 있도록 해당 지역에 거주하거나, 능통한 현지 가이드를 매칭해주는
        서비스를 제공하고 있습니다.
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
