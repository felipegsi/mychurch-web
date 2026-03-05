/**
 * Tipos compartilhados entre features.
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

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
