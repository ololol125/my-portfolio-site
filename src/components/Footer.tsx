import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full pt-12 border-t border-gray-100 dark:border-zinc-900 mt-12">
      <div className="flex flex-col gap-2 text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">
        {/* 상호명 및 저작권 영역 */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
          {/* 로고와 상호명을 묶어 링킹 처리 */}
          <a
            href="https://majoong.today"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group w-fit transition-opacity hover:opacity-80"
          >
            {/* 💡 변경 포인트:
    1. 로고를 감싸는 바깥 상자 크기를 w-7 h-7 (28px)로 살짝 더 키워 여유 공간을 줍니다.
    2. Image 컴포넌트에 fill을 주고, className에 object-contain을 확실하게 먹여서 
       어떤 모서리도 절대 잘리지 않고 상자 안에서 원본 비율 그대로 보이게 만듭니다.
  */}
            <div className="relative w-7 h-7 overflow-hidden bg-transparent rounded-md flex items-center justify-center shrink-0">
              <Image
                src="/majoong-logo.png"
                alt="마중 로고"
                fill
                className="object-contain dark:invert"
              />
            </div>

            <span className="font-semibold text-gray-600 dark:text-zinc-400 text-sm group-hover:underline decoration-1 underline-offset-4">
              마중 (majoong)
            </span>
          </a>

          <span>
            © {new Date().getFullYear()} majoong. All rights reserved.
          </span>
        </div>

        {/* 사업자 상세 정보 줄바꿈 정렬 */}
        <div className="flex flex-col gap-1">
          <p>
            <span className="font-medium text-gray-500 dark:text-zinc-400">
              대표자:
            </span>{" "}
            박영현
            <span className="mx-2 text-gray-200 dark:text-zinc-800">|</span>
            <span className="font-medium text-gray-500 dark:text-zinc-400">
              사업자등록번호:
            </span>{" "}
            714-46-01125
          </p>
          <p>
            <span className="font-medium text-gray-500 dark:text-zinc-400">
              주소:
            </span>{" "}
            서울특별시 관악구 신림로23길 73-6(신림동)
          </p>
          <p>
            <span className="font-medium text-gray-500 dark:text-zinc-400">
              이메일:
            </span>{" "}
            zerohyeon657@gmail.com
            <span className="mx-2 text-gray-200 dark:text-zinc-800">|</span>
            <span className="font-medium text-gray-500 dark:text-zinc-400">
              연락처:
            </span>{" "}
            010-4271-5280
          </p>
        </div>

        {/* 스타트업 한 줄 슬로건 고지 */}
        <p className="text-[11px] text-gray-300 dark:text-zinc-600 mt-4 tracking-wide">
          개별 관광 중심으로 개편되는 글로벌 시장의 흐름을 반영하고, 수도권과
          지방 간의 관광 자원의 물리적 격차에 따른 외국인 관광객의 수도권 집중
          현상을 해결하기 위해 관광 콘텐츠의 주체를 ‘장소’에서 ‘사람’으로 옮기는
          혁신이 필요합니다. <br></br>
          '마중'은 한국에 방문한 외국인이 처음 방문하는 낯선 여행지에서 즐거운
          여행 경험을 가질 수 있도록 해당 지역에 거주하거나, 능통한 현지
          가이드를 매칭해주는 서비스를 제공합니다.
        </p>
      </div>
    </footer>
  );
}
