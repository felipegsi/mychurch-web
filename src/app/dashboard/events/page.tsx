import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { UPCOMING_EVENTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default function EventsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-950">Eventos</h1>
        <p className="text-zinc-600">Planeamento das proximas reunioes, conferencias e encontros.</p>
      </div>
      <div className="grid gap-4">
        {UPCOMING_EVENTS.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardDescription>{formatDate(event.date)}</CardDescription>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:justify-between">
              <span>{event.location}</span>
              <span>{event.description}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
