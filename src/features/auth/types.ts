import type { User } from "@/types/user";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = LoginFormValues & {
  churchName: string;
  confirmPassword: string;
  name: string;
};

export type AuthSession = {
  token: string;
  user: User;
};

export type AuthState = {
  session: AuthSession | null;
  isLoading: boolean;
};
