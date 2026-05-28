import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Navbar 불러오기

export const metadata: Metadata = {
  title: "박영현 | Portfolio",
  description:
    "문제를 정의하고, 코드로 솔루션을 구축하는 개발자 박영현의 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-gray-200 dark:selection:bg-zinc-800">
        {/* 2. max-w-3xl 안쪽에 Navbar와 children을 배치하여 정갈하게 상하로 정렬되게 합니다. */}
        <main className="min-h-screen px-6 max-w-3xl mx-auto py-12 flex flex-col">
          <Navbar />
          <div className="flex flex-col gap-24">{children}</div>
        </main>
      </body>
    </html>
  );
}
