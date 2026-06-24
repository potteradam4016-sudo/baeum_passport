import { LogIn, Plane, UserPlus } from "lucide-react";
import type { PassportMode } from "@/app/page";

type PassportCoverProps = {
  onSelect: (mode: PassportMode) => void;
  isTransitioning?: boolean;
};

export function PassportCover({ onSelect, isTransitioning = false }: PassportCoverProps) {
  return (
    <section className={`passport-cover-closed ${isTransitioning ? "is-soft-transitioning" : ""}`} aria-label="닫힌 배움여권">
      <div className="passport-cover-border" />
      <div className="passport-cover-shine" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between p-8 text-center sm:p-10">
        <div className="w-full text-right text-xs font-bold uppercase tracking-[0.22em] text-passport-gold/80">
          Republic of Learning
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-double border-passport-gold text-passport-gold shadow-inner">
            <Plane size={42} />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-passport-gold/85">
            Learning Passport
          </p>
          <h1 className="mt-3 text-4xl font-black text-passport-gold sm:text-5xl">배움여권</h1>
          <div className="mt-8 h-px w-44 bg-passport-gold/55" />
        </div>

        <div className="passport-cover-actions w-full">
          <div className="mb-5 grid grid-cols-3 gap-3 text-passport-gold/75">
            {["KOR", "JPN", "AUS"].map((code) => (
              <div key={code} className="stamp-ring px-2 py-3">
                <p className="text-[10px] font-black">{code}</p>
                <p className="text-[9px] font-bold">VISA</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onSelect("login")}
              disabled={isTransitioning}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-passport-gold font-black text-passport-navy shadow transition hover:bg-white"
            >
              <LogIn size={18} />
              로그인
            </button>
            <button
              type="button"
              onClick={() => onSelect("signup")}
              disabled={isTransitioning}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-passport-gold/70 bg-white/8 font-black text-passport-gold transition hover:bg-white/12"
            >
              <UserPlus size={18} />
              회원가입
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
