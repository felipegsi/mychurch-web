import { apiClient } from "@/services/http/apiClient";
import { toAppError } from "@/services/http/errors";
import type {
  BffLoginResponseDto,
  BffLogoutResponseDto,
  BffSessionResponseDto,
} from "../model/auth.dto";
import {
  toAuthSessionFromLoginResponse,
  toAuthSessionFromSessionResponse,
} from "../model/auth.mappers";
import type { AuthSession, LoginCredentials } from "../model/auth.types";

const LOGIN_ENDPOINT = "/auth/login";
const SESSION_ENDPOINT = "/auth/session";
const LOGOUT_ENDPOINT = "/auth/logout";

const UNAUTHENTICATED_SESSION: AuthSession = {
  isAuthenticated: false,
  user: null,
  permissions: [],
};

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  try {
    const { data } = await apiClient.post<BffLoginResponseDto>(LOGIN_ENDPOINT, credentials);
    return toAuthSessionFromLoginResponse(data);
  } catch (error) {
    throw toAppError(error, "Invalid email or password");
  }
}

export async function getSession(): Promise<AuthSession> {
  try {
    const { data } = await apiClient.get<BffSessionResponseDto>(SESSION_ENDPOINT);
    return toAuthSessionFromSessionResponse(data);
  } catch (error) {
    const appError = toAppError(error, "Unable to load session");

    if (appError.status === 401) {
      return UNAUTHENTICATED_SESSION;
    }

    throw appError;
  }
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post<BffLogoutResponseDto>(LOGOUT_ENDPOINT);
  } catch (error) {
    throw toAppError(error, "Unable to logout right now");
  }
}
