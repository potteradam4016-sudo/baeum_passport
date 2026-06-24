"use client";

import { CheckCircle2, Mic, Palette } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { findCountry } from "@/lib/countries";
import { addUnique, loadState, saveState } from "@/lib/storage";

export default function ImmigrationPage({ params }: { params: { country: string } }) {
  const router = useRouter();
  const countryName = decodeURIComponent(params.country);
  const country = findCountry(countryName);
  const [greeting, setGreeting] = useState("");
  const [selectedColor, setSelectedColor] = useState("#b43b4a");
  const [flagColors, setFlagColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(loadState().immigrationCompleted.includes(countryName));
  }, [countryName]);

  function completeImmigration() {
    const current = loadState();
    const next = { ...current, immigrationCompleted: addUnique(current.immigrationCompleted, countryName) };
    saveState(next);
    setCompleted(true);
    router.push("/worldmap");
  }

  if (!country) {
    return (
      <DashboardShell>
        <div className="p-6 text-passport-navy">대표국가 정보를 찾을 수 없습니다.</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-[0.85fr_1.15fr] lg:p-5">
        <aside className="rounded-lg border border-passport-blue/15 bg-white/78 p-5">
          <p className="text-sm font-bold text-passport-stamp">Immigration Check</p>
          <h1 className="mt-2 text-3xl font-black text-passport-navy">{country.name} 입국심사</h1>
          <div className="mt-6 flex items-center gap-4 rounded-lg bg-passport-paper p-4">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <p className="font-bold">{country.capital}</p>
              <p className="text-sm text-passport-ink/65">{country.language}</p>
              <p className="mt-2 text-lg font-black text-passport-blue">{country.greeting}</p>
            </div>
          </div>
          {completed && (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-passport-teal/12 p-3 font-bold text-passport-teal">
              <CheckCircle2 size={18} />
              입국심사 완료
            </div>
          )}
        </aside>

        <div className="scroll-area grid min-h-0 gap-4 pr-1">
          <section className="rounded-lg border border-passport-blue/15 bg-white/78 p-5">
            <div className="flex items-center gap-2">
              <Mic className="text-passport-blue" />
              <h2 className="text-xl font-black text-passport-navy">인사 따라하기</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[auto_1fr]">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-passport-blue px-4 font-bold text-white">
                <Mic size={18} />
                음성 입력
              </button>
              <input
                value={greeting}
                onChange={(event) => setGreeting(event.target.value)}
                className="h-12 rounded-md border border-passport-blue/20 px-3 outline-none focus:border-passport-blue"
                placeholder={`${country.greeting} 를 따라 써 보세요`}
              />
            </div>
          </section>

          <section className="rounded-lg border border-passport-blue/15 bg-white/78 p-5">
            <div className="flex items-center gap-2">
              <Palette className="text-passport-stamp" />
              <h2 className="text-xl font-black text-passport-navy">국기 색칠하기</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["#b43b4a", "#3156a3", "#ffffff", "#111827", "#d6a83b", "#1c8d8a"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-9 w-9 rounded-full border-2 ${selectedColor === color ? "border-passport-navy" : "border-white"}`}
                  style={{ backgroundColor: color }}
                  aria-label={`${color} 선택`}
                />
              ))}
            </div>
            <div className="mt-5 overflow-hidden rounded-lg border-4 border-passport-ink/20">
              {flagColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setFlagColors((colors) => colors.map((item, itemIndex) => (itemIndex === index ? selectedColor : item)))}
                  className="h-24 w-1/3 border-r border-passport-ink/10 last:border-r-0"
                  style={{ backgroundColor: color }}
                  aria-label={`국기 영역 ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <button onClick={completeImmigration} className="h-12 rounded-md bg-passport-stamp font-black text-white shadow transition hover:bg-passport-navy">
            완료하고 세계지도로 돌아가기
          </button>
        </div>
      </section>
    </DashboardShell>
  );
}
