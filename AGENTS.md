# AGENTS.md — MyChurch Web Execution Protocol

## Mission
Deliver production-grade changes to **MyChurch Web** with:
- consistent architecture
- secure authentication boundaries
- strict TypeScript quality
- minimal regressions
- AI-assisted development discipline

This file is the operational contract for humans and AI agents working in this repository.

---

## Project Snapshot
MyChurch Web is the web platform of the MyChurch ecosystem.

### Product direction
The web application exists to:
- enable access for iOS users without App Store dependency
- support SEO and discoverability
- provide a more robust administrative experience
- evolve toward a scalable SaaS platform for church management

### Core domains
- authentication and access control
- members and profiles
- ministries
- events and calendar
- communication flows
- financial responsibilities where applicable

### Current technical direction
- Next.js (App Router)
- React
- TypeScript (strict)
- Zustand
- Axios
- Tailwind CSS
- BFF auth boundary with HttpOnly cookie

---

## Mandatory Read Order
Before making any auth, architecture, infra, or state change, read in this order:

1. `docs/README.md`
2. `docs/product/project-context.md`
3. `docs/architecture/overview.md`
4. `docs/architecture/auth-architecture.md`
5. `docs/api/auth/login.md`
6. `docs/flows/authentication.md`
7. `docs/standards/engineering-rules.md`
8. `docs/decisions/ADR-001-auth-session-strategy.md`
9. `docs/runbooks/local-development.md`

---

## Non-Negotiable Rules
- Do not call Axios directly inside React components.
- Do not expose backend tokens to the browser.
- Do not store passwords anywhere.
- Do not log tokens, cookies, or sensitive auth payloads.
- Keep TypeScript strict and avoid `any`.
- Preserve route groups:
  - `src/app/(public)/*`
  - `src/app/dashboard/*`
- Do not introduce new dependencies unless clearly justified.
- Keep changes focused; avoid broad refactors outside the requested scope.
- If a change affects architecture, auth, routing, or standards, update docs in the same PR.

---

## Official Auth Direction
The repository uses **BFF + HttpOnly cookie** as the official session strategy.

That means:
- browser submits credentials to a **Next.js route handler**
- Next.js server calls the backend auth endpoint
- backend token is stored in an **HttpOnly cookie**
- token is **never** returned to the client application
- UI consumes only sanitized session data
- protected routes are enforced through middleware and server-side checks

Any implementation that returns the raw backend token to the browser is considered out of standard.

---

## What AI Must Do Before Coding
1. Read the documentation in the mandatory order.
2. Identify existing patterns in naming, folders, imports, and state shape.
3. Propose a minimal implementation plan.
4. Prefer incremental diffs over broad rewrites.
5. Respect the accepted architectural decisions before proposing alternatives.

---

## Required Output Format for Changes
When delivering a task, always report:

### 1. Summary
What was implemented.

### 2. Files changed
Explicit list of touched files.

### 3. Key decisions
Important choices and trade-offs.

### 4. Validation
What was checked:
- lint
- build
- manual scenarios
- edge cases

### 5. Remaining risks / TODOs
Anything still missing, assumed, or blocked by backend limitations.

---

## Implementation Discipline
- Prefer small, reviewable diffs.
- Keep comments targeted and meaningful.
- Avoid magic logic inside components.
- Keep business mapping and API normalization outside the UI layer.
- When backend contracts are incomplete, document assumptions instead of hiding them.

---

## Definition of Done
A task is only done when:
- the requested behavior works
- lint passes
- build passes
- the architecture remains consistent
- the docs remain accurate
- no sensitive auth data is exposed to the browser
- the change can be understood by the next developer without tribal knowledge

---

## PowerShell Note
Because route groups use parentheses, quote file paths when using PowerShell.

Example:

```powershell
Get-Content -Raw "src\app\(public)\login\page.tsx"