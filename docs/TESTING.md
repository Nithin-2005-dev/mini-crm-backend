# API Testing

This project includes Postman collections for testing authentication, user management, customer management, and task management APIs.

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
Endpoint: POST /auth/register

Used to create EMPLOYEE users

Login User
Endpoint: POST /auth/login

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
Endpoint: GET /users

Access: ADMIN only

Get User by ID
Endpoint: GET /users/:id

Access: ADMIN only

Returns 404 Not Found if user does not exist

Update User Role
Endpoint: PATCH /users/:id/role

Access: ADMIN only

Updates only the user role

Customer API Tests
Create Customer
Endpoint: POST /customers

Access: ADMIN only

EMPLOYEE receives 403 Forbidden

Get All Customers
Endpoint: GET /customers

Access: ADMIN, EMPLOYEE

Get Customer by ID
Endpoint: GET /customers/:id

Returns 404 Not Found if customer does not exist

Task API Tests
Create Task
Endpoint: POST /tasks

Access: ADMIN only

Assigns task to an EMPLOYEE

Get Tasks
Endpoint: GET /tasks

ADMIN sees all tasks

EMPLOYEE sees only assigned tasks

Update Task Status
Endpoint: PATCH /tasks/:id/status

ADMIN can update any task

EMPLOYEE can update only own tasks

Security Notes
JWT token must be sent as:

Authorization: Bearer <token>
Unauthorized access returns 401 Unauthorized

Role violations return 403 Forbidden

Passwords are never returned in API responses