import { Globe2, MapPinned } from "lucide-react";

type SidebarProps = {
  activeTab: "travel" | "visited";
  onTabChange: (tab: "travel" | "visited") => void;
};

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const items = [
    { key: "travel" as const, label: "세계 여행", icon: Globe2 },
    { key: "visited" as const, label: "방문 국가", icon: MapPinned },
  ];

  return (
    <aside className="hidden w-56 shrink-0 border-r border-passport-blue/15 bg-white/42 p-4 md:block">
      <div className="mb-5 rounded-md border border-passport-blue/15 bg-passport-navy p-4 text-white shadow-passport">
        <p className="text-xs uppercase text-passport-gold">Passport Menu</p>
        <p className="mt-1 text-xl font-bold">여행 기록</p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange(item.key)}
              className={`flex h-12 w-full items-center gap-3 rounded-md px-3 text-left font-semibold transition ${
                active
                  ? "bg-passport-blue text-white shadow"
                  : "text-passport-ink hover:bg-passport-blue/10"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
