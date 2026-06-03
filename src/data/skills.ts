export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      "Node.js",
      "Express",
      "Oracle DB (ORCLPDB)",
      "PostgreSQL",
      "Spring Boot",
      "C/C++ (Network Programming)",
    ],
  },
  {
    category: "Mobile",
    skills: ["Android Studio", "Kotlin/Java", "Flutter", "Dart"],
  },
  {
    category: "Tools & Deployment",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Postman",
      "Docker",
      "Supabase",
      "n8n",
      "ngrock",
      "Railway",
    ],
  },
];
