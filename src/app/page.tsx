import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen px-6 max-w-3xl mx-auto py-20 flex flex-col gap-24">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
    </main>
  );
}
