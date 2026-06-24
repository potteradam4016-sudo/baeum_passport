"use client";

import { ArrowLeft, Stamp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { representativeCountries } from "@/lib/countries";
import { loadState } from "@/lib/storage";

export default function StampPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(loadState().workbookCompleted);
  }, []);

  return (
    <DashboardShell>
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden p-4 lg:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-passport-stamp">Visa Stamp Collection</p>
            <h1 className="text-2xl font-black text-passport-navy lg:text-3xl">사증 페이지</h1>
          </div>
          <Link href="/worldmap" className="inline-flex h-10 items-center gap-2 rounded-md border border-passport-blue/25 px-3 text-sm font-bold text-passport-blue">
            <ArrowLeft size={17} />
            세계지도
          </Link>
        </div>
        <div className="scroll-area rounded-lg border border-passport-blue/15 bg-white/78 p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {representativeCountries.map((country) => {
              const active = completed.includes(country.name);
              return (
                <article key={country.name} className="flex h-44 flex-col items-center justify-center rounded-lg border border-passport-blue/15 bg-passport-paper p-4 text-center">
                  <div
                    className={`stamp-ring flex h-24 w-24 items-center justify-center ${
                      active ? "text-passport-stamp opacity-100" : "text-passport-ink/25 opacity-70"
                    }`}
                  >
                    {active ? <Stamp size={35} /> : <span className="text-3xl">{country.flag}</span>}
                  </div>
                  <p className="mt-4 font-black text-passport-navy">{country.name}</p>
                  <p className={`text-sm font-bold ${active ? "text-passport-stamp" : "text-passport-ink/45"}`}>
                    {active ? "도장 획득" : "학습지 대기"}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
