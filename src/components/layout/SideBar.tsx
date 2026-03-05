import Link from 'next/link';

/**
 * Sidebar do dashboard.
 */
export function Sidebar() {
  return (
    <aside className="w-56 border-r p-4">
      <nav className="space-y-2">
        <Link href="/dashboard">Visão geral</Link>
        <Link href="/dashboard/members">Membros</Link>
        <Link href="/dashboard/events">Eventos</Link>
        <Link href="/dashboard/ministries">Ministérios</Link>
      </nav>
    </aside>
  );
}