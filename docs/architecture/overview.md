# Architecture Overview — MyChurch Web

## Purpose
This document defines the high-level frontend architecture of MyChurch Web.

Its goal is to make the codebase:
- scalable
- predictable
- secure
- easy to understand
- friendly to AI-assisted development

---

## Architectural Style
MyChurch Web follows a **feature-first frontend architecture** with a clear separation between:

- presentation
- feature/domain logic
- shared infrastructure
- shared utilities and types

The project uses **Next.js App Router** and should preserve strong boundaries between UI concerns, application state, and server communication.

---

## High-Level Layers

### 1. Presentation Layer
Responsible for rendering pages and UI interactions.

Typical locations:
- `src/app/*`
- `src/components/*`
- `src/features/*/components/*`

Responsibilities:
- route entry points
- layouts
- page composition
- forms and user interaction
- rendering user-safe error states

The presentation layer must not own backend communication details.

---

### 2. Feature Layer
Responsible for domain-focused frontend behavior.

Typical locations:
- `src/features/auth/*`
- future domains such as:
  - `src/features/members/*`
  - `src/features/events/*`
  - `src/features/ministries/*`

Recommended internal structure per feature:
- `components/`
- `hooks/`
- `model/`
- `services/`
- `store/`

Responsibilities:
- feature-specific logic
- DTO-to-domain mapping
- feature state orchestration
- use-case oriented service calls

---

### 3. Shared Infrastructure Layer
Responsible for reusable technical concerns.

Typical locations:
- `src/services/http/*`
- `src/lib/*`
- `src/types/*`

Responsibilities:
- HTTP client configuration
- interceptors
- error normalization
- shared helpers
- global type definitions

This layer must not depend on feature UI.

---

## Allowed Dependency Direction
The dependency direction is intentionally strict:

- `app / components` → `features`
- `features` → `shared infrastructure`
- `shared infrastructure` → no dependency on feature UI or app routes

### Allowed examples
- login page uses `auth` store/hook
- auth feature uses shared HTTP client
- shared HTTP client uses global error types

### Forbidden examples
- React component calling Axios directly
- shared HTTP layer importing feature store
- one feature depending on another feature's internal file without a defined contract

---

## Route Structure
The application is organized around route groups and authenticated areas.

### Public routes
- `src/app/(public)/*`

Examples:
- login
- register
- future public-facing pages

### Authenticated routes
- `src/app/dashboard/*`

Examples:
- dashboard
- protected application surfaces
- role-based operational pages

---

## Recommended Source Structure

```text
src/
├─ app/
│  ├─ (public)/
│  │  ├─ login/
│  │  └─ register/
│  ├─ api/
│  │  └─ auth/
│  │     ├─ login/
│  │     ├─ session/
│  │     └─ logout/
│  └─ dashboard/
│
├─ components/
│  ├─ ui/
│  └─ shared/
│
├─ features/
│  └─ auth/
│     ├─ components/
│     ├─ hooks/
│     ├─ model/
│     ├─ services/
│     └─ store/
│
├─ services/
│  └─ http/
│
├─ lib/
└─ types/
```
## Environment Variable Direction

Use environment variables instead of hardcoded URLs.

Recommended split:

### Public-safe

- `NEXT_PUBLIC_APP_URL`

### Server-only

- `BACKEND_API_BASE_URL`
- `AUTH_COOKIE_NAME`

Do not expose server-only values through `NEXT_PUBLIC_*` unless they are intentionally public.

---

## State Management Direction

Zustand is the official client state solution for auth and similar frontend state concerns.

However:

- Zustand is not the session boundary
- the browser is not the source of truth for auth tokens
- session authority lives in the server-side BFF boundary

This avoids mixing UI state with security ownership.

---

## Error Handling Direction

All external errors should be normalized before reaching the UI.

Recommended shape:

```
exporttypeAppError= {
  kind:"Network"|"Auth"|"Validation"|"Server"|"Unknown";
  message:string;
  status?:number;
  details?:unknown;
};
```

UI should consume user-safe messages only.

---

## Documentation Rule

Any change that affects:

- folder structure
- dependency direction
- state boundaries
- auth behavior
- route ownership

must update the relevant documentation in the same PR.

## User Architecture in Flutter

Here is how User model has been implemented in Flutter to handle with all scenarios:

