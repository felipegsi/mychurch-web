"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { sanitizeNextPath } from "@/features/auth/model/auth.mappers";
import type { LoginCredentials } from "@/features/auth/model/auth.types";
import { validateLoginForm } from "@/lib/validators";

const initialValues: LoginCredentials = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error, status, clearError } = useAuth();
  const [values, setValues] = useState<LoginCredentials>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginCredentials, string>>>({});

  const handleChange = (field: keyof LoginCredentials, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLoginForm(values);

    setErrors(nextErrors);
    clearError();

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const success = await login(values);

    if (success) {
      const nextPath = sanitizeNextPath(searchParams.get("next"), "/dashboard");
      router.push(nextPath);
      router.refresh();
    }
  };

  const isSubmitting = status === "loading";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Entre com as suas credenciais para aceder ao painel administrativo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            autoComplete="email"
            error={errors.email}
            label="Email"
            name="email"
            placeholder="lider@mychurch.pt"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
          />
          <Input
            autoComplete="current-password"
            error={errors.password}
            label="Senha"
            name="password"
            placeholder="********"
            type="password"
            value={values.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <Button fullWidth disabled={isSubmitting} type="submit">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <p className="text-center text-sm text-zinc-600">
            Ainda nao tem conta?{" "}
            <Link href="/register" className="font-medium text-zinc-950 underline">
              Criar conta
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
