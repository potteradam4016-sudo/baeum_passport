"use client";

export function LoginFailureModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-lg border border-passport-gold/50 bg-passport-paper p-6 text-center shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-passport-stamp">Login Failed</p>
        <h2 className="mt-3 text-2xl font-black text-passport-navy">로그인할 수 없습니다</h2>
        <p className="mt-3 text-sm font-bold leading-6 text-passport-ink/70">아이디 또는 비밀번호를 다시 확인해 주세요.</p>
        <button type="button" onClick={onClose} className="mt-6 h-11 rounded-md bg-passport-navy px-6 font-black text-white shadow transition hover:bg-passport-blue">
          확인
        </button>
      </section>
    </div>
  );
}
