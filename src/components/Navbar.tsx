"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // 기본 모달 및 비밀번호 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  // 추가된 상태: 틀린 횟수 및 잠금 기능 관련
  const [wrongCount, setWrongCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockRemainingTime, setLockRemainingTime] = useState(0); // 남은 시간 (초 단위)

  const CORRECT_PASSWORD =
    process.env.NEXT_PUBLIC_EXPERIENCE_PASSWORD || "123456";
  const LOCK_DURATION = 5 * 60; // 제한 시간: 5분 (300초)

  // 1. 타이머 카운트다운 로직
  useEffect(() => {
    if (!isLocked || lockRemainingTime <= 0) return;

    const timer = setInterval(() => {
      setLockRemainingTime((prev) => {
        if (prev <= 1) {
          // 5분이 모두 지나면 잠금 해제 및 틀린 횟수 초기화
          setIsLocked(false);
          setWrongCount(0);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, lockRemainingTime]);

  // 2. 비밀번호 6자리 자동 검증 로직
  useEffect(() => {
    if (password.length === 6) {
      if (password === CORRECT_PASSWORD) {
        setIsModalOpen(false);
        setPassword("");
        setWrongCount(0); // 성공 시 틀린 횟수 리셋
        router.push("/experience");
      } else {
        const nextWrongCount = wrongCount + 1;
        setWrongCount(nextWrongCount);
        setPassword(""); // 입력창 비우기

        if (nextWrongCount >= 5) {
          setIsLocked(true);
          setLockRemainingTime(LOCK_DURATION);
          alert("비밀번호를 5회 잘못 입력하셨습니다. 5분간 입력이 제한됩니다.");
        } else {
          alert(
            `비밀번호가 일치하지 않습니다. (현재 틀린 횟수: ${nextWrongCount}/5)`,
          );
        }
      }
    }
  }, [password, wrongCount, CORRECT_PASSWORD, router]);

  // 남은 시간을 분:초 형태로 포맷팅하는 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}초`;
  };

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

          const className = `transition-colors hover:text-black dark:hover:text-white text-left ${
            isActive
              ? "text-black dark:text-white font-semibold underline underline-offset-8 decoration-2"
              : "text-gray-400 dark:text-zinc-500"
          }`;

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

          return (
            <Link key={item.path} href={item.path} className={className}>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 비밀번호 입력 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-2xl text-center max-w-xs w-full mx-4">
            <h3 className="text-lg font-bold mb-1 text-gray-950 dark:text-white">
              비밀번호 입력
            </h3>

            {/* 잠금 상태에 따른 가이드 메시지 분기 처리 */}
            {isLocked ? (
              <p className="text-xs text-red-500 font-semibold mb-5 leading-relaxed">
                입력 횟수가 초과되었습니다.
                <br />
                <span className="text-sm font-bold">
                  {formatTime(lockRemainingTime)}
                </span>{" "}
                후에 다시 시도하세요.
              </p>
            ) : (
              <p className="text-xs text-gray-400 dark:text-zinc-500 mb-5 leading-relaxed">
                Experience 페이지에 진입하려면
                <br />
                비밀번호 6자리를 입력해주세요.
                <br />
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                  (오류 횟수: {wrongCount}/5)
                </span>
              </p>
            )}

            <input
              type="password"
              maxLength={6}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="••••••"
              // 잠금 상태일 때는 input 창을 비활성화(disabled)시킵니다.
              disabled={isLocked}
              className={`border border-gray-200 dark:border-zinc-700 rounded-lg p-2 text-center text-2xl tracking-[0.5em] font-mono w-full focus:outline-none focus:ring-2 text-gray-950 dark:text-white ${
                isLocked
                  ? "bg-gray-100 dark:bg-zinc-800/50 text-gray-400 dark:text-zinc-600 cursor-not-allowed border-dashed"
                  : "bg-gray-50 dark:bg-zinc-800 focus:ring-black dark:focus:ring-white"
              }`}
              autoFocus={!isLocked}
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
