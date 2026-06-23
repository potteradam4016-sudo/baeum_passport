import { BookOpen, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="paper-surface flex h-screen items-center justify-center overflow-hidden p-6">
      <section className="grid h-full max-h-[720px] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-lg border border-passport-gold/45 bg-passport-paper shadow-passport md:grid-cols-[1fr_0.9fr]">
        <div className="flex min-h-0 flex-col justify-center p-8 md:p-12">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-md border-2 border-passport-gold bg-passport-navy text-passport-gold">
            <BookOpen size={34} />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-passport-stamp">Learning Passport</p>
          <h1 className="mt-3 text-4xl font-black text-passport-navy md:text-6xl">배움여권</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-passport-ink/78">
            세계 여러 나라를 탐험하고 입국심사와 학습지를 완료하며 나만의 사증 도장을 모아 보세요.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-passport-blue px-5 font-bold text-white shadow transition hover:bg-passport-navy"
            >
              <LogIn size={18} />
              로그인
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-passport-blue/30 px-5 font-bold text-passport-blue transition hover:bg-passport-blue/10"
            >
              <UserPlus size={18} />
              회원가입
            </Link>
          </div>
        </div>
        <div className="relative hidden bg-passport-navy p-8 text-white md:block">
          <div className="absolute inset-6 rounded-lg border border-passport-gold/50" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="text-right text-passport-gold">대한민국 학생 여권</div>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-4 border-double border-passport-gold text-7xl">
              ✈️
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["KOR", "JPN", "FRA", "EGY", "USA", "AUS"].map((code) => (
                <div key={code} className="stamp-ring px-3 py-4 text-center text-passport-gold">
                  <p className="text-xs font-bold">{code}</p>
                  <p className="text-[10px]">VISITED</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
