export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  role: string;
  ministryId?: number | null;
  churchId?: number | null;
  statusAccount?: string | null;
};

export type AuthSession = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  permissions: string[];
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterFormValues = LoginCredentials & {
  churchName: string;
  confirmPassword: string;
  name: string;
};
