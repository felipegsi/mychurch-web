import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { appConfig } from "@/config";
import { HOME_HIGHLIGHTS } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-6 md:max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
            {appConfig.name}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Gestao simples para membros, ministerios e eventos da igreja.
          </h1>
          <p className="text-lg leading-8 text-zinc-300">
            {appConfig.description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 font-medium text-zinc-950 transition hover:bg-emerald-300"
            >
              Entrar
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-100 transition hover:border-zinc-500"
            >
              Ver dashboard
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {HOME_HIGHLIGHTS.map((item) => (
            <Card key={item.label} className="border-zinc-800 bg-zinc-900 text-zinc-50">
              <CardHeader>
                <CardDescription className="text-zinc-400">{item.label}</CardDescription>
                <CardTitle className="text-3xl">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
