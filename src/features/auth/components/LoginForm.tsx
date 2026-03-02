"use client";

import Link from "next/link";
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
import { login } from "@/features/auth/api";
import type { LoginFormValues } from "@/features/auth/types";
import { validateLoginForm } from "@/lib/validators";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLoginForm(values);

    setErrors(nextErrors);
    setStatusMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await login(values);
      setStatusMessage(`Sessao de demonstracao iniciada para ${session.user.name}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Use qualquer email e senha valida para abrir a versao de demonstracao.
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
          {statusMessage ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {statusMessage}
            </p>
          ) : null}
          <Button fullWidth disabled={isSubmitting} type="submit">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <p className="text-center text-sm text-zinc-600">
            Ainda nao tem conta?{" "}
            <Link href="/register" className="font-medium text-zinc-950 underline">
              Registe a sua igreja
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
