"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";

export function AuthSessionHydrator() {
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) {
      return;
    }

    hasHydrated.current = true;
    void hydrateSession();
  }, [hydrateSession]);

  return null;
}
