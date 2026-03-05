import type {
  BffAuthUserDto,
  BffLoginResponseDto,
  BffSessionResponseDto,
  UpstreamLoginDataDto,
  UpstreamLoginUserDto,
  UpstreamPermissionDto,
} from "./auth.dto";
import type { AuthSession, AuthUser } from "./auth.types";

export function sanitizeNextPath(
  nextPath: string | null | undefined,
  fallback: string = "/dashboard",
): string {
  if (!nextPath) {
    return fallback;
  }

  if (!nextPath.startsWith("/")) {
    return fallback;
  }

  if (nextPath.startsWith("//")) {
    return fallback;
  }

  if (nextPath.includes("://")) {
    return fallback;
  }

  return nextPath;
}

export function mapUpstreamUserToAuthUser(user: UpstreamLoginUserDto): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo ?? null,
    role: user.role,
    ministryId: user.ministryId ?? null,
    churchId: user.churchId ?? null,
    statusAccount: user.statusAccount ?? null,
  };
}

export function mapBffUserToAuthUser(user: BffAuthUserDto): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo ?? null,
    role: user.role,
    ministryId: user.ministryId ?? null,
    churchId: user.churchId ?? null,
    statusAccount: user.statusAccount ?? null,
  };
}

export function mapPermissions(permissions: UpstreamPermissionDto[] | undefined): string[] {
  if (!permissions || permissions.length === 0) {
    return [];
  }

  return permissions
    .map((permission) => permission.name)
    .filter((permission): permission is string => typeof permission === "string");
}

export function mapUpstreamLoginData(data: UpstreamLoginDataDto): {
  token: string;
  user: AuthUser;
  permissions: string[];
} {
  const mappedUser = mapUpstreamUserToAuthUser(data.user);
  const mappedPermissions = mapPermissions(data.permissions ?? data.user.permissions);

  return {
    token: data.token,
    user: mappedUser,
    permissions: mappedPermissions,
  };
}

export function toAuthSessionFromLoginResponse(response: BffLoginResponseDto): AuthSession {
  return {
    isAuthenticated: true,
    user: mapBffUserToAuthUser(response.data.user),
    permissions: response.data.permissions,
  };
}

export function toAuthSessionFromSessionResponse(response: BffSessionResponseDto): AuthSession {
  if (!response.data.isAuthenticated || !response.data.user) {
    return {
      isAuthenticated: false,
      user: null,
      permissions: [],
    };
  }

  return {
    isAuthenticated: true,
    user: mapBffUserToAuthUser(response.data.user),
    permissions: response.data.permissions ?? [],
  };
}
