# API Testing

This project includes a Postman collection for testing authentication and customer management APIs.

---

## How to Use

### 1. Start the backend

```bash
npm run start:dev
2. Import the Postman collection
File path: postman/Auth.postman_collection.json

3. Run requests in order
Authentication
Register User

Login User

Admin Bootstrap
An initial ADMIN user is created using a Prisma seed script.

Admin Credentials (for testing)
Email: admin@test.com

Password: admin123

Run the seed command if the admin does not exist:

npx prisma db seed
Customer API Tests
Create Customer (ADMIN only)
Endpoint: POST /customers

Requires ADMIN role

Returns 403 Forbidden for EMPLOYEE users

Get All Customers
Endpoint: GET /customers

Accessible by ADMIN and EMPLOYEE

Requires JWT authentication

Get Customer by ID
Endpoint: GET /customers/:id

Returns 404 Not Found if the customer does not exist

Security Notes
JWT access token must be sent in the header:

Authorization: Bearer <token>
Passwords are never returned in API responses

Unauthorized requests return 401 Unauthorized