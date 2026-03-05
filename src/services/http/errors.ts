import { isAxiosError } from "axios";

export type AppErrorKind = "Network" | "Auth" | "Validation" | "Server" | "Unknown";

export type AppError = {
  kind: AppErrorKind;
  message: string;
  status?: number;
  details?: unknown;
};

const DEFAULT_ERROR_MESSAGE = "Unable to complete request right now.";

function mapStatusToKind(status?: number): AppErrorKind {
  if (status === 401 || status === 403) {
    return "Auth";
  }

  if (status === 400 || status === 422) {
    return "Validation";
  }

  if (status && status >= 500) {
    return "Server";
  }

  if (!status) {
    return "Network";
  }

  return "Unknown";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractMessageFromPayload(payload: unknown): string | undefined {
  if (!isRecord(payload)) {
    return undefined;
  }

  const message = payload.message;
  return typeof message === "string" && message.trim().length > 0 ? message : undefined;
}

export function isAppError(value: unknown): value is AppError {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.kind === "string" && typeof value.message === "string";
}

export function toAppError(
  error: unknown,
  fallbackMessage: string = DEFAULT_ERROR_MESSAGE,
): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const payloadMessage = extractMessageFromPayload(error.response?.data);
    const message = payloadMessage ?? fallbackMessage;

    return {
      kind: mapStatusToKind(status),
      message,
      status,
      details: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      kind: "Unknown",
      message: error.message || fallbackMessage,
    };
  }

  return {
    kind: "Unknown",
    message: fallbackMessage,
  };
}
