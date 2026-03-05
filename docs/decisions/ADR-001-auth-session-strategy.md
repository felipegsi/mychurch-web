# ADR-001 — Auth Session Strategy

- **Status:** Accepted
- **Date:** 2026-03-05
- **Deciders:** MyChurch Web architecture direction

---

## Context
MyChurch Web needs a production-safe authentication model for the web platform.

The upstream backend login endpoint returns a JWT token and user payload.

A decision is required on how the web app will handle session ownership.

The two realistic options were:

1. **Direct browser login with client-side token storage**
2. **BFF boundary with HttpOnly cookie**

Because the project is intended to scale and handle sensitive user and church-related data, auth architecture must prioritize security and maintainability.

---

## Decision
MyChurch Web will use:

> **BFF + HttpOnly cookie**

### This means
- browser calls internal Next.js auth routes
- Next.js server calls backend auth endpoint
- backend token is stored in an HttpOnly cookie
- token is never exposed to browser JavaScript
- browser consumes sanitized session responses only
- middleware and server-side route handling use cookie presence as the auth boundary

---

## Decision Drivers
- reduce token exposure risk
- support reliable route protection
- keep auth ownership on the server boundary
- make session behavior more predictable
- avoid mixing UI state with security-sensitive state
- support long-term product scaling

---

## Alternatives Considered

### Alternative A — Client-side token storage
#### Description
Browser would call backend login directly and store token in localStorage, sessionStorage, or memory.

#### Why rejected
- greater XSS exposure risk
- weaker route protection model
- token handling leaks into UI concerns
- harder to keep architecture clean over time
- increases the chance of inconsistent auth behavior

---

## Consequences

### Positive
- stronger session boundary
- better security posture
- cleaner auth ownership
- better support for middleware-based protection
- easier future extension of auth concerns

### Negative
- slightly more implementation complexity
- requires internal auth route handlers
- may require additional session endpoint design

---

## Implementation Implications
The following patterns become mandatory:

- internal auth routes under `src/app/api/auth/*`
- HttpOnly cookie lifecycle managed by Next.js server
- sanitized session endpoint for browser hydration
- no raw token in Zustand
- no raw token in browser storage

---

## Non-Goals
This ADR does not define:
- refresh-token design
- role-based authorization model
- backend permission architecture
- detailed cookie expiration policy

Those can be documented in future ADRs if needed.

---

## Follow-Up Expectations
The codebase and documentation should reflect this decision consistently.

Any implementation that bypasses the BFF boundary must be considered out of standard unless a new ADR supersedes this one.