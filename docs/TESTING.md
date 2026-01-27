# API Testing

This project includes a Postman collection for testing the authentication endpoints.

---

## How to Use

### 1. Start the backend

```bash
npm run start:dev
2. Import the Postman collection

File path: postman/Auth.postman_collection.json

3. Run requests in order

Register User

Login User


Notes

Ensure the PostgreSQL Docker container is running

A JWT access token is returned on successful login

Passwords are never returned in API responses

