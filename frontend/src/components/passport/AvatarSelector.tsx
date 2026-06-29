"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";

const avatarOptions = {
  남: ["male1.png", "male2.png", "male3.png"],
  여: ["female1.png", "female2.png", "female3.png"],
} as const;

type AvatarGender = keyof typeof avatarOptions;

function isAvatarGender(gender: string): gender is AvatarGender {
  return gender === "남" || gender === "여";
}

export function AvatarSelector({
  gender,
  value,
  onChange,
}: {
  gender: string;
  value: string;
  onChange: (avatar: string) => void;
}) {
  const options = useMemo(() => (isAvatarGender(gender) ? avatarOptions[gender] : []), [gender]);

  useEffect(() => {
    if (options.length === 0) {
      if (value) onChange("");
      return;
    }

    if (!(options as readonly string[]).includes(value)) {
      onChange(options[0]);
    }
  }, [onChange, options, value]);

  return (
    <section className="rounded-md border border-passport-blue/15 bg-white/62 p-3">
      <p className="text-sm font-black text-passport-blue">아바타 선택</p>
      {options.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {options.map((avatar) => {
            const selected = value === avatar;

            return (
              <button
                key={avatar}
                type="button"
                onClick={() => onChange(avatar)}
                className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-md border bg-passport-paper transition ${
                  selected ? "scale-[1.04] border-passport-blue shadow-md ring-2 ring-passport-blue/25" : "border-passport-blue/15 hover:border-passport-blue/55"
                }`}
                aria-pressed={selected}
              >
                <Image src={`/images/character/${avatar}`} alt={`${avatar} 아바타`} fill sizes="120px" className="object-contain p-1.5" />
                {selected && (
                  <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-passport-blue text-white shadow">
                    <Check size={15} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 rounded-md border border-passport-blue/10 bg-passport-paper px-3 py-2 text-xs font-bold text-passport-ink/55">
          성별을 선택하면 아바타를 고를 수 있습니다.
        </p>
      )}
    </section>
  );
}
