export interface Experience {
  id: string;
  period: string;
  title: string;
  role: string;
  description: string[];
  detailContent?: string[]; // ✨ 상세 페이지에서만 보여줄 풍성한 본문 내용!
  // ✨ 여러 개의 증빙자료를 이름과 함께 관리할 수 있도록 배열 구조로 고도화
  certificates?: { name: string; url: string }[];
  imageUrls?: string[];
  detailImages?: string[]; // ✨ 상세 페이지용 세부 시각 자료
}

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "knu-student-council", // ✨ 고유 ID 매핑
    period: "2024.03 - 2025.03",
    title: "경북대학교 컴퓨터학부 15,16대 학생회 재정부장",
    role: "학생회 임원",
    description: [
      "24년도 1학기 재정차장으로 시작하여 24년도 2학기부터 25년도 1학기까지 재정부장으로 활동하며 3학기 동안 경북대학교 컴퓨터학부 학생회에서 학부 학생회비 예산 집행과 회계 관리를 총괄함",
      "mysql 기반의 자체 회계 관리 시스템을 구축하여 신입생들의 명단과 회비 납부여부를 관리하고 예산 집행의 투명성과 효율성을 크게 향상시킴",
      "이를 통해 리더십과 조직 관리 역량을 키우는 동시에, 기술적 문제 해결 능력을 발휘하여 학생회 운영의 디지털 트랜스포메이션을 성공적으로 이끌어냄",
    ],
    detailContent: ["-"],
    imageUrls: ["/knu-cse01.jpg", "/knu-cse.jpg"],
  },
  {
    id: "ai-education-project", // ✨ 고유 ID 매핑
    period: "2025.03 - 2026.02",
    title: "AI 디지털 융합 플랫폼 교육혁신 사업단 학부연구생 경험",
    role: "Undergraduate Research Assistant",
    description: [
      "교육부 차관 출신 교수 연구실에서 'AI 디지털 융합 플랫폼 개발' 프로젝트의 학부연구생(11개월)으로 활동하며, 이론적 CS 지식을 실제 상용 플랫폼 아키텍처에 적용하는 풀스택 개발 프로세스를 경험",
      "단순 개발을 넘어, 발주처(교수진)의 요구사항을 분석하여 개발 용역업체에 전달하고 조정하는 기술 커뮤니케이션 및 중재 역할을 수행",
      "이를 통해 플랫폼 비즈니스에서 필수적인 요구사항 정의, 일정 관리, 외주 매니지먼트 역량을 확보",
    ],
    detailContent: ["-"],
    imageUrls: ["/ex3.png"],
  },
  {
    id: "majoong-startup", // ✨ 고유 ID 매핑
    period: "2025.08 - 현재",
    title: "스타트업 '마중 (majoong)'",
    role: "Representative & Full-Stack Developer",
    description: [
      "외국인 관광객과 로컬 가이드를 매칭하는 플랫폼 서비스 기획 및 총괄",
      "Next.js 및 풀스택 기술을 활용한 MVP 개발 및 대구 지역 베타 테스트 검증 완료",
      "정부 창업 지원 프로그램(예비창업패키지 등) 지원 및 비즈니스 모델 고도화",
      "소프트웨어 특허 2회 출원",
      "경북대학교 산학창업지원부 창업동아리 선정 및 산학협력단 지원금 250만 원 확보",
      "창업 경진대회 다수 수상",
      "경북대학교 창업지원단 창업 오피스 입주",
    ],
    detailContent: ["-"],
    // 💡 마중 관련 서류들을 이름과 함께 매핑해줍니다.
    certificates: [
      { name: "사업자등록증", url: "사업자등록증.pdf" },
      { name: "창업경진대회 상장01", url: "/award01.png" },
      { name: "창업경진대회 상장02", url: "/award03.png" },
      { name: "창업 오피스 입주공간 이용증명서", url: "award02.png" },
    ],
    imageUrls: ["/business-club.png", "/ex4.png"], // 오타 슬래시(/) 추가 보정
  },
  {
    id: "ai-manufacturing-project", // ✨ 고유 ID 매핑
    period: "2026.04",
    title:
      "기계공학 교수의 산업용 절삭유 분석 기반 AI 제조 지식 자산화 및 설비 예지보전 플랫폼 개발 국책 사업 학부연구생 경험",
    role: "Undergraduate Research Assistant",
    description: [
      "산업용 절삭유 분석 기반 AI 제조 지식 자산화 및 설비 예지보전 플랫폼 개발 국책 사업에 학부연구생으로 참여함",
      "컴퓨터공학 도메인 지식이 부족한 경북대학교 기계공학 교수의 원천 아이디어를 기반으로 주식회사 삼광 등 주요 제조 기업 실무진과 미팅을 하며 실제 제조 공정에서 상용화 할 수 있는 형태의 플랫폼을 기획하고 사업계획서를 작성하는 과정에 참여",
    ],
    detailContent: ["-"],
    certificates: [{ name: "산업통상부 공고", url: "/ai-1.pdf" }],
    imageUrls: ["/tasknum.png"],
    detailImages: ["/ex1.png", "/ex2.png"],
  },
  {
    id: "clmt-engineer", // ✨ 고유 ID 매핑
    period: "2026.04 - 현재",
    title:
      "경북대학교 기계공학과 채영훈 교수가 운영하는 주식회사 CLMT의 소프트웨어 엔지니어로 근무",
    role: "software engineer, staff",
    description: [
      "주식회사 CLMT에서 소프트웨어 엔지니어로 근무하며, 기계공학 교수의 원천 아이디어를 기반으로 비즈니스 모델을 구체화하고 상용화 할 수 있는 플랫폼을 기획하여 개발함",
      "한국 변리사가 해외(미국 등)로 특허 사건을 송출한 기여도를 데이터로 기록하고, 이를 바탕으로 해외 대리인이 한국에 사건을 출원할 때 기여도가 높은 한국 변리사를 우선 추천받도록 유도하는 상호 이익형 플랫폼 기획",
      "소상공인 염색방 및 미용실 원장님들을 위한 고객 관리 및 예약 스케줄링 SaaS 프로그램을 제공하고, 일반 소비자가 실시간으로 매장 및 디자이너를 지정 예약할 수 있도록 돕는 버티컬 뷰티 플랫폼 기획 및 개발",
    ],
    detailContent: ["-"],
    certificates: [{ name: "CLMT 재직 증명서", url: "/clmt_certificate.pdf" }],
    imageUrls: [
      "/global-ip-reciprocity-platform-erd.png",
      "/global-ip-reciprocity-platform-relation.png",
    ],
  },
  {
    id: "snu-research-intern", // ✨ 고유 ID 매핑
    period: "2026.06 - 현재",
    title: "서울대학교 교류 학생 선발 및 학부생 연구 인턴 참여",
    role: "Undergraduate Research Assistant",
    description: [
      "매주 과제 미팅과 매월 NVDIA Korea 본사 또는 삼성서울병원 관계자들과 미팅 진행",
    ],
    detailContent: ["-"],
    certificates: [
      { name: "서울대학교 교류수학 선발", url: "snu_certification01.png" },
      { name: "서울대학교 수학 안내문", url: "snu_certification02.pdf" },
      { name: "학부생 연구인턴 소개자료", url: "snu_certification03.pdf" },
    ],
    imageUrls: ["/snu01.png"],
  },
];
