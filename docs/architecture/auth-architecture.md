# Auth Architecture — MyChurch Web

## Purpose
This document defines the official authentication architecture for MyChurch Web.

The accepted strategy is:

> **BFF (Backend for Frontend) + HttpOnly cookie**

This is the only approved session strategy for the web application.

---

## Why This Strategy Was Chosen
The backend login endpoint returns a JWT token.

Exposing that token directly to the browser would create unnecessary security risk and weaken route protection.

The BFF approach allows the web application to:
- keep the token out of browser JavaScript
- use middleware for protected routes
- centralize auth behavior in the web server boundary
- normalize backend contracts before they reach the UI

---

## Auth Boundary
The browser must not authenticate directly against the backend auth endpoint.

### Official flow
1. Browser submits credentials to the Next.js app.
2. Next.js route handler calls the backend auth endpoint.
3. Backend returns token + user payload.
4. Next.js stores the token in an HttpOnly cookie.
5. Next.js returns only sanitized session data to the browser.
6. Browser state is hydrated from internal session endpoints, not from raw tokens.

---

## Actors and Responsibilities

### Browser
Responsible for:
- submitting credentials
- displaying login state
- reading sanitized session responses
- rendering authenticated UI

The browser is **not** responsible for owning or persisting the auth token.

---

### Next.js BFF Layer
Responsible for:
- receiving browser auth requests
- calling backend auth endpoints
- setting and clearing auth cookies
- exposing internal session-safe endpoints
- protecting authenticated routes
- normalizing auth responses and errors

This layer is the auth boundary of the web platform.

---

### Backend API
Responsible for:
- credential validation
- issuing backend auth token
- returning upstream user payload
- enforcing backend authorization rules

---

## Recommended Internal Auth Endpoints
The web application should expose internal auth endpoints under:

- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`

### `POST /api/auth/login`
- receives email and password from browser
- calls backend `/api/users/login`
- sets HttpOnly cookie
- returns sanitized user/session payload

### `GET /api/auth/session`
- reads the auth cookie
- determines whether a valid session exists
- returns the current sanitized session state

### `POST /api/auth/logout`
- clears the auth cookie
- returns logout confirmation

---

## Cookie Policy
The backend token must be stored in an auth cookie with these principles:

- `httpOnly: true`
- `sameSite: "lax"` by default
- `secure: true` in production
- `path: "/"`

Recommended cookie naming:
- `mychurch_access_token`

The token cookie must never be readable from client-side JavaScript.

---

## Client State Ownership
Zustand may store:
- authenticated flag
- sanitized user data
- loading status
- error state

Zustand must not store:
- backend auth token
- password
- raw sensitive auth payloads

The auth store reflects the session state; it does not own the security boundary.

---

## Middleware Responsibility
Middleware should protect authenticated web areas such as:
- `/dashboard`
- future protected route groups

Expected behavior:
- unauthenticated request to protected route → redirect to login
- authenticated request to login page → redirect to dashboard

The middleware should rely on cookie presence and route policy, not on client state.

---

## Session Hydration Strategy
On app boot or route refresh:
1. client requests `GET /api/auth/session`
2. server checks cookie
3. if session is valid, server returns sanitized session data
4. auth store hydrates from that response
5. if invalid, auth store resets to unauthenticated

This avoids token exposure while keeping the client state consistent.

---

## Recommended Auth Domain Model
Internal frontend session models should be separated from backend DTOs.

Example:

```ts
export type AuthUser = {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  role: string;
  ministryId?: number | null;
  churchId?: number | null;
  statusAccount?: string | null;
};

export type AuthSession = {
  isAuthenticated: boolean;
  user: AuthUser | null;
};
```
The frontend should consume domain models, not raw backend response shapes.

## Backend Contract Gap

At the moment, the known upstream login contract returns token + user payload.

If the backend does not yet provide a dedicated `me` or session endpoint, the BFF layer must still provide `GET /api/auth/session` as the internal session source of truth.

That route may initially validate session by cookie presence and controlled server-side logic, but the long-term recommendation is to align with a backend-readable current-user endpoint.

---

## Security Rules

- Never return raw token to the client
- Never log token or credential payloads
- Never persist password
- Never use query params for token transport
- Validate `next` redirect target to prevent open redirects
- Keep auth error messages concise and user-safe

---

## Non-Approved Patterns

The following patterns are out of standard for MyChurch Web:

- direct browser → backend login
- storing token in localStorage
- storing token in sessionStorage
- exposing token in Zustand
- mixing multiple session strategies in parallel

These patterns are rejected because they reduce security and increase architectural drift.