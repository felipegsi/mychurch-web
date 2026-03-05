import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./SideBar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
