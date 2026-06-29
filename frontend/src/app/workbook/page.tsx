"use client";

import { BookOpen, Compass, Globe2, MapPinned, PenLine, Stamp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoutBookmark } from "@/components/passport/LogoutBookmark";
import { countryPath, representativeCountries, workbookCountries, type RepresentativeCountry } from "@/lib/countries";

const selectableCountries = workbookCountries;
const bookmarkCountry = selectableCountries[0] ?? representativeCountries[0];

export default function WorkbookIndexPage() {
  return (
    <main className="passport-entry paper-surface flex h-screen items-center justify-center overflow-hidden p-4 sm:p-6">
      <section className="passport-book-open passport-soft-enter passport-explorer-book workbook-book" aria-label="학습지 국가 선택">
        <PassportBookmarks country={bookmarkCountry} />
        <LogoutBookmark />

        <div className="passport-page passport-page-left">
          <div className="passport-open-content justify-between gap-6">
            <header>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-passport-stamp">Workbook</p>
              <h1 className="mt-3 text-3xl font-black text-passport-navy">학습할 나라를 선택하세요</h1>
              <p className="mt-4 leading-7 text-passport-ink/72">
                배움여권의 학습지는 나라 이름만 정해져 있습니다. 나머지 정보는 직접 조사하고 기록해
                나만의 여행 기록으로 완성해 보세요.
              </p>
            </header>

            <div className="rounded-lg border border-passport-blue/15 bg-white/62 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-passport-blue text-white">
                  <Compass size={22} />
                </span>
                <div>
                  <p className="text-sm font-black text-passport-navy">여행 규칙</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-passport-ink/65">
                    국가명 외의 수도, 언어, 인구, 지도, 국기는 모두 조사해서 직접 채웁니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="passport-map-watermark">
              <PenLine size={150} />
            </div>
          </div>
        </div>

        <div className="passport-page passport-page-right">
          <div className="passport-open-content gap-4">
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-passport-stamp">Country List</p>
                <h2 className="mt-2 text-2xl font-black text-passport-navy">대표 국가</h2>
              </div>
              <BookOpen className="text-passport-blue/35" size={34} />
            </header>

            <div className="scroll-area min-h-0 flex-1 pr-1">
              <div className="grid grid-cols-2 gap-3">
                {selectableCountries.map((country) => (
                  <CountryCard key={country.name} country={country} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CountryCard({ country }: { country: RepresentativeCountry }) {
  return (
    <Link
      href={`/workbook/${countryPath(country.name)}`}
      className="group rounded-md border border-passport-blue/15 bg-white/72 p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-passport-gold hover:bg-white hover:shadow"
    >
      <span className="relative mx-auto block h-14 w-20 overflow-hidden rounded border border-passport-blue/10">
        <Image src={country.flagImage} alt={`${country.name} 국기`} fill sizes="80px" className="object-cover" />
      </span>
      <span className="mt-3 block text-sm font-black text-passport-navy">{country.name}</span>
    </Link>
  );
}

function PassportBookmarks({ country }: { country: RepresentativeCountry }) {
  const encodedCountry = countryPath(country.name);
  const items = [
    { label: "세계지도", href: "/worldmap", active: false, icon: Globe2 },
    { label: "사증", href: "/stamp", active: false, icon: Stamp },
    { label: "학습지", href: "/workbook", active: true, icon: BookOpen },
    { label: "여행정보", href: "/travel-info", active: false, icon: MapPinned },
  ];

  return (
    <nav className="passport-bookmarks" aria-label="여권 책갈피">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link key={item.label} href={item.href} className={`passport-bookmark ${item.active ? "is-active" : ""}`}>
            <Icon size={15} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
