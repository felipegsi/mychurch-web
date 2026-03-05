# Project Context — MyChurch Web

## Product Overview
MyChurch is a church management platform built to help churches organize their operations, people, and internal processes in a structured digital environment.

MyChurch Web is the web application of that ecosystem.

It complements the mobile app and is intended to become a strong operational surface for both common members and administrative roles.

---

## Why the Web Platform Exists
The web platform exists for four main reasons:

1. **Access expansion**  
   Allow users, especially iOS users, to access the platform without depending on mobile store distribution.

2. **SEO and discoverability**  
   Enable public-facing pages and broader online presence.

3. **Administrative productivity**  
   Offer a more scalable and ergonomic interface for back-office and leadership workflows.

4. **SaaS evolution**  
   Prepare the product for long-term growth as a scalable church management platform.

---

## Primary User Profiles
The platform is expected to support multiple user profiles, including:

- Member
- Leader
- Administrator
- Secretary
- Pastor

Different roles may eventually require different permissions, navigation paths, and dashboard capabilities.

---

## Core Business Domains
At this stage, the product context includes the following domains:

- authentication and access control
- members and profiles
- ministries
- events and calendar
- communication workflows
- financial responsibilities where applicable

---

## Platform Boundaries
### Backend
- Spring Boot REST API

### Web Frontend
- Next.js application
- TypeScript
- Zustand for client state
- BFF boundary for auth

### Mobile
- Flutter application

The web application must align with the backend contract and coexist with the mobile ecosystem without creating contradictory business rules.

---

## Product Principles
The product should evolve according to these principles:

- **trustworthy**  
  Sensitive user data and authentication flows must be handled safely.

- **clear**  
  User experience should feel understandable and low-friction.

- **role-aware**  
  The system should support differentiated behavior by role without chaotic branching.

- **scalable**  
  Architecture decisions should support future growth.

- **maintainable**  
  New features should not require rewriting the product foundation.

- **AI-friendly**  
  Documentation and code structure should help AI tools accelerate development without increasing architectural drift.

---

## Current Web Priorities
The current phase should prioritize:

1. robust authentication
2. protected navigation
3. session consistency
4. clear architecture foundations
5. production-safe engineering standards

This means auth and architecture quality are more important than premature feature volume.

---

## Success Criteria for the Current Phase
The current phase is successful when:

- login is reliable
- session handling is secure
- protected routes behave correctly
- documentation reflects reality
- the codebase is ready for feature growth without rework

---

## Out of Scope for This Document
This document does not define:
- detailed UI design
- component styling rules
- endpoint-by-endpoint backend documentation
- release management policy

Those concerns belong in other documents.