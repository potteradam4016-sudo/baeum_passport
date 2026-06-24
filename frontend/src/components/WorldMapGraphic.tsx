import type { CSSProperties, KeyboardEvent } from "react";
import Image from "next/image";
import type { ContinentKey } from "@/lib/countries";
import { continents } from "@/lib/countries";

type WorldMapGraphicProps = {
  selected: ContinentKey;
  onSelect: (continent: ContinentKey) => void;
};

const continentAreas: Array<{
  key: ContinentKey;
  label: string;
  d: string;
  labelPosition: CSSProperties;
}> = [
  {
    key: "northAmerica",
    label: "북미",
    d: "M3 23 C9 16 18 11 29 11 C37 11 42 17 43 25 C44 31 39 36 34 40 C29 44 27 53 22 57 C17 60 11 55 9 47 C8 41 3 36 2 31 C1 28 1 25 3 23 Z",
    labelPosition: { left: "20%", top: "36%" },
  },
  {
    key: "southAmerica",
    label: "남미",
    d: "M28 52 C34 52 39 59 39 68 C39 77 33 86 29 95 C25 89 23 80 23 72 C23 64 24 56 28 52 Z",
    labelPosition: { left: "31%", top: "71%" },
  },
  {
    key: "europe",
    label: "유럽",
    d: "M42 26 C47 22 55 22 59 27 C62 31 59 36 54 39 C49 42 43 38 40 33 C38 30 39 28 42 26 Z",
    labelPosition: { left: "49%", top: "31%" },
  },
  {
    key: "africa",
    label: "아프리카",
    d: "M43 40 C50 36 58 40 61 48 C64 59 59 75 50 84 C44 78 40 67 40 56 C39 49 40 43 43 40 Z",
    labelPosition: { left: "50%", top: "59%" },
  },
  {
    key: "asia",
    label: "아시아",
    d: "M56 21 C66 13 82 13 96 23 C99 32 96 43 89 50 C83 56 76 61 68 58 C61 56 55 48 55 40 C55 33 52 26 56 21 Z",
    labelPosition: { left: "73%", top: "36%" },
  },
  {
    key: "oceania",
    label: "오세아니아",
    d: "M77 63 C84 58 93 61 96 70 C99 78 92 85 83 84 C76 82 73 70 77 63 Z",
    labelPosition: { left: "84%", top: "73%" },
  },
];

function handleKeySelect(event: KeyboardEvent<SVGGElement>, select: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    select();
  }
}

export function WorldMapGraphic({ selected, onSelect }: WorldMapGraphicProps) {
  return (
    <div
      className="relative h-full min-h-[300px] w-full overflow-hidden rounded-md border border-passport-blue/15 bg-[#dbe9ed]"
      role="img"
      aria-label="실제 세계지도 이미지 기반 대륙 선택 지도"
    >
      <Image
        src="/images/world_map.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-passport-blue/5" aria-hidden="true" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-label="대륙 선택 영역"
      >
        {continentAreas.map((area) => {
          const active = selected === area.key;

          return (
            <g
              key={area.key}
              role="button"
              tabIndex={0}
              aria-label={`${area.label} 선택`}
              className={`continent-hotspot ${active ? "is-active" : ""}`}
              onClick={() => onSelect(area.key)}
              onKeyDown={(event) => handleKeySelect(event, () => onSelect(area.key))}
            >
              <path d={area.d} className="continent-area-shape" />
            </g>
          );
        })}
      </svg>

      {continentAreas.map((area) => {
        const active = selected === area.key;
        const color = continents[area.key].color;

        return (
          <span
            key={area.key}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-black text-white shadow transition"
            style={{
              ...area.labelPosition,
              backgroundColor: active ? color : "rgba(16, 42, 95, 0.72)",
              boxShadow: active ? `0 0 0 3px ${color}, 0 14px 30px rgba(16, 42, 95, 0.2)` : undefined,
            }}
          >
            {area.label}
          </span>
        );
      })}
    </div>
  );
}
