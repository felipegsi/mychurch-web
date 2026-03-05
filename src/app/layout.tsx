import type { ReactNode } from "react";
import { AuthSessionHydrator } from "@/features/auth/components/AuthSessionHydrator";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body>
        <AuthSessionHydrator />
        {children}
      </body>
    </html>
  );
}
