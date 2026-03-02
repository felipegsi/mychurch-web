export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type Maybe<T> = T | null;

export type NavigationItem = {
  href: string;
  label: string;
  description: string;
};

export type SummaryMetric = {
  label: string;
  value: string;
  detail: string;
};
