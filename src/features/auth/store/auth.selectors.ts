import type { AuthStore } from "./auth.store";

export const selectAuthSession = (state: AuthStore) => state.session;
export const selectAuthUser = (state: AuthStore) => state.session.user;
export const selectIsAuthenticated = (state: AuthStore) => state.session.isAuthenticated;
export const selectAuthStatus = (state: AuthStore) => state.status;
export const selectAuthError = (state: AuthStore) => state.error;
