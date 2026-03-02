import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MINISTRY_HIGHLIGHTS } from "@/lib/constants";

export default function MinistriesPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-950">Ministerios</h1>
        <p className="text-zinc-600">Equipas com maior necessidade de acompanhamento e recrutamento.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {MINISTRY_HIGHLIGHTS.map((ministry) => (
          <Card key={ministry.id}>
            <CardHeader>
              <CardTitle>{ministry.name}</CardTitle>
              <CardDescription>Lider: {ministry.leaderName}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-zinc-600">
              <span>{ministry.membersCount} membros</span>
              <span>{ministry.focus}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
