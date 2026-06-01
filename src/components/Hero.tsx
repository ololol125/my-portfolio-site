import React from "react";
import Image from "next/image"; // Next.js의 최적화 이미지 컴포넌트를 가져옵니다.

export default function Hero() {
  return (
    <div>
      <section className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-8 md:gap-12">
        {/* 왼쪽: 내 소개 글 영역 */}
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            안녕하세요, 박영현입니다.
          </h1>
          <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
            문제를 정의하고, 코드로 솔루션을 구축하는 개발자입니다. 현재 외국인
            관광객과 한국인 현지 로컬 가이드를 매칭하는 스타트업{" "}
            <span className="font-semibold text-black dark:text-white">
              마중 (majoong)
            </span>
            의 대표로 서비스 MVP 개발 및 비즈니스 모델 검증을 마치고 본격적으로
            사업을 확장해 나가고 있습니다.
          </p>
        </div>

        {/* 오른쪽 우측 상단: 세로형 둥근 사각형 프로필 이미지 영역 */}
        <div className="shrink-0 mx-auto md:mx-0">
          {/* 
          💡 변경 포인트:
          1. rounded-full 대신 rounded-2xl을 주어 트렌디한 둥근 사각형 모양으로 바꿉니다.
          2. 사진 구도를 살리기 위해 1:1 비율 대신 세로가 더 긴 비율(w-32: h-40 / md:w-36: md:h-48)로 확장합니다.
        */}
          <div className="relative w-32 h-40 md:w-140px md:h-173px rounded-2xl overflow-hidden border-2 border-gray-100 dark:border-zinc-800 shadow-sm">
            <Image
              src="/profile2.png"
              alt="박영현 프로필 이미지"
              fill
              priority
              className="object-cover" // 고유 비율을 유지하며 상자에 꽉 채웁니다.
            />
          </div>
        </div>
      </section>

      <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2x1">
        <br></br>
        <strong>경북대학교 컴퓨터학부</strong>에서 학사과정을 휴학하고
        경북대학교 기계공학과 채영훈 교수님이 운영하시는{" "}
        <strong>주식회사 CLMT</strong>에서 사원으로 소프트웨어 엔지니어 역할을
        맡고 있습니다. <br></br>
        <br></br>
        또한 <strong>서울대학교 연합전공 인공지능반도체공학</strong> 김남준
        교수님 연구실에서 NVDIA 및 서울삼성병원과 협력하여 학부 연구생 인턴을
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
    </div>
  );
}
