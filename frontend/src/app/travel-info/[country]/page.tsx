"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { loadState, saveState, type TravelCountryInfo } from "@/lib/storage";

const emptyInfo: TravelCountryInfo = {
  countryName: "",
  flagImage: "",
  displayName: "",
  area: "",
  population: "",
  language: "",
  capital: "",
  continent: "",
  mapImage: "",
};

export default function TravelInfoPage({ params }: { params: { country: string } }) {
  const router = useRouter();
  const countryName = decodeURIComponent(params.country);
  const [info, setInfo] = useState<TravelCountryInfo>({ ...emptyInfo, countryName, displayName: countryName });

  useEffect(() => {
    const saved = loadState().travelInfo[countryName];
    if (saved) setInfo(saved);
  }, [countryName]);

  function update(field: keyof TravelCountryInfo, value: string) {
    setInfo((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const current = loadState();
    saveState({
      ...current,
      travelInfo: { ...current.travelInfo, [countryName]: info },
    });
    router.push("/worldmap");
  }

  const fields: Array<[keyof TravelCountryInfo, string]> = [
    ["countryName", "국가명"],
    ["flagImage", "국기 이미지"],
    ["displayName", "국가 이름"],
    ["area", "면적"],
    ["population", "인구 수"],
    ["language", "사용 언어"],
    ["capital", "수도"],
    ["continent", "소속 대륙"],
    ["mapImage", "지도 이미지"],
  ];

  return (
    <DashboardShell>
      <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 flex-col overflow-hidden p-4 lg:p-5">
        <div className="mb-4">
          <p className="text-sm font-bold text-passport-stamp">Travel Country</p>
          <h1 className="text-2xl font-black text-passport-navy lg:text-3xl">{countryName} 여행국가 정보</h1>
        </div>
        <section className="scroll-area grid min-h-0 gap-4 rounded-lg border border-passport-blue/15 bg-white/78 p-5 md:grid-cols-2">
          {fields.map(([field, label]) => (
            <label key={field} className={field === "mapImage" ? "md:col-span-2" : ""}>
              <span className="text-sm font-bold text-passport-ink">{label}</span>
              <input
                value={info[field]}
                onChange={(event) => update(field, event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-passport-blue/20 bg-passport-paper px-3 outline-none focus:border-passport-blue"
                placeholder={field.includes("Image") ? "이미지 URL 또는 설명" : label}
              />
            </label>
          ))}
        </section>
        <button className="mt-4 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-passport-blue font-black text-white shadow transition hover:bg-passport-navy">
          <Save size={18} />
          저장하고 돌아가기
        </button>
      </form>
    </DashboardShell>
  );
}
