import type { AuthState } from "@/features/auth/types";

export const initialAuthState: AuthState = {
  session: null,
  isLoading: false,
};
