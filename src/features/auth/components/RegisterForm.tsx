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
import { register } from "@/features/auth/api";
import type { RegisterFormValues } from "@/features/auth/types";
import { validateRegisterForm } from "@/lib/validators";

const initialValues: RegisterFormValues = {
  churchName: "",
  confirmPassword: "",
  email: "",
  name: "",
  password: "",
};

export function RegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (field: keyof RegisterFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRegisterForm(values);

    setErrors(nextErrors);
    setStatusMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await register(values);
      setStatusMessage(`Conta criada para ${session.user.name}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>
          Configure uma base inicial para testar o painel administrativo da igreja.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input
            error={errors.name}
            label="Nome"
            name="name"
            placeholder="Ana Martins"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
          />
          <Input
            error={errors.email}
            label="Email"
            name="email"
            placeholder="ana@mychurch.pt"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
          />
          <Input
            className="md:col-span-2"
            error={errors.churchName}
            label="Nome da igreja"
            name="churchName"
            placeholder="Igreja Central"
            value={values.churchName}
            onChange={(event) => handleChange("churchName", event.target.value)}
          />
          <Input
            error={errors.password}
            label="Senha"
            name="password"
            placeholder="********"
            type="password"
            value={values.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
          <Input
            error={errors.confirmPassword}
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="********"
            type="password"
            value={values.confirmPassword}
            onChange={(event) => handleChange("confirmPassword", event.target.value)}
          />
          {statusMessage ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 md:col-span-2">
              {statusMessage}
            </p>
          ) : null}
          <Button className="md:col-span-2" disabled={isSubmitting} fullWidth type="submit">
            {isSubmitting ? "Criando..." : "Criar conta"}
          </Button>
          <p className="text-center text-sm text-zinc-600 md:col-span-2">
            Ja tem conta?{" "}
            <Link href="/login" className="font-medium text-zinc-950 underline">
              Entrar
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
