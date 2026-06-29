import { Header } from "@/components/Header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="paper-surface flex min-h-0 flex-1 overflow-hidden px-3 sm:px-5 lg:px-8">
        <div className="mx-auto flex min-h-0 w-full max-w-[1480px] flex-1 overflow-hidden">{children}</div>
      </div>
    </main>
  );
}
