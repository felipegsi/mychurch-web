import { initialAuthState } from "@/features/auth/store";

export type RootStore = {
  auth: typeof initialAuthState;
};

export const rootStore: RootStore = {
  auth: initialAuthState,
};
