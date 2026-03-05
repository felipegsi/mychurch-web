import { useAuthStore } from "../store/auth.store";
import {
  selectAuthError,
  selectAuthSession,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
} from "../store/auth.selectors";

export function useAuth() {
  const session = useAuthStore(selectAuthSession);
  const user = useAuthStore(selectAuthUser);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const status = useAuthStore(selectAuthStatus);
  const error = useAuthStore(selectAuthError);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const reset = useAuthStore((state) => state.reset);
  const clearError = useAuthStore((state) => state.clearError);

  return {
    session,
    user,
    isAuthenticated,
    status,
    error,
    login,
    logout,
    hydrateSession,
    reset,
    clearError,
  };
}
