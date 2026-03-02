import Link from "next/link";
import { appConfig } from "@/config";

export function Header() {
  return (
    <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-600">
          {appConfig.name}
        </p>
        <h1 className="text-2xl font-semibold text-zinc-950">Painel administrativo</h1>
      </div>
      <nav className="flex flex-wrap gap-3 text-sm font-medium">
        <Link href="/" className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-700">
          Site
        </Link>
        <Link href="/login" className="rounded-full bg-zinc-950 px-4 py-2 text-white">
          Trocar conta
        </Link>
      </nav>
    </header>
  );
}
