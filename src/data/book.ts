export interface BookTakeaway {
  concept: string; // 책에서 배운 핵심 개념
  application: string; // 내 프로젝트(마중 등)에 실제 적용한 내용
}

export interface Book {
  id: string; // 도서 고유 ID (예: lean-startup)
  experienceId: string; // 연동할 이력 카드 ID (예: majoong-startup)
  title: string; // 도서명
  author: string; // 저자
  coverImage: string; // 도서 표지 (public/ 하위 경로)
  period: string; // 읽은 기간
  rating: number; // 별점 점수 (1~5)
  oneLineReview: string; // 목록에 노출할 짧은 한 줄 평
  whyIRead: string[]; // 읽게 된 구체적 계기/배경
  takeaways: BookTakeaway[]; // 핵심 개념 vs 실제 적용 매칭 테이블 데이터
  detailNotes: string[]; // 최종 느낀 점 및 향후 액션 플랜 에세이
}

//임시 데이터
export const BOOK_DATA: Book[] = [
  {
    id: "lean-startup",
    experienceId: "majoong-startup",
    title: "린 스타트업 (The Lean Startup)",
    author: "에릭 리스 (Eric Ries)",
    coverImage: "/lean-startup-cover.jpg", // public 폴더에 원하는 책 표지를 넣어줘!
    period: "2026.01 - 2026.02",
    rating: 5,
    oneLineReview:
      "가설 수립과 빠른 MVP 검증을 통해 시장의 진짜 페인 포인트를 정량적으로 도출하는 나침반.",
    whyIRead: [
      "마중 플랫폼의 2차 베타 테스트 종료 후, 외국인 가이드와 관광객의 매칭 전환율이 정체되는 구간을 만났습니다.",
      "단순히 개발 스펙을 무작정 늘리는 것보다, 우리가 세운 비즈니스 가설 중 어떤 부품이 어긋났는지 계측하고 빠르게 피드백 루프를 돌리기 위해 이 책을 선택했습니다.",
    ],
    takeaways: [
      {
        concept: "만들기-측정-학습 (Build-Measure-Learn) 피드백 루프",
        application:
          "완벽한 기능을 갖추기 전 가이드 매칭 핵심 인터페이스만 담은 MVP 웹을 Next.js로 신속히 빌드하여 대구 지역 교환학생 대상 3차 테스트를 조기 수행함.",
      },
      {
        concept: "고객 개발 (Customer Development)과 유효한 학습",
        application:
          "막연한 추측성 설문조사에 의존하지 않고, 테스트에 참여한 외국인 유학생들과 대면 FGI(심층 인터뷰)를 진행하여 '단순 언어 소통'보다 '로컬 필수 정보 부재'가 핵심 병목임을 정량적으로 확인.",
      },
    ],
    detailNotes: [
      "이 책을 읽고 난 후, 코드를 한 줄 더 짜는 것보다 '시장이 진짜 원하고 검증 가능한 단위로 가설을 쪼개는 것'이 풀스택 개발자이자 창업가에게 얼마나 중요한지 깨달았습니다.",
      "마중 서비스의 아키텍처를 기능 중심에서 가설 검증 중심으로 전환하는 계기가 되었으며, 앞으로도 유효한 지표 위주로 효율적인 스케일업을 진행할 계획입니다.",
    ],
  },
];
