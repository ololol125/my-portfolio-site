export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  deployLink?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    title: "마중 (majoong)",
    description:
      "외국인 관광객과 로컬 가이드 매칭 플랫폼 서비스입니다. 베타 테스트를 통해 시장성을 검증하고 있습니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubLink: "https://github.com/your-id/majoong", // 나중에 본인 주소로 변경 가능!
  },
  {
    title: "나만의 포트폴리오 사이트",
    description:
      "나의 프로젝트와 개발 역량을 깔끔하게 정리하여 보여주기 위해 제작한 웹사이트입니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubLink: "https://github.com/your-id/my-portfolio",
    deployLink: "https://your-portfolio.vercel.app",
  },
];
