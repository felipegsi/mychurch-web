# Local Development Runbook — MyChurch Web

## Purpose
This runbook explains how to run MyChurch Web locally with the current architectural standards, especially the BFF auth boundary.

It should help a developer go from clone to a working local auth flow with minimal ambiguity.

---

## Prerequisites
Make sure you have:

- Node.js installed
- npm installed
- access to the MyChurch backend environment
- the correct repository cloned locally

---

## Recommended Environment Variables
Create a `.env.local` file at the project root.

Example:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
BACKEND_API_BASE_URL=https://mychurch-gif3.onrender.com
AUTH_COOKIE_NAME=mychurch_access_token
```

### Notes

- `NEXT_PUBLIC_APP_URL` is safe to expose to the browser.
- `BACKEND_API_BASE_URL` should be treated as server-side config.
- `AUTH_COOKIE_NAME` defines the cookie key used by the BFF auth layer.

Do not expose secrets through `NEXT_PUBLIC_*`.

---

## Install and Run

```
npm install
npm run dev
```

Recommended validation commands:

```
npm run lint
npm run build
```

---

## Local Auth Model

The local browser should talk only to internal auth routes.

Expected internal endpoints:

- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`

Expected upstream endpoint:

- `POST https://mychurch-gif3.onrender.com/api/users/login`

The browser must not call the upstream backend login endpoint directly.

---

## Local Auth Test Checklist

### 1. Login success

- open `/login`
- submit valid credentials
- confirm redirect to `/dashboard`
- confirm app behaves as authenticated

### 2. Invalid credentials

- submit incorrect credentials
- confirm a safe message is shown
- confirm no authenticated state is set

### 3. Session hydration

- login successfully
- refresh the page
- confirm session is restored through `GET /api/auth/session`

### 4. Protected route guard

- clear session or logout
- attempt to access `/dashboard`
- confirm redirect to `/login`

### 5. Logout

- login successfully
- trigger logout
- confirm auth cookie is cleared
- confirm redirect to `/login`

---

## Cookie Behavior in Local Development

Because local development commonly runs on `http://localhost`, cookie settings may differ slightly from production.

### Recommended local behavior

- `httpOnly: true`
- `sameSite: "lax"`
- `secure: false` in local dev only

### Recommended production behavior

- `httpOnly: true`
- `sameSite: "lax"` or stricter if needed
- `secure: true`

Never disable `httpOnly` for convenience.

---

## Recommended Initial File Targets

If you are implementing the auth foundation, these are the most relevant files:

```
src/app/api/auth/login/route.ts
src/app/api/auth/session/route.ts
src/app/api/auth/logout/route.ts
src/features/auth/model/auth.types.ts
src/features/auth/model/auth.dto.ts
src/features/auth/model/auth.mappers.ts
src/features/auth/services/auth.service.ts
src/features/auth/store/auth.store.ts
src/features/auth/store/auth.selectors.ts
src/features/auth/hooks/useAuth.ts
src/services/http/apiClient.ts
src/services/http/errors.ts
middleware.ts
```

---

## Troubleshooting

### Problem

Login works upstream but not in the browser.

### Check

- is the browser calling `/api/auth/login` or the backend directly?
- is the cookie being set by the Next.js route handler?
- is the cookie path correct?
- is the cookie secure flag blocking local usage?

---

### Problem

User logs in but refresh loses session.

### Check

- does `GET /api/auth/session` exist?
- is the cookie actually present after login?
- is the session route reading the cookie correctly?
- is the auth store hydrating on app boot?

---

### Problem

Protected route is accessible without login.

### Check

- is `middleware.ts` configured for protected routes?
- is route matching correct?
- is the cookie check wired correctly?
- is there accidental client-side-only protection instead of route protection?

---

## PowerShell Note

If you use PowerShell and need to inspect route-group files, quote paths with parentheses.

Example:

```cmd
Get-Content-Raw"src\app\(public)\login\page.tsx"
```

---

## Maintenance Rule

Whenever local auth setup changes, update this runbook in the same PR.

A runbook that does not match reality is operational debt.