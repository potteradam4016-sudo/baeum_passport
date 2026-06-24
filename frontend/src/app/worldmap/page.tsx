"use client";

import { CheckCircle2, Plus, Stamp } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { Sidebar } from "@/components/Sidebar";
import { WorldMapGraphic } from "@/components/WorldMapGraphic";
import { continents, countryPath, representativeCountries, type ContinentKey } from "@/lib/countries";
import { addUnique, loadState, saveState, type PassportState } from "@/lib/storage";

export default function WorldMapPage() {
  const [selectedContinent, setSelectedContinent] = useState<ContinentKey>("asia");
  const [activeTab, setActiveTab] = useState<"travel" | "visited">("travel");
  const [state, setState] = useState<PassportState | null>(null);
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    setState(loadState());
  }, []);

  const continent = continents[selectedContinent];
  const visitedCountries = useMemo(() => {
    return [...representativeCountries.map((country) => country.name), ...(state?.addedCountries ?? [])];
  }, [state?.addedCountries]);

  function addCountry() {
    const trimmed = newCountry.trim();
    if (!trimmed || !state) return;
    const next = { ...state, addedCountries: addUnique(state.addedCountries, trimmed) };
    saveState(next);
    setState(next);
    setNewCountry("");
    setActiveTab("visited");
  }

  return (
    <DashboardShell>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden p-4 lg:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-passport-stamp">World Dashboard</p>
            <h1 className="text-2xl font-black text-passport-navy lg:text-3xl">세계지도</h1>
          </div>
          <Link href="/stamp" className="inline-flex h-10 items-center gap-2 rounded-md bg-passport-stamp px-4 text-sm font-bold text-white">
            <Stamp size={17} />
            사증 보기
          </Link>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="flex min-h-0 flex-col rounded-lg border border-passport-blue/15 bg-white/70 p-3">
            <div className="min-h-0 flex-1">
              <WorldMapGraphic selected={selectedContinent} onSelect={setSelectedContinent} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
              <button onClick={() => setActiveTab("travel")} className={`h-10 rounded-md text-sm font-bold ${activeTab === "travel" ? "bg-passport-blue text-white" : "bg-white text-passport-blue"}`}>
                세계 여행
              </button>
              <button onClick={() => setActiveTab("visited")} className={`h-10 rounded-md text-sm font-bold ${activeTab === "visited" ? "bg-passport-blue text-white" : "bg-white text-passport-blue"}`}>
                방문 국가
              </button>
            </div>
          </div>

          <aside className="grid min-h-0 gap-4 overflow-hidden lg:grid-rows-[auto_1fr]">
            <section className="rounded-lg border border-passport-blue/15 bg-white/78 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-passport-navy">{continent.name}</h2>
                <span className="rounded-md px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: continent.color }}>
                  대륙 정보
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Info label="인구" value={continent.population} />
                <Info label="면적" value={continent.area} />
                <Info label="국가" value={`${continent.countryCount}개`} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {continent.countries.map((country) => (
                  <span key={country} className="rounded-full border border-passport-blue/20 bg-passport-paper px-3 py-1 text-sm font-bold">
                    {country}
                  </span>
                ))}
              </div>
            </section>

            <section className="flex min-h-0 flex-col rounded-lg border border-passport-blue/15 bg-white/78 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-passport-navy">{activeTab === "travel" ? "세계여행" : "방문국가"}</h2>
                {activeTab === "visited" && (
                  <div className="flex min-w-0 gap-2">
                    <input
                      value={newCountry}
                      onChange={(event) => setNewCountry(event.target.value)}
                      className="h-9 min-w-0 rounded-md border border-passport-blue/20 px-3 text-sm outline-none focus:border-passport-blue"
                      placeholder="국가 추가"
                    />
                    <button onClick={addCountry} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-passport-blue text-white" aria-label="국가 추가">
                      <Plus size={18} />
                    </button>
                  </div>
                )}
              </div>
              <div className="scroll-area grid gap-2 pr-1">
                {activeTab === "travel"
                  ? representativeCountries.map((country) => (
                      <Link key={country.name} href={`/immi/${countryPath(country.name)}`} className="flex items-center justify-between rounded-md border border-passport-blue/15 bg-passport-paper p-3 transition hover:border-passport-blue">
                        <span className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <span>
                            <b>{country.name}</b>
                            <span className="ml-2 text-sm text-passport-ink/60">{continents[country.continent].name}</span>
                          </span>
                        </span>
                        {state?.immigrationCompleted.includes(country.name) && <CheckCircle2 className="text-passport-teal" size={20} />}
                      </Link>
                    ))
                  : visitedCountries.map((countryName) => {
                      const isRepresentative = representativeCountries.some((country) => country.name === countryName);
                      const href = isRepresentative ? `/workbook/${countryPath(countryName)}` : `/travel-info/${countryPath(countryName)}`;
                      return (
                        <Link key={countryName} href={href} className="flex items-center justify-between rounded-md border border-passport-blue/15 bg-passport-paper p-3 transition hover:border-passport-blue">
                          <span>
                            <b>{countryName}</b>
                            <span className="ml-2 text-xs font-bold text-passport-stamp">{isRepresentative ? "대표국가" : "추가국가"}</span>
                          </span>
                          {state?.immigrationCompleted.includes(countryName) && <CheckCircle2 className="text-passport-teal" size={20} />}
                        </Link>
                      );
                    })}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </DashboardShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-passport-blue/10 p-3">
      <p className="text-xs font-bold text-passport-blue">{label}</p>
      <p className="mt-1 text-sm font-black text-passport-ink">{value}</p>
    </div>
  );
}
