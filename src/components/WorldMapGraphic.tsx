import type { ContinentKey } from "@/lib/countries";
import { continents } from "@/lib/countries";

type WorldMapGraphicProps = {
  selected: ContinentKey;
  onSelect: (continent: ContinentKey) => void;
};

const shapes: Array<{
  key: ContinentKey;
  label: string;
  d: string;
  text: { x: number; y: number };
}> = [
  {
    key: "northAmerica",
    label: "북미",
    d: "M79 118 C116 64 186 69 224 102 C260 132 237 178 199 190 C160 204 91 185 79 118Z",
    text: { x: 155, y: 133 },
  },
  {
    key: "southAmerica",
    label: "남미",
    d: "M226 228 C272 231 300 267 288 320 C279 361 250 398 222 384 C194 371 196 321 207 286 C213 265 210 245 226 228Z",
    text: { x: 246, y: 311 },
  },
  {
    key: "europe",
    label: "유럽",
    d: "M369 105 C402 81 458 88 481 118 C503 147 474 178 427 176 C381 174 344 139 369 105Z",
    text: { x: 423, y: 133 },
  },
  {
    key: "africa",
    label: "아프리카",
    d: "M408 189 C460 166 519 199 533 250 C548 304 515 367 465 356 C424 347 395 295 388 248 C384 221 387 198 408 189Z",
    text: { x: 462, y: 267 },
  },
  {
    key: "asia",
    label: "아시아",
    d: "M493 111 C550 60 676 83 724 143 C770 200 717 258 644 248 C589 240 527 225 490 190 C464 165 459 141 493 111Z",
    text: { x: 607, y: 166 },
  },
  {
    key: "oceania",
    label: "오세아니아",
    d: "M646 318 C686 294 743 306 760 344 C775 379 728 399 682 390 C641 382 614 340 646 318Z",
    text: { x: 698, y: 352 },
  },
];

export function WorldMapGraphic({ selected, onSelect }: WorldMapGraphicProps) {
  return (
    <svg
      viewBox="0 0 840 460"
      className="h-full min-h-[300px] w-full rounded-md border border-passport-blue/15 bg-[#dbe9ed]"
      role="img"
      aria-label="클릭 가능한 단순화 세계지도"
    >
      <rect width="840" height="460" fill="#dbe9ed" />
      <path d="M0 335 C160 300 258 390 420 352 C578 316 690 350 840 314 L840 460 L0 460Z" fill="#c9dde0" />
      {shapes.map((shape) => {
        const active = selected === shape.key;
        return (
          <g
            key={shape.key}
            onClick={() => onSelect(shape.key)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onSelect(shape.key);
            }}
            role="button"
            tabIndex={0}
            aria-label={shape.label}
            className="cursor-pointer outline-none"
          >
            <path
              d={shape.d}
              fill={continents[shape.key].color}
              opacity={active ? 1 : 0.72}
              stroke={active ? "#102a5f" : "#ffffff"}
              strokeWidth={active ? 5 : 3}
              className="transition hover:opacity-100"
            />
            <text
              x={shape.text.x}
              y={shape.text.y}
              textAnchor="middle"
              className="pointer-events-none fill-white text-[22px] font-bold"
            >
              {shape.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
