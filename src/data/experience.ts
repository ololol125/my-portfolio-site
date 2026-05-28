export interface Experience {
  period: string;
  title: string;
  role: string;
  description: string[];
}

export const EXPERIENCE_DATA: Experience[] = [
  {
    period: "2026.01 - 현재",
    title: "스타트업 '마중 (majoong)'",
    role: "Representative & Full-Stack Developer",
    description: [
      "외국인 관광객과 로컬 가이드를 매칭하는 플랫폼 서비스 기획 및 총괄",
      "Next.js 및 풀스택 기술을 활용한 MVP 개발 및 대구 지역 3차 베타 테스트 검증 완료",
      "정부 창업 지원 프로그램(예비창업패키지 등) 지원 및 비즈니스 모델 고도화",
    ],
  },
  {
    period: "2025.09 - 2026.01",
    title: "AI 기반 교육혁신 프로젝트 사업단",
    role: "Undergraduate Research Assistant",
    description: [
      "연구실 학부 인턴으로서 AI 연계 교육 인프라 및 가이드라인 조사 보조",
      "교수님 및 연구원들과의 협업을 통한 데이터 정리 및 문서화 작업 수행",
    ],
  },
  {
    period: "2025.08",
    title: "의성 청년 개발자 캠프",
    role: "Participant",
    description: [
      "2주간의 몰입형 부트캠프를 통해 단기간 웹 서비스 프로토타입 빌드 프로세스 경험",
      "타 전공 및 타 대학 개발자들과의 팀 협업 및 네트워킹 진행",
    ],
  },
];
