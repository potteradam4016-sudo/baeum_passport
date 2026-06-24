"use client";

import { useEffect, useRef, useState } from "react";
import { PassportCover } from "@/components/passport/PassportCover";
import { PassportOpen } from "@/components/passport/PassportOpen";

export type PassportMode = "login" | "signup";

export default function HomePage() {
  const [mode, setMode] = useState<PassportMode | null>(null);
  const [pendingMode, setPendingMode] = useState<PassportMode | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  function startTransition(nextMode: PassportMode) {
    if (pendingMode) return;
    setPendingMode(nextMode);
    transitionTimerRef.current = setTimeout(() => {
      setMode(nextMode);
      setPendingMode(null);
    }, 260);
  }

  function changeMode(nextMode: PassportMode | null) {
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    setPendingMode(null);
    setMode(nextMode);
  }

  return (
    <main className="passport-entry paper-surface flex h-screen items-center justify-center overflow-hidden p-4 sm:p-6">
      <div className="passport-stage">
        {mode ? (
          <PassportOpen mode={mode} onModeChange={changeMode} />
        ) : (
          <PassportCover onSelect={startTransition} isTransitioning={Boolean(pendingMode)} />
        )}
      </div>
    </main>
  );
}
