import type { Metadata } from "next";
import "./globals.css"; // 우리가 만든 글로벌 CSS 스타일을 불러옵니다.

// 1. 웹사이트의 메타데이터(SEO) 설정
// 구글 검색엔진이나 카카오톡 링크 공유(Open Graph) 시 노출되는 정보입니다.
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
    // lang="ko"로 설정하여 한국어 기반 웹사이트임을 브라우저에 알립니다.
    <html lang="ko">
      <body className="antialiased selection:bg-gray-200 dark:selection:bg-zinc-800">
        {/* children 영역에 우리가 page.tsx에 만든 내용(Hero, Projects 등)이 
          쏙 들어가서 화면에 렌더링됩니다! 
        */}
        {children}
      </body>
    </html>
  );
}
