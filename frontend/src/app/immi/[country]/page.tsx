"use client";

import { ArrowLeft, ClipboardCheck, Plane } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { findCountry, isWorkbookEligibleCountry } from "@/lib/countries";

export default function ImmigrationPage({ params }: { params: { country: string } }) {
  const router = useRouter();
  const countryName = decodeURIComponent(params.country);
  const country = findCountry(countryName);

  useEffect(() => {
    if (country && !isWorkbookEligibleCountry(country)) {
      router.replace("/worldmap");
    }
  }, [country, router]);

  if (!country || !isWorkbookEligibleCountry(country)) {
    return (
      <main className="passport-entry paper-surface flex h-screen items-center justify-center overflow-hidden p-6">
        <section className="w-full max-w-3xl rounded-xl border border-passport-blue/15 bg-passport-paper p-8 text-center shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-passport-stamp">Immigration Check</p>
          <h1 className="mt-3 text-3xl font-black text-passport-navy">입국심사 대상 국가가 아닙니다</h1>
          <Link
            href="/worldmap"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-passport-navy px-5 font-black text-white shadow transition hover:bg-passport-blue"
          >
            <ArrowLeft size={18} />
            세계지도로 돌아가기
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="passport-entry paper-surface flex h-screen items-center justify-center overflow-hidden p-6">
      <section className="relative flex h-[min(920px,calc(100vh-48px))] w-[min(1560px,calc(100vw-64px))] flex-col overflow-hidden rounded-2xl border border-passport-blue/20 bg-passport-paper shadow-2xl">
        <header className="flex items-center justify-between border-b border-passport-blue/15 bg-white/55 px-8 py-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-passport-stamp">Immigration Check</p>
            <h1 className="mt-2 text-4xl font-black text-passport-navy">{country.name} 입국심사</h1>
          </div>
          <Link
            href="/worldmap"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-passport-blue/20 px-4 text-sm font-bold text-passport-blue transition hover:bg-passport-blue/10"
          >
            <ArrowLeft size={17} />
            세계지도
          </Link>
        </header>

        <section className="relative flex min-h-0 flex-1 items-center justify-center p-8 text-center">
          <div className="absolute inset-0 flex items-center justify-center text-passport-blue/[0.04]" aria-hidden="true">
            <Plane size={420} strokeWidth={1.2} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-passport-gold/45 bg-passport-gold/10 text-passport-stamp">
              <ClipboardCheck size={42} strokeWidth={1.8} />
            </span>
            <h2 className="mt-8 text-4xl font-black text-passport-navy">입국심사 준비 중</h2>
            <p className="mt-5 text-lg font-bold leading-8 text-passport-ink/72">이 화면은 이후 입국심사 활동을 진행할 큰 전용 창입니다. 현재는 페이지 이동과 기본 창만 구현되어 있습니다.</p>
          </div>
        </section>
      </section>
    </main>
  );
}
