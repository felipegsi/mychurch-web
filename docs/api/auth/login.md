# Auth Login API

## Purpose
This document describes the login contracts relevant to MyChurch Web.

There are two distinct layers:

1. **Upstream backend contract**  
   The real backend endpoint that authenticates the user.

2. **Internal web BFF contract**  
   The Next.js auth endpoint consumed by the browser.

The browser must use the internal web contract, not the upstream backend contract directly.

---

# 1. Upstream Backend Contract

## Endpoint
`POST https://mychurch-gif3.onrender.com/api/users/login`

## Headers

| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | ✅ |

## Request Body

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| email | string | ✅ | user email |
| password | string | ✅ | never store or log this |

## Known Success Response

```json
{
  "code":0,
  "message":"Login created successfully",
  "data": {
    "user": {
      "id":12,
      "photo":"https://.../view?project=...",
      "name":"John Doe",
      "email":"user@example.com",
      "ministryId":1,
      "churchId":1,
      "statusAccount":"ACCEPTED",
      "personalInfo": {
        "id":12,
        "userId":12,
        "birthdate":"2007-08-16",
        "address": {
          "street":"Example street",
          "city":"Setúbal",
          "state":"Setúbal",
          "postalCode":"1234-567",
          "country":"Portugal"
        },
        "gender":"MALE",
        "maritalStatus":"MARRIED",
        "userWorkload":"0",
        "spouseName":"Tania",
        "weddingDate":"2025-08-06",
        "baptismDate":"2025-08-06",
        "phoneNumber":"351234567890",
        "taxPayerNumber":"123456789",
        "nationality":"Portugal",
        "profession":"Software Engineer",
        "biography":"..."
      },
      "role":"USER",
      "permissions": []
    },
    "token":"JWT_TOKEN"
  }
}
```

## Important Note

The upstream backend returns a token.

That token must be handled only by the BFF layer and must never be exposed to browser JavaScript.

---

# 2. Internal Web BFF Contract

## Endpoint

`POST /api/auth/login`

This is the endpoint the browser must call.

## Purpose

- receive credentials from the browser
- call the upstream backend login endpoint
- set the auth cookie
- return sanitized session data

## Request Body

```json
{
  "email":"user@example.com",
  "password":"your_password"
}
```

## Success Response

The internal web endpoint should not return the raw token.

Recommended response shape:

```json
{
  "code":0,
  "message":"Authenticated successfully",
  "data": {
    "user": {
      "id":12,
      "name":"John Doe",
      "email":"user@example.com",
      "photo":"https://.../view?project=...",
      "role":"USER",
      "ministryId":1,
      "churchId":1,
      "statusAccount":"ACCEPTED"
    },
    "permissions": []
  }
}
```

## Why the Token Is Missing Here

Because session security is cookie-based.

The token is stored in an HttpOnly cookie by the server and is not part of the browser-visible response body.

---

# 3. Internal Session Contract

## Endpoint

`GET /api/auth/session`

## Purpose

Return the current sanitized session state to the browser.

## Recommended Success Response

```json
{
  "code":0,
  "message":"Session loaded successfully",
  "data": {
    "isAuthenticated":true,
    "user": {
      "id":12,
      "name":"John Doe",
      "email":"user@example.com",
      "photo":"https://.../view?project=...",
      "role":"USER",
      "ministryId":1,
      "churchId":1,
      "statusAccount":"ACCEPTED"
    }
  }
}
```

## Recommended Unauthenticated Response

```
{
  "code":401,
  "message":"Not authenticated",
  "data": {
    "isAuthenticated":false,
    "user":null
  }
}
```

# 4. Logout Contract

## Endpoint

`POST /api/auth/logout`

## Purpose

Clear the auth cookie and invalidate browser session state.

## Recommended Success Response

```json
{
  "code":0,
  "message":"Logged out successfully"
}
```

---

# 5. Error Contract

The internal web layer should normalize backend auth errors into user-safe responses.

## Invalid credentials

```json
{
  "code":401,
  "message":"Invalid email or password"
}
```

## Validation error

```json
{
  "code":400,
  "message":"Email and password are required"
}
```

## Unexpected server error

```json
{
  "code":500,
  "message":"Unable to complete login right now"
}
```

The UI should display only normalized user-safe messages.

---

# 6. Domain Mapping Guidance

The frontend should map raw backend payloads into internal domain models.

Recommended internal user shape:

```ts
exporttypeAuthUser= {
  id:number;
  name:string;
  email:string;
  photo?:string|null;
  role:string;
  ministryId?:number|null;
  churchId?:number|null;
  statusAccount?:string|null;
};
```

Avoid coupling UI directly to the entire upstream payload, especially nested `personalInfo`, unless a specific screen needs it.
