"use client";

import { Globe2, Stamp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/worldmap", label: "세계지도", icon: Globe2 },
  { href: "/stamp", label: "사증", icon: Stamp },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-passport-blue/15 bg-white/42 p-4 md:block">
      <nav className="space-y-2 pt-2" aria-label="Passport navigation">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-12 w-full items-center gap-3 rounded-md px-3 text-left font-semibold transition ${
                active ? "bg-passport-blue text-white shadow" : "text-passport-ink hover:bg-passport-blue/10"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
