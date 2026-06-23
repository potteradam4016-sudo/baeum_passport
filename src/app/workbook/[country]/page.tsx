"use client";

import { BookOpenCheck, Home, Map, Shirt, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { findCountry } from "@/lib/countries";
import { addUnique, loadState, saveState } from "@/lib/storage";

export default function WorkbookPage({ params }: { params: { country: string } }) {
  const router = useRouter();
  const countryName = decodeURIComponent(params.country);
  const country = findCountry(countryName);
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(loadState().workbookNotes[countryName] ?? "");
  }, [countryName]);

  function completeWorkbook() {
    const current = loadState();
    saveState({
      ...current,
      workbookCompleted: addUnique(current.workbookCompleted, countryName),
      workbookNotes: { ...current.workbookNotes, [countryName]: note },
    });
    router.push("/stamp");
  }

  if (!country) {
    return (
      <DashboardShell>
        <div className="p-6 text-passport-navy">대표국가 학습지를 찾을 수 없습니다.</div>
      </DashboardShell>
    );
  }

  const cards = [
    { icon: Map, label: "지도", value: country.mapNote },
    { icon: Shirt, label: "전통 의상", value: country.clothing },
    { icon: Utensils, label: "전통 음식", value: country.food },
    { icon: Home, label: "전통 가옥", value: country.house },
  ];

  return (
    <DashboardShell>
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden p-4 lg:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-passport-stamp">Representative Workbook</p>
            <h1 className="text-2xl font-black text-passport-navy lg:text-3xl">{country.name} 학습지</h1>
          </div>
          <span className="text-5xl">{country.flag}</span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="scroll-area rounded-lg border border-passport-blue/15 bg-white/78 p-5">
            <h2 className="text-xl font-black text-passport-navy">국가 개요</h2>
            <p className="mt-3 leading-7 text-passport-ink/75">{country.overview}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Mini label="수도" value={country.capital} />
              <Mini label="언어" value={country.language} />
              <Mini label="면적" value={country.area} />
              <Mini label="인구" value={country.population} />
            </div>
            <div className="mt-5 grid gap-3">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="flex items-center gap-3 rounded-md bg-passport-paper p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-passport-blue text-white">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-passport-blue">{card.label}</p>
                      <p className="font-bold">{card.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="flex min-h-0 flex-col rounded-lg border border-passport-blue/15 bg-white/78 p-5">
            <h2 className="text-xl font-black text-passport-navy">내가 정리한 학습 내용</h2>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-4 min-h-0 flex-1 resize-none rounded-md border border-passport-blue/20 bg-passport-paper p-4 leading-7 outline-none focus:border-passport-blue"
              placeholder={`${country.name}에 대해 새롭게 알게 된 점을 적어 보세요.`}
            />
            <button onClick={completeWorkbook} className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-passport-stamp font-black text-white shadow transition hover:bg-passport-navy">
              <BookOpenCheck size={18} />
              작성 완료하고 사증 받기
            </button>
          </section>
        </div>
      </section>
    </DashboardShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-passport-blue/15 bg-passport-paper p-3">
      <p className="text-xs font-bold text-passport-blue">{label}</p>
      <p className="mt-1 font-black text-passport-ink">{value}</p>
    </div>
  );
}
