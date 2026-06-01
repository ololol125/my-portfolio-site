"use client"; // 클릭 이벤트 및 현재 경로 감지를 위해 클라이언트 컴포넌트로 선언합니다.

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 페이지 이동을 위해 useRouter를 추가합니다.

export default function Navbar() {
  const pathname = usePathname(); // 현재 사용자가 머물고 있는 URL 경로를 가져옵니다.
  const router = useRouter(); // 프로그래밍 방식으로 페이지를 이동하기 위해 사용합니다.

  // 모달 상태 및 비밀번호 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const CORRECT_PASSWORD =
    process.env.NEXT_PUBLIC_EXPERIENCE_PASSWORD || "123456";
  // 비밀번호가 6자리가 되면 자동으로 검증 로직 실행
  useEffect(() => {
    if (password.length === 6) {
      if (password === CORRECT_PASSWORD) {
        setIsModalOpen(false);
        setPassword("");
        router.push("/experience"); // 비밀번호가 맞으면 experience 페이지로 이동
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        setPassword(""); // 틀리면 입력값 초기화
      }
    }
  }, [password, router]);

  // 내비게이션 메뉴 데이터
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <>
      {/* 내비게이션 바 */}
      <nav className="sticky top-0 z-50 w-full py-6 flex gap-6 text-sm font-medium border-b border-gray-100 dark:border-zinc-900 bg-[var(--background)]/80 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const isExperience = item.path === "/experience";

          // 공통 스타일 클래스 생성
          const className = `transition-colors hover:text-black dark:hover:text-white text-left ${
            isActive
              ? "text-black dark:text-white font-semibold underline underline-offset-8 decoration-2"
              : "text-gray-400 dark:text-zinc-500"
          }`;

          // Experience 메뉴일 때는 바로 이동하지 않고 모달을 띄우는 버튼으로 렌더링
          if (isExperience) {
            return (
              <button
                key={item.path}
                onClick={() => setIsModalOpen(true)}
                className={className}
              >
                {item.name}
              </button>
            );
          }

          // 나머지 메뉴는 기존과 동일하게 Link 컴포넌트 사용
          return (
            <Link key={item.path} href={item.path} className={className}>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 비밀번호 입력 6자리 모달 팝업 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-2xl text-center max-w-xs w-full mx-4">
            <h3 className="text-lg font-bold mb-1 text-gray-950 dark:text-white">
              비밀번호 입력
            </h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mb-5">
              Experience 페이지에 진입하려면
              <br />
              비밀번호 6자리를 입력해주세요.
            </p>

            <input
              type="password"
              maxLength={6}
              value={password}
              // 숫자만 입력받도록 정규식 처리
              onChange={(e) =>
                setPassword(e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="••••••"
              className="border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 rounded-lg p-2 text-center text-2xl tracking-[0.5em] font-mono w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-950 dark:text-white"
              autoFocus
            />

            <button
              onClick={() => {
                setIsModalOpen(false);
                setPassword("");
              }}
              className="mt-5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
            >
              취소하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
