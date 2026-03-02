import Link from "next/link";
import { DASHBOARD_NAV_ITEMS } from "@/lib/constants";

export function SideBar() {
  return (
    <aside className="rounded-3xl bg-zinc-950 p-6 text-zinc-50 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Navegacao</p>
        <h2 className="text-2xl font-semibold">MyChurch</h2>
      </div>
      <nav className="mt-8 flex flex-col gap-2">
        {DASHBOARD_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            <span className="block font-medium text-white">{item.label}</span>
            <span className="block text-xs text-zinc-400">{item.description}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
