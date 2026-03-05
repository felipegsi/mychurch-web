import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mychurch_access_token";
const AUTH_SESSION_COOKIE_NAME = `${AUTH_COOKIE_NAME}_session`;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function createCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: IS_PRODUCTION,
    path: "/",
  };
}

export async function POST() {
  const response = NextResponse.json(
    {
      code: 0,
      message: "Logged out successfully",
    },
    { status: 200 },
  );

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

  return response;
}
