import { create } from "zustand";
import { toAppError } from "@/services/http/errors";
import type { AuthSession, AuthStatus, LoginCredentials } from "../model/auth.types";
import * as authService from "../services/auth.service";

const UNAUTHENTICATED_SESSION: AuthSession = {
  isAuthenticated: false,
  user: null,
  permissions: [],
};

export type AuthStore = {
  session: AuthSession;
  status: AuthStatus;
  error: string | null;
  hydrateSession: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  reset: () => void;
  clearError: () => void;
};

export const initialAuthState: Pick<AuthStore, "session" | "status" | "error"> = {
  session: UNAUTHENTICATED_SESSION,
  status: "idle",
  error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialAuthState,
  hydrateSession: async () => {
    set({
      status: "loading",
      error: null,
    });

    try {
      const session = await authService.getSession();

      set({
        session,
        status: session.isAuthenticated ? "authenticated" : "unauthenticated",
        error: null,
      });
    } catch (error) {
      const appError = toAppError(error, "Unable to load session");

      set({
        session: UNAUTHENTICATED_SESSION,
        status: "error",
        error: appError.message,
      });
    }
  },
  login: async (credentials: LoginCredentials) => {
    set({
      status: "loading",
      error: null,
    });

    try {
      const session = await authService.login(credentials);

      set({
        session,
        status: "authenticated",
        error: null,
      });

      return true;
    } catch (error) {
      const appError = toAppError(error, "Invalid email or password");

      set({
        session: UNAUTHENTICATED_SESSION,
        status: "error",
        error: appError.message,
      });

      return false;
    }
  },
  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({
        session: UNAUTHENTICATED_SESSION,
        status: "unauthenticated",
        error: null,
      });
    }
  },
  reset: () => {
    set({
      session: UNAUTHENTICATED_SESSION,
      status: "unauthenticated",
      error: null,
    });
  },
  clearError: () => {
    set({
      error: null,
    });
  },
}));