```java
// Classe User
import 'dart:convert';
import 'package:frontend/models/user/personal_info.dart';
import 'package:frontend/enums/role.dart';
import 'package:frontend/enums/status_account.dart';
import '../permission/permission.dart';

class User {
  final int? id;
  final String? photo;
  final String? name;
  final String? email;
  final String? password;
  final int? ministryId;
  final int? churchId;
  final String? churchName;
  final String? churchEmail; // Adicionado para substituir UserSummary
  final StatusAccount? statusAccount;
  final PersonalInfo? personalInfo;
  final Role? role;
  final Set<Permission>? permissions;

  User({
    this.id,
    this.photo,
    this.name,
    this.email,
    this.password,
    this.ministryId,
    this.churchId,
    this.churchName,
    this.churchEmail, // Adicionado para substituir UserSummary
    this.statusAccount,
    this.personalInfo,
    this.role,
    this.permissions,
  });
//recebe
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      photo: json['photo'],
      name: json['name'] ?? 'Usuário Desconhecido',
      email: json['email'] ?? 'Email não disponível',
      password: json['password'],
      ministryId: json['ministryId'],
      churchId: json['churchId'],
      churchName: json['churchName'], // Adicionado para substituir UserSummary
      churchEmail: json['churchEmail'], // Adicionado para substituir UserSummary
      statusAccount: json['statusAccount'] != null
          ? StatusAccount.values.firstWhere((e) => e.toString() == 'StatusAccount.${json['statusAccount']}')
          : null,
      personalInfo: json['personalInfo'] != null ? PersonalInfo.fromJson(json['personalInfo']) : null,
      role: json['role'] != null
          ? Role.values.firstWhere((e) => e.toString() == 'Role.${json['role']}')
          : null,
      permissions: json['permissions'] != null
          ? (json['permissions'] as List).map((permission) => Permission.fromJson(permission)).toSet()
          : <Permission>{},
    );
  }
//envia
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'photo': photo,
      'name': name,
      'email': email,
      'password': password,
      'ministryId': ministryId,
      'churchId': churchId,
      'churchName': churchName, // subtitui o UserSummary
      'churchEmail': churchEmail, // subtitui o UserSummary
      'statusAccount': statusAccount?.toString().split('.').last,
      'personalInfo': personalInfo?.toJson(),
      'role': role?.toString().split('.').last,
      'permissions': permissions?.map((permission) => permission.toJson()).toList(),
    };
  }

  factory User.registerUserfromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'] ?? 'Usuário Desconhecido', // Valor padrão para evitar null
      email: json['email'] ?? 'Email não disponível',
      password: json['password'], // Pode ser null, já que não está no JSON de exemplo
      churchId: json['churchId'],

    );
  }


  Map<String, dynamic> registerUsertoJson() {
    return {
      'name': name,
      'email': email,
      'password': password,
      'churchId': churchId,
 };
  }

  factory User.fromDB(Map<String, dynamic> db) {
    return User(
      id: db['id'],
      name: db['name'],
      email: db['email'],
      password: db['password'],
      statusAccount: db['statusAccount'] != null
          ? StatusAccount.values.firstWhere(
            (e) => e.toString() == 'StatusAccount.${db['statusAccount']}',
      )
          : null,
      personalInfo: db['personalInfo'] != null
          ? (db['personalInfo'] is String
          ? PersonalInfo.fromJson(json.decode(db['personalInfo']))
          : PersonalInfo.fromJson(db['personalInfo']))
          : null,
      role: db['role'] != null
          ? Role.values.firstWhere(
            (e) => e.toString() == 'Role.${db['role']}',
      )
          : null,
      permissions: db['permissions'] != null
          ? (db['permissions'] is String
          ? (json.decode(db['permissions']) as List)
          .map((permission) => Permission.fromJson(permission))
          .toSet()
          : (db['permissions'] as List)
          .map((permission) => Permission.fromJson(permission))
          .toSet())
          : <Permission>{},
    );
  }

  @override
  String toString() {
    return 'User{id: $id, photo: $photo, name: $name, email: $email, password: $password, ministry: $ministryId, church: $churchId, statusAccount: $statusAccount, personalInfo: $personalInfo, role: $role, permissions: $permissions}';
  }
}

```