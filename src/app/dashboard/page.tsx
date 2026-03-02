import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { DASHBOARD_METRICS } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-950">Dashboard</h1>
        <p className="text-zinc-600">
          Acompanhe os indicadores principais da igreja e os proximos passos da equipa.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {DASHBOARD_METRICS.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-3xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Atalhos rapidos</CardTitle>
          <CardDescription>Navegue para as areas que mais precisam de manutencao.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/members" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white">
            Ver membros
          </Link>
          <Link href="/dashboard/events" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900">
            Ver eventos
          </Link>
          <Link href="/dashboard/ministries" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900">
            Ver ministerios
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
