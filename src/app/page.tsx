import Hero from "../components/Hero";
import Skills from "../components/Skills"; // 1. Skills 불러오기
import Projects from "../components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen px-6 max-w-3xl mx-auto py-20 flex flex-col gap-24">
      <Hero />
      <Skills /> {/* 2. 중간에 쏙 넣어주기 */}
      <Projects />
    </main>
  );
}
