import type { CSSProperties } from "react";
import Image from "next/image";
import type { ContinentKey } from "@/lib/countries";
import { continents } from "@/lib/countries";

type WorldMapGraphicProps = {
  selected: ContinentKey | null;
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
    label: "북아메리카",
    d: "M1018 186 C1082 128 1190 112 1284 136 C1360 156 1418 216 1410 292 C1402 372 1332 426 1256 456 C1196 480 1164 526 1108 516 C1056 506 1028 462 1014 410 C998 350 972 300 990 246 C996 222 1006 202 1018 186 Z M1220 122 C1250 113 1288 116 1318 130 C1282 148 1244 146 1220 122 Z",
    labelPosition: { left: "70%", top: "40%" },
  },
  {
    key: "southAmerica",
    label: "남아메리카",
    d: "M1232 590 C1282 584 1338 614 1356 662 C1383 724 1348 784 1316 830 C1298 858 1292 896 1270 918 C1248 888 1246 842 1230 802 C1214 760 1200 720 1210 672 C1218 636 1212 608 1232 590 Z",
    labelPosition: { left: "84%", top: "73%" },
  },
  {
    key: "europe",
    label: "유럽",
    d: "M92 278 C138 235 216 224 278 248 C328 268 345 318 314 360 C280 406 204 408 138 390 C84 376 56 330 92 278 Z M344 288 C376 278 408 288 422 312 C398 332 366 326 344 288 Z",
    labelPosition: { left: "10%", top: "38%" },
  },
  {
    key: "africa",
    label: "아프리카",
    d: "M80 446 C130 418 226 428 284 484 C340 538 322 632 270 704 C232 756 176 776 136 738 C104 708 100 654 80 602 C58 546 48 482 80 446 Z M338 648 C360 646 374 668 368 696 C362 726 338 742 318 732 C334 708 342 680 338 648 Z",
    labelPosition: { left: "16%", top: "58%" },
  },
  {
    key: "asia",
    label: "아시아",
    d: "M280 184 C390 134 568 158 680 220 C744 256 758 330 704 394 C660 446 654 514 600 560 C548 606 478 592 446 536 C420 486 360 474 320 436 C272 388 236 322 246 266 C252 232 264 202 280 184 Z M468 632 C512 628 560 656 574 694 C528 698 484 676 468 632 Z M626 630 C680 624 728 660 752 700 C694 698 652 672 626 630 Z",
    labelPosition: { left: "39%", top: "44%" },
  },
  {
    key: "oceania",
    label: "오세아니아",
    d: "M626 742 C676 704 748 706 796 752 C832 786 824 838 776 864 C720 894 642 872 616 822 C600 788 604 764 626 742 Z M832 866 C854 850 880 864 878 894 C856 906 834 894 832 866 Z M710 910 C724 908 736 920 730 936 C716 938 706 926 710 910 Z",
    labelPosition: { left: "46%", top: "75%" },
  },
];

export function WorldMapGraphic({ selected, onSelect }: WorldMapGraphicProps) {
  return (
    <div
      className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-passport-blue/15 bg-[#dbe9ed]"
      role="img"
      aria-label="세계지도 이미지 기반 대륙 선택 지도"
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

      {continentAreas.map((area) => {
        const active = selected === area.key;
        const color = continents[area.key].color;

        return (
          <button
            type="button"
            key={area.key}
            onClick={() => onSelect(area.key)}
            className="absolute min-h-9 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-black text-white shadow transition hover:scale-105 hover:bg-passport-gold focus:outline-none focus:ring-2 focus:ring-passport-gold"
            style={{
              ...area.labelPosition,
              backgroundColor: active ? color : "rgba(16, 42, 95, 0.72)",
              boxShadow: active ? `0 0 0 3px ${color}, 0 14px 30px rgba(16, 42, 95, 0.2)` : undefined,
            }}
          >
            {area.label}
          </button>
        );
      })}
    </div>
  );
}
