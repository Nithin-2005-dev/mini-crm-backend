# Mini CRM Backend — System Design

## 1. Overview
This project is a backend REST API built using **NestJS**, **PostgreSQL**, and **Prisma ORM**.  
The system demonstrates authentication, role-based authorization, clean architecture, and relational data handling.

The application manages:
- Users (Admin & Employees)
- Customers
- Tasks assigned to employees and linked to customers

---

## 2. Tech Stack
- **NestJS (TypeScript)**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **bcrypt** for password hashing
- **Swagger** for API documentation

---

## 3. Roles & Authorization

The system supports two roles:

### ADMIN
- Full access to all modules
- Can manage users, customers, and tasks

### EMPLOYEE
- Read-only access to customers
- Can view tasks assigned to them
- Can update status of their own tasks only

Authorization is enforced using:
- JWT Authentication Guard
- Role-based Authorization Guard (`RolesGuard`)

> Role checks are not handled inside controllers or services.

---

## 4. Domain Entities

### User
- id
- name
- email (unique)
- password (hashed)
- role (ADMIN | EMPLOYEE)
- createdAt

### Customer
- id
- name
- email (unique)
- phone (unique)
- company (optional)
- createdAt
- updatedAt

### Task
- id
- title
- description (optional)
- status (PENDING | IN_PROGRESS | DONE)
- assignedTo (User with role EMPLOYEE)
- customerId
- createdAt
- updatedAt

---

## 5. Entity Relationships

- One **User (EMPLOYEE)** can have many **Tasks**
- One **Customer** can have many **Tasks**
- Each **Task** belongs to one Customer and one Employee

Constraints:
- Tasks can only be assigned to users with role EMPLOYEE
- Customer and assigned user must exist before task creation

---

## 6. Authentication Strategy
- JWT-based authentication (access token only)
- JWT payload contains:
  - userId
  - role
- Tokens are sent via:
Authorization: Bearer <token>

---

## 7. Access Control Matrix

| Module     | Endpoint              | ADMIN | EMPLOYEE |
|-----------|-----------------------|-------|----------|
| Auth      | register / login      | ✔️    | ✔️       |
| Users     | all endpoints         | ✔️    | ❌       |
| Customers | GET                   | ✔️    | ✔️       |
| Customers | POST / PATCH / DELETE | ✔️    | ❌       |
| Tasks     | POST                  | ✔️    | ❌       |
| Tasks     | GET                   | ✔️ (all) | ✔️ (own) |
| Tasks     | PATCH status          | ✔️ (any) | ✔️ (own) |

---

## 8. Error Handling Standards

| Scenario                  | HTTP Status |
|---------------------------|-------------|
| Validation error          | 400         |
| Missing / invalid JWT     | 401         |
| Unauthorized role access | 403         |
| Resource not found        | 404         |
| Duplicate email / phone  | 409         |

---

## 9. Pagination Strategy
Pagination is applied to customer listing.

- page: default = 1
- limit: default = 10

Formula:
skip = (page - 1) * limit

Response includes:
- page
- limit
- totalRecords
- totalPages
- data

---

## 10. Non-Goals
The following are intentionally excluded:
- Refresh tokens
- Permissions table
- Soft deletes
- GraphQL
- Over-engineered abstractions

---

## 11. Design Rationale
This document exists to:
- Remove ambiguity before implementation
- Enforce consistent architectural decisions
- Prevent rework during development
- Maintain professional engineering standards
