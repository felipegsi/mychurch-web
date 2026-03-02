import type {
  AuthSession,
  LoginFormValues,
  RegisterFormValues,
} from "@/features/auth/types";
import type { User } from "@/types/user";

function createUser(name: string, email: string): User {
  return {
    id: `user-${email}`,
    name,
    email,
    role: "admin",
    status: "active",
  };
}

async function simulateLatency() {
  await new Promise((resolve) => setTimeout(resolve, 250));
}

export async function login(values: LoginFormValues): Promise<AuthSession> {
  await simulateLatency();

  const fallbackName = values.email.split("@")[0] || "Administrador";

  return {
    token: "demo-token",
    user: createUser(fallbackName, values.email),
  };
}

export async function register(values: RegisterFormValues): Promise<AuthSession> {
  await simulateLatency();

  return {
    token: "demo-token",
    user: createUser(values.name, values.email),
  };
}
