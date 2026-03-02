import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 md:grid-cols-[240px_1fr]">
        <SideBar />
        <div className="flex min-h-full flex-col gap-6">
          <Header />
          <main className="rounded-3xl bg-white p-6 shadow-sm">{children}</main>
        </div>
      </div>
    </div>
  );
}
