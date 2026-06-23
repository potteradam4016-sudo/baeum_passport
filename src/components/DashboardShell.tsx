import { Header } from "@/components/Header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="paper-surface flex min-h-0 flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
