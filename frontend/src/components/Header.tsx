"use client";

import { LogOut, Stamp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, logout, type AuthUser } from "@/lib/api/auth";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    getMe().then(setUser).catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/15 bg-passport-navy px-5 text-white">
      <Link href="/worldmap" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-passport-gold/70 bg-white/10 text-passport-gold">
          <Stamp size={22} />
        </span>
        <div>
          <p className="text-lg font-bold leading-tight">배움여권</p>
          <p className="text-xs text-blue-100">Learning Passport</p>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">{user?.name ?? "여행가"}</p>
          <p className="text-xs text-blue-100">세계 여행 준비 완료</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-passport-gold/70 bg-passport-paper text-lg">
          🧑‍🎓
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-white/20 px-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">로그아웃</span>
        </button>
      </div>
    </header>
  );
}
