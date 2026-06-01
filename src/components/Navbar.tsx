"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [targetPath, setTargetPath] = useState("");

  const [wrongCount, setWrongCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockRemainingTime, setLockRemainingTime] = useState(0);

  const CORRECT_PASSWORD =
    process.env.NEXT_PUBLIC_EXPERIENCE_PASSWORD || "192837";
  const LOCK_DURATION = 5 * 60 * 1000;

  // 1. 컴포넌트 마운트 시 localStorage에서 기존 기록 복구
  useEffect(() => {
    const savedCount = localStorage.getItem("exp_wrong_count");
    const savedLockUntil = localStorage.getItem("exp_lock_until");

    if (savedCount) setWrongCount(parseInt(savedCount, 10));

    if (savedLockUntil) {
      const lockUntil = parseInt(savedLockUntil, 10);
      const now = Date.now();
      if (lockUntil > now) {
        setIsLocked(true);
        setLockRemainingTime(Math.ceil((lockUntil - now) / 1000));
      } else {
        localStorage.removeItem("exp_lock_until");
      }
    }
  }, []);

  // 2. 실시간 타이머 및 잠금 해제 체크 로직
  useEffect(() => {
    if (!isLocked) return;
    const timer = setInterval(() => {
      const savedLockUntil = localStorage.getItem("exp_lock_until");
      if (!savedLockUntil) {
        setIsLocked(false);
        clearInterval(timer);
        return;
      }
      const lockUntil = parseInt(savedLockUntil, 10);
      const now = Date.now();
      const timeLeft = lockUntil - now;

      if (timeLeft <= 0) {
        setIsLocked(false);
        setWrongCount(0);
        setLockRemainingTime(0);
        localStorage.removeItem("exp_lock_until");
        localStorage.setItem("exp_wrong_count", "0");
        clearInterval(timer);
      } else {
        setLockRemainingTime(Math.ceil(timeLeft / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked]);

  // 3. 비밀번호 검증 로직
  useEffect(() => {
    if (password.length === 6) {
      if (password === CORRECT_PASSWORD) {
        setIsModalOpen(false);
        setPassword("");
        setWrongCount(0);
        localStorage.setItem("exp_wrong_count", "0");
        localStorage.removeItem("exp_lock_until");

        // 💡 인증 성공 시 sessionStorage에 해당 경로 인증 완료 기록 (상세 페이지에서 새로고침 시 튕기지 않도록 방지)
        if (targetPath) {
          sessionStorage.setItem(`auth_${targetPath}`, "true");
          router.push(targetPath);
        }
      } else {
        const nextWrongCount = wrongCount + 1;
        setWrongCount(nextWrongCount);
        localStorage.setItem("exp_wrong_count", nextWrongCount.toString());
        setPassword("");

        if (nextWrongCount >= 5) {
          const lockUntilTime = Date.now() + LOCK_DURATION;
          setIsLocked(true);
          setLockRemainingTime(LOCK_DURATION / 1000);
          localStorage.setItem("exp_lock_until", lockUntilTime.toString());
          alert("비밀번호를 5회 잘못 입력하셨습니다. 5분간 입력이 제한됩니다.");
        } else {
          alert(
            `비밀번호가 일치하지 않습니다. (현재 틀린 횟수: ${nextWrongCount}/5)`,
          );
        }
      }
    }
  }, [
    password,
    wrongCount,
    CORRECT_PASSWORD,
    router,
    LOCK_DURATION,
    targetPath,
  ]);

  // 💡 [핵심] 외부 컴포넌트(카드 목록)에서 호출할 수 있는 글로벌 이벤트 리스너 등록
  useEffect(() => {
    const handleGlobalAuth = (e: Event) => {
      const customEvent = e as CustomEvent<{ path: string }>;
      if (customEvent.detail && customEvent.detail.path) {
        setTargetPath(customEvent.detail.path);
        setIsModalOpen(true);
      }
    };

    window.addEventListener("trigger-route-auth", handleGlobalAuth);
    return () =>
      window.removeEventListener("trigger-route-auth", handleGlobalAuth);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}초`;
  };

  const navItems = [
    { name: "Home", path: "/", protected: false },
    { name: "Experience", path: "/experience", protected: false },
    { name: "Projects", path: "/projects", protected: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full py-6 flex gap-6 text-sm font-medium border-b border-gray-100 dark:border-zinc-900 bg-[var(--background)]/80 backdrop-blur-md">
        {navItems.map((item) => {
          // Experience 상세 페이지(/experience/[id])에 있을 때도 Experience 메뉴에 언더라인이 유지되도록 startsWith 적용
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path));
          const className = `transition-colors hover:text-black dark:hover:text-white text-left ${
            isActive
              ? "text-black dark:text-white font-semibold underline underline-offset-8 decoration-2"
              : "text-gray-400 dark:text-zinc-500"
          }`;

          if (item.protected) {
            return (
              <button
                key={item.path}
                onClick={() => {
                  if (sessionStorage.getItem(`auth_${item.path}`) === "true") {
                    router.push(item.path);
                  } else {
                    setTargetPath(item.path);
                    setIsModalOpen(true);
                  }
                }}
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

      {/* 비밀번호 모달 UI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-2xl text-center max-w-xs w-full mx-4">
            <h3 className="text-lg font-bold mb-1 text-gray-950 dark:text-white">
              비밀번호 입력
            </h3>
            {isLocked ? (
              <p className="text-xs text-red-500 font-semibold mb-5">
                입력 횟수 초과. 5분간 제한됩니다. <br />
                <span className="text-sm font-bold">
                  {formatTime(lockRemainingTime)}
                </span>
              </p>
            ) : (
              <p className="text-xs text-gray-400 dark:text-zinc-500 mb-5">
                {targetPath.startsWith("/projects")
                  ? "Projects"
                  : "Experience 상세"}{" "}
                페이지 진입을 위해
                <br />
                비밀번호 6자리를 입력해주세요.
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
              disabled={isLocked}
              className="border border-gray-200 dark:border-zinc-700 rounded-lg p-2 text-center text-2xl tracking-[0.5em] font-mono w-full text-gray-950 dark:text-white bg-gray-50 dark:bg-zinc-800"
              autoFocus={!isLocked}
            />
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPassword("");
                setTargetPath("");
              }}
              className="mt-5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              취소하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
