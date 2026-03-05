# Authentication Flow — MyChurch Web

## Purpose
This document defines the expected end-to-end authentication behavior in MyChurch Web.

It covers:
- login
- session hydration
- route protection
- logout
- redirect policy
- 401 handling

This document describes runtime behavior, not just architecture.

---

## Official Session Strategy
MyChurch Web uses:

> **BFF + HttpOnly cookie**

This is the only valid session strategy for the web application.

The browser must never receive or persist the backend auth token directly.

---

## Login Flow

### Happy Path
1. User opens `/login`
2. User submits email and password
3. UI calls `POST /api/auth/login`
4. Next.js BFF calls backend `POST /api/users/login`
5. Backend returns token + user payload
6. BFF sets HttpOnly auth cookie
7. BFF returns sanitized session data
8. Auth store updates to authenticated
9. User is redirected to:
   - safe `next` path if present
   - otherwise `/dashboard`

---

### Invalid Credentials
1. User submits invalid credentials
2. BFF receives backend auth failure
3. BFF normalizes error
4. UI shows user-safe message:
   - `Invalid email or password`

The UI must not show raw backend technical messages.

---

## Redirect Rules
### Default post-login redirect
- `/dashboard`

### `next` parameter policy
A `next` param may be used only if it is:
- a relative internal path
- starts with `/`
- not an external URL
- not protocol-based
- not a double-slash path

### Rejected examples
- `https://malicious-site.com`
- `//malicious-site.com`
- `http://example.com`

### Accepted examples
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/events`

---

## Session Hydration Flow
On app boot, refresh, or protected layout mount:

1. client calls `GET /api/auth/session`
2. BFF checks auth cookie
3. if cookie/session is valid:
   - returns authenticated session payload
   - client hydrates auth store
4. if invalid:
   - returns unauthenticated response
   - client resets auth store

Hydration must not depend on reading auth token from browser storage.

---

## Route Protection
### Private routes
Protected pages live under authenticated areas such as:
- `/dashboard`
- future secured app surfaces

### Public auth routes
- `/login`
- `/register` if applicable

### Expected behavior
- unauthenticated user accessing private route → redirect to `/login?next=<safe-path>`
- authenticated user accessing `/login` → redirect to `/dashboard`

---

## Middleware Behavior
Middleware should enforce route-level access at the web boundary.

It should:
- inspect auth cookie presence
- redirect anonymous users away from protected routes
- avoid relying on client Zustand state

Middleware is a routing gate, not a UI state manager.

---

## Auth Store Behavior
The auth store should manage:
- `isAuthenticated`
- `user`
- `status`
- `error`

### Allowed statuses
- `idle`
- `loading`
- `authenticated`
- `unauthenticated`
- `error`

The store should not persist or expose raw backend token data.

---

## Logout Flow
1. User triggers logout
2. UI calls `POST /api/auth/logout`
3. BFF clears auth cookie
4. auth store resets
5. user is redirected to `/login`

After logout, protected routes must no longer be accessible.

---

## Global 401 Handling
Any internal API call that detects an authentication failure should behave consistently:

1. reset auth store
2. clear local authenticated UI assumptions
3. redirect user to login when appropriate
4. preserve safe `next` path when useful

The application should fail securely and predictably.

---

## Error Messaging Policy
Errors shown to users must be:
- short
- clear
- non-technical
- safe

Examples:
- `Invalid email or password`
- `Your session has expired`
- `Unable to complete login right now`

Avoid raw backend stack traces or implementation details.

---

## Current Assumptions
This flow assumes:
- backend login contract is stable
- BFF owns cookie lifecycle
- browser consumes only internal auth endpoints

If backend later introduces a dedicated current-user endpoint, the BFF session endpoint should align to it without breaking the browser contract.