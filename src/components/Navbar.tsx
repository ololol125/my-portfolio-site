"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  // 💡 어떤 보호된 페이지로 가려는지 저장하는 상태 추가
  const [targetPath, setTargetPath] = useState("");

  // 상태 초기값은 클라이언트 사이드(useEffect)에서 localStorage를 읽어와서 설정합니다.
  const [wrongCount, setWrongCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockRemainingTime, setLockRemainingTime] = useState(0);

  const CORRECT_PASSWORD =
    process.env.NEXT_PUBLIC_EXPERIENCE_PASSWORD || "192837";
  const LOCK_DURATION = 5 * 60 * 1000; // 5분을 밀리초(ms) 단위로 계산 (300,000ms)

  // 1. 컴포넌트 마운트 시 localStorage에서 기존 기록 복구
  useEffect(() => {
    const savedCount = localStorage.getItem("exp_wrong_count");
    const savedLockUntil = localStorage.getItem("exp_lock_until");

    if (savedCount) {
      setWrongCount(parseInt(savedCount, 10));
    }

    if (savedLockUntil) {
      const lockUntil = parseInt(savedLockUntil, 10);
      const now = Date.now();

      if (lockUntil > now) {
        // 아직 잠금 시간이 남아있는 경우
        setIsLocked(true);
        setLockRemainingTime(Math.ceil((lockUntil - now) / 1000));
      } else {
        // 이미 잠금 시간이 지난 경우 만료 처리
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
        // 5분이 지나면 잠금 해제 및 상태 초기화
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

  // 3. 비밀번호 6자리 자동 검증 로직
  useEffect(() => {
    if (password.length === 6) {
      if (password === CORRECT_PASSWORD) {
        setIsModalOpen(false);
        setPassword("");
        setWrongCount(0);
        localStorage.setItem("exp_wrong_count", "0");
        localStorage.removeItem("exp_lock_until");

        // 💡 인증 성공 시, 미리 설정해둔 targetPath로 이동합니다.
        if (targetPath) {
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}초`;
  };

  // 보호할 페이지 목록을 핸들링하기 쉽게 도메인 관심사 분리
  const navItems = [
    { name: "Home", path: "/", protected: false },
    { name: "Experience", path: "/experience", protected: true },
    { name: "Projects", path: "/projects", protected: true }, // 💡 true로 변경
  ];

  return (
    <>
      {/* 내비게이션 바 */}
      <nav className="sticky top-0 z-50 w-full py-6 flex gap-6 text-sm font-medium border-b border-gray-100 dark:border-zinc-900 bg-[var(--background)]/80 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          const className = `transition-colors hover:text-black dark:hover:text-white text-left ${
            isActive
              ? "text-black dark:text-white font-semibold underline underline-offset-8 decoration-2"
              : "text-gray-400 dark:text-zinc-500"
          }`;

          // 💡 보호된 페이지인 경우 버튼으로 렌더링하고 모달을 띄웁니다.
          if (item.protected) {
            return (
              <button
                key={item.path}
                onClick={() => {
                  setTargetPath(item.path); // 가고자 하는 경로 지정
                  setIsModalOpen(true);
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

      {/* 비밀번호 입력 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-2xl text-center max-w-xs w-full mx-4">
            <h3 className="text-lg font-bold mb-1 text-gray-950 dark:text-white">
              비밀번호 입력
            </h3>

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
                {/* 💡 진입하려는 페이지에 맞춰 가변 메시지 출력 */}
                {targetPath === "/experience" ? "Experience" : "Projects"}{" "}
                페이지에 진입하려면
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
                setTargetPath("");
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
