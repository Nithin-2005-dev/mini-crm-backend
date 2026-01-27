# API Testing

This project includes Postman collections for testing authentication, user management, customer management, and task management APIs.

All APIs are exposed under the `/api` base path.

---

## How to Use

### 1. Start the backend

```bash
npm run start:dev
2. Import Postman collections
postman/Auth-Customers.postman_collection.json

postman/Tasks.postman_collection.json

Authentication Tests
Register User
Endpoint: POST /api/auth/register

Used to create EMPLOYEE users

Login User
Endpoint: POST /api/auth/login

Returns JWT access token

Admin Bootstrap
An initial ADMIN user is created using a Prisma seed script.

Admin Credentials
Email: admin@test.com

Password: admin123

Run the seed command if the admin does not exist:

npx prisma db seed
Users API Tests (ADMIN Only)
Get All Users
Endpoint: GET /api/users

Access: ADMIN only

Get User by ID
Endpoint: GET /api/users/:id

Access: ADMIN only

Returns 404 Not Found if user does not exist

Update User Role
Endpoint: PATCH /api/users/:id/role

Access: ADMIN only

Updates only the user role

Customer API Tests
Create Customer
Endpoint: POST /api/customers

Access: ADMIN only

EMPLOYEE receives 403 Forbidden

Get Customers (Paginated)
Endpoint: GET /api/customers?page=1&limit=10

Access: ADMIN, EMPLOYEE

Returns paginated response with metadata

Get Customer by ID
Endpoint: GET /api/customers/:id

Returns 404 Not Found if customer does not exist

Update Customer
Endpoint: PATCH /api/customers/:id

Access: ADMIN only

Delete Customer
Endpoint: DELETE /api/customers/:id

Access: ADMIN only

Task API Tests
Create Task
Endpoint: POST /api/tasks

Access: ADMIN only

Assigns task to an EMPLOYEE

Get Tasks
Endpoint: GET /api/tasks

ADMIN sees all tasks

EMPLOYEE sees only assigned tasks

Update Task Status
Endpoint: PATCH /api/tasks/:id/status

ADMIN can update any task

EMPLOYEE can update only own tasks

Security Notes
JWT token must be sent as:

Authorization: Bearer <token>
Unauthorized access returns 401 Unauthorized

Role violations return 403 Forbidden

Passwords are never returned in API responses