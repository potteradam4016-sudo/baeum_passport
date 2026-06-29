"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/api/auth";

export function LogoutBookmark() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
    } finally {
      router.push("/");
    }
  }

  return (
    <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="passport-bookmark passport-logout-bookmark">
      <LogOut size={15} />
      <span>{isLoggingOut ? "처리 중" : "로그아웃"}</span>
    </button>
  );
}
