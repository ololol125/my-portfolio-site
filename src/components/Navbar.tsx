"use client"; // 클릭 이벤트 및 현재 경로 감지를 위해 클라이언트 컴포넌트로 선언합니다.

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; //

export default function Navbar() {
  const pathname = usePathname(); // 현재 사용자가 머물고 있는 URL 경로를 가져옵니다.

  // 내비게이션 메뉴 데이터
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
  ]; //

  return (
    // sticky top-0 z-50 클래스를 추가하여 상단에 고정하고, 본문 글씨와 겹치지 않게 배경색과 backdrop-blur 효과를 주었습니다.
    <nav className="sticky top-0 z-50 w-full py-6 flex gap-6 text-sm font-medium border-b border-gray-100 dark:border-zinc-900 bg-[var(--background)]/80 backdrop-blur-md">
      {navItems.map((item) => {
        // 현재 머물고 있는 페이지의 메뉴라면 글자 색상을 진하게 만들어 강조 효과를 줍니다.
        const isActive = pathname === item.path; //

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-colors hover:text-black dark:hover:text-white ${
              isActive
                ? "text-black dark:text-white font-semibold underline underline-offset-8 decoration-2"
                : "text-gray-400 dark:text-zinc-500"
            }`}
          >
            {item.name}
          </Link>
        ); //
      })}
    </nav>
  );
}
