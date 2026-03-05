# Docs — MyChurch Web

This folder is the **documentation hub** for MyChurch Web.

It exists to keep architecture, auth behavior, API contracts, business context, and engineering standards explicit, searchable, and usable by both developers and AI tools.

---

## What is MyChurch Web?
MyChurch Web is the web platform of the MyChurch ecosystem.

It is designed to:
- extend access beyond the mobile app
- support iOS users without App Store dependency
- improve SEO and public discoverability
- provide a stronger administrative interface
- support long-term SaaS evolution

---

## Documentation Map

### Product
- `product/project-context.md`  
  Product vision, user profiles, goals, domain language, and platform boundaries.

### Architecture
- `architecture/overview.md`  
  High-level structure, layers, dependency direction, folder strategy.
- `architecture/auth-architecture.md`  
  Official authentication architecture using BFF + HttpOnly cookie.

### API
- `api/auth/login.md`  
  Backend login contract and internal BFF login contract.

### Flows
- `flows/authentication.md`  
  End-to-end auth behavior: login, session hydration, route protection, logout, and 401 handling.

### Standards
- `standards/engineering-rules.md`  
  Non-negotiable engineering and security standards.

### Decisions
- `decisions/ADR-001-auth-session-strategy.md`  
  Accepted architectural decision for session handling.

### Runbooks
- `runbooks/local-development.md`  
  Local setup, env vars, auth testing, and common troubleshooting.

---

## Mandatory Read Order
For any auth, infra, architecture, or state-related task, read in this order:

1. `product/project-context.md`
2. `architecture/overview.md`
3. `architecture/auth-architecture.md`
4. `api/auth/login.md`
5. `flows/authentication.md`
6. `standards/engineering-rules.md`
7. `decisions/ADR-001-auth-session-strategy.md`
8. `runbooks/local-development.md`
9. `../AGENTS.md`

---

## Documentation Principles
- Docs are part of the deliverable.
- If implementation changes behavior, docs must be updated in the same PR.
- Business language and technical language must stay aligned.
- Avoid hidden conventions: if a pattern matters, document it.

---

## Scope of This Documentation
This documentation focuses on:
- how the web application is structured
- how auth works
- how engineers should implement changes
- how to keep the project scalable and AI-friendly

This documentation is not intended to be marketing copy or end-user help content.