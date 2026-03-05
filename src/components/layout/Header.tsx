"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <p className="text-sm">Logado como: {user?.name ?? "Utilizador"}</p>
      <Button disabled={isLoggingOut} variant="secondary" onClick={handleLogout}>
        {isLoggingOut ? "A terminar..." : "Terminar sessao"}
      </Button>
    </header>
  );
}
