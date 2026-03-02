import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MEMBER_HIGHLIGHTS } from "@/lib/constants";

export default function MembersPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-950">Membros</h1>
        <p className="text-zinc-600">Visao rapida dos perfis que exigem acompanhamento nesta semana.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {MEMBER_HIGHLIGHTS.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-zinc-600">
              <span>{member.role}</span>
              <span>{member.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
