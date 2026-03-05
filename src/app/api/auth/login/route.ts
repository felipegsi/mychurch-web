import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type {
  UpstreamLoginDataDto,
  UpstreamLoginResponseDto,
  UpstreamLoginUserDto,
} from "@/features/auth/model/auth.dto";
import { mapUpstreamLoginData } from "@/features/auth/model/auth.mappers";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mychurch_access_token";
const AUTH_SESSION_COOKIE_NAME = `${AUTH_COOKIE_NAME}_session`;
const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

type LoginRequestBody = {
  email?: unknown;
  password?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isUpstreamUserDto(value: unknown): value is UpstreamLoginUserDto {
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

function isUpstreamLoginDataDto(value: unknown): value is UpstreamLoginDataDto {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.token === "string" && isUpstreamUserDto(value.user);
}

function extractUpstreamData(payload: unknown): UpstreamLoginDataDto | null {
  if (!isRecord(payload)) {
    return null;
  }

  const upstreamResponse = payload as Partial<UpstreamLoginResponseDto>;
  const maybeData = upstreamResponse.data;

  if (!isUpstreamLoginDataDto(maybeData)) {
    return null;
  }

  return maybeData;
}

function createCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: IS_PRODUCTION,
    path: "/",
  };
}

export async function POST(request: NextRequest) {
  if (!BACKEND_API_BASE_URL) {
    return NextResponse.json(
      {
        code: 500,
        message: "Unable to complete login right now",
      },
      { status: 500 },
    );
  }

  let body: LoginRequestBody;

  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json(
      {
        code: 400,
        message: "Email and password are required",
      },
      { status: 400 },
    );
  }

  const email = body.email;
  const password = body.password;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return NextResponse.json(
      {
        code: 400,
        message: "Email and password are required",
      },
      { status: 400 },
    );
  }

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(`${BACKEND_API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        code: 500,
        message: "Unable to complete login right now",
      },
      { status: 500 },
    );
  }

  if (upstreamResponse.status === 401) {
    return NextResponse.json(
      {
        code: 401,
        message: "Invalid email or password",
      },
      { status: 401 },
    );
  }

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        code: 500,
        message: "Unable to complete login right now",
      },
      { status: 500 },
    );
  }

  let upstreamPayload: unknown;

  try {
    upstreamPayload = await upstreamResponse.json();
  } catch {
    return NextResponse.json(
      {
        code: 500,
        message: "Unable to complete login right now",
      },
      { status: 500 },
    );
  }

  const upstreamData = extractUpstreamData(upstreamPayload);

  if (!upstreamData) {
    return NextResponse.json(
      {
        code: 500,
        message: "Unable to complete login right now",
      },
      { status: 500 },
    );
  }

  const { token, user, permissions } = mapUpstreamLoginData(upstreamData);

  const response = NextResponse.json(
    {
      code: 0,
      message: "Authenticated successfully",
      data: {
        user,
        permissions,
      },
    },
    { status: 200 },
  );

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    ...createCookieOptions(),
  });

  response.cookies.set({
    name: AUTH_SESSION_COOKIE_NAME,
    value: encodeURIComponent(JSON.stringify({ user, permissions })),
    ...createCookieOptions(),
  });

  return response;
}
