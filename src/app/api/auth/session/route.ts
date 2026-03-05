import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { AuthUser } from "@/features/auth/model/auth.types";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mychurch_access_token";
const AUTH_SESSION_COOKIE_NAME = `${AUTH_COOKIE_NAME}_session`;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

type SessionCookiePayload = {
  user: AuthUser;
  permissions: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.role === "string"
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSessionCookiePayload(value: unknown): value is SessionCookiePayload {
  if (!isRecord(value)) {
    return false;
  }

  return isAuthUser(value.user) && isStringArray(value.permissions);
}

function createCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: IS_PRODUCTION,
    path: "/",
  };
}

function createUnauthenticatedResponse(clearCookies: boolean = false) {
  const response = NextResponse.json(
    {
      code: 401,
      message: "Not authenticated",
      data: {
        isAuthenticated: false,
        user: null,
        permissions: [],
      },
    },
    { status: 401 },
  );

  if (clearCookies) {
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: "",
      ...createCookieOptions(),
      maxAge: 0,
    });
    response.cookies.set({
      name: AUTH_SESSION_COOKIE_NAME,
      value: "",
      ...createCookieOptions(),
      maxAge: 0,
    });
  }

  return response;
}

function parseSessionCookie(value: string): SessionCookiePayload | null {
  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded) as unknown;

    if (!isSessionCookiePayload(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const sessionCookie = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!token || !sessionCookie) {
    return createUnauthenticatedResponse();
  }

  const sessionPayload = parseSessionCookie(sessionCookie);

  if (!sessionPayload) {
    return createUnauthenticatedResponse(true);
  }

  return NextResponse.json(
    {
      code: 0,
      message: "Session loaded successfully",
      data: {
        isAuthenticated: true,
        user: sessionPayload.user,
        permissions: sessionPayload.permissions,
      },
    },
    { status: 200 },
  );
}
