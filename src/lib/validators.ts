import type { LoginFormValues, RegisterFormValues } from "@/features/auth/types";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLoginForm(values: LoginFormValues) {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {};

  if (!values.email.trim()) {
    errors.email = "Informe um email.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Informe um email valido.";
  }

  if (values.password.trim().length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  return errors;
}

export function validateRegisterForm(values: RegisterFormValues) {
  const errors: Partial<Record<keyof RegisterFormValues, string>> = {
    ...validateLoginForm(values),
  };

  if (!values.name.trim()) {
    errors.name = "Informe o nome do responsavel.";
  }

  if (!values.churchName.trim()) {
    errors.churchName = "Informe o nome da igreja.";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "As senhas precisam ser iguais.";
  }

  return errors;
}
