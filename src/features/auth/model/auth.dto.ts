export type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

export type UpstreamLoginRequestDto = {
  email: string;
  password: string;
};

export type UpstreamPermissionDto = {
  name?: string;
};

export type UpstreamLoginUserDto = {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  role: string;
  ministryId?: number | null;
  churchId?: number | null;
  statusAccount?: string | null;
  permissions?: UpstreamPermissionDto[];
};

export type UpstreamLoginDataDto = {
  token: string;
  user: UpstreamLoginUserDto;
  permissions?: UpstreamPermissionDto[];
};

export type UpstreamLoginResponseDto = ApiEnvelope<UpstreamLoginDataDto>;

export type BffAuthUserDto = {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  role: string;
  ministryId?: number | null;
  churchId?: number | null;
  statusAccount?: string | null;
};

export type BffLoginDataDto = {
  user: BffAuthUserDto;
  permissions: string[];
};

export type BffSessionDataDto = {
  isAuthenticated: boolean;
  user: BffAuthUserDto | null;
  permissions: string[];
};

export type BffLoginResponseDto = ApiEnvelope<BffLoginDataDto>;

export type BffSessionResponseDto = ApiEnvelope<BffSessionDataDto>;

export type BffLogoutResponseDto = {
  code: number;
  message: string;
};
