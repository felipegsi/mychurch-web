# Engineering Rules — MyChurch Web

## Purpose
These are the non-negotiable engineering standards for MyChurch Web.

They exist to keep the codebase:
- secure
- maintainable
- scalable
- reviewable
- consistent with AI-assisted development

---

## 1. General Principles
- Prefer explicit architecture over convenience shortcuts.
- Keep code easy to reason about.
- Optimize for long-term maintainability, not only for initial speed.
- Avoid hidden coupling between pages, state, and infrastructure.
- If a pattern matters, document it.

---

## 2. Naming Conventions
### Files
Use role-oriented names where appropriate:
- `auth.service.ts`
- `auth.store.ts`
- `auth.selectors.ts`
- `auth.types.ts`
- `auth.dto.ts`
- `auth.mappers.ts`

### Types and interfaces
- `PascalCase`

### Variables and functions
- `camelCase`

### Constants
- `UPPER_SNAKE_CASE`

---

## 3. Folder Strategy
### Feature-first
Domain logic belongs under:
- `src/features/*`

### Shared infrastructure
Reusable technical concerns belong under:
- `src/services/*`
- `src/lib/*`
- `src/types/*`

### Shared UI
Reusable presentational components belong under:
- `src/components/*`

Do not scatter feature logic across unrelated folders.

---

## 4. Next.js App Router Rules
- Default to Server Components unless interactivity is needed.
- Forms, interactive auth screens, and browser-only hooks must use Client Components.
- Route groups must remain clear and intentional.
- Do not mix public pages and authenticated app surfaces carelessly.

Official route ownership:
- `src/app/(public)/*`
- `src/app/dashboard/*`
- `src/app/api/*` for server boundary endpoints

---

## 5. HTTP Rules
- No direct HTTP calls inside React components.
- Use a centralized HTTP layer.
- Normalize external errors before they reach UI.
- Keep upstream backend details out of presentational components.
- Base URLs and related config must come from env vars.

---

## 6. Auth Rules
- Official auth strategy is BFF + HttpOnly cookie.
- Raw backend token must never reach browser-visible state.
- Never store token in:
  - localStorage
  - sessionStorage
  - Zustand
  - query params
- Never store password beyond request scope.
- Auth UI must consume internal BFF endpoints only.

---

## 7. Zustand Rules
Zustand is for frontend application state, not for security ownership.

### Allowed in store
- authenticated flag
- sanitized user data
- loading state
- error state

### Forbidden in store
- raw auth token
- password
- backend-only sensitive payloads

Use selectors when needed to reduce unnecessary rerenders.

---

## 8. TypeScript Rules
- `strict` mode is mandatory.
- Avoid `any`.
- Separate DTOs from domain types.
- Map external API payloads before storing or rendering them.
- Prefer explicit return types on shared utilities and service functions.

---

## 9. Error Handling Rules
- Normalize external errors into a shared app-level error model.
- Show user-safe messages only.
- Keep technical details out of the UI.
- Auth failures must follow the auth flow document.

Recommended app error shape:

```ts
export type AppError = {
  kind: "Network" | "Auth" | "Validation" | "Server" | "Unknown";
  message: string;
  status?: number;
  details?: unknown;
};
```

## 10. Security Rules

- Never log tokens or credentials.
- Never expose backend secrets in public env vars.
- Validate redirect targets.
- Prefer secure cookies in production.
- Do not trust browser state as the source of truth for authentication.
- Treat auth-related code as security-sensitive code.

---

## 11. Documentation Rules

If a change affects:

- auth behavior
- route ownership
- state boundaries
- folder structure
- API contracts
- architectural decisions

then documentation must be updated in the same PR.

Docs are part of the implementation.

---

## 12. Validation Minimum

Before considering a change ready:

### Required

- `npm run lint`
- `npm run build`

### Minimum manual validation for auth-related changes

- successful login
- invalid credentials
- refresh with active session
- access protected route without session
- logout
- authenticated user visiting login page

---

## 13. Review Standard

A change should be rejected if it:

- weakens auth boundaries
- introduces token exposure
- bypasses the documented architecture
- creates undocumented patterns
- couples UI directly to backend details without need