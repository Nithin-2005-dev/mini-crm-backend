# Mini CRM Backend

A role-based Mini CRM backend built with **NestJS**, **PostgreSQL**, and **Prisma**.  
The system supports **Admin** and **Employee** roles with secure JWT authentication.

---

## 🚀 Tech Stack

- Node.js + TypeScript
- NestJS
- PostgreSQL (Docker)
- Prisma ORM
- JWT Authentication
- Swagger API Documentation
- Postman Collections

---

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (ADMIN, EMPLOYEE)
- Secure password hashing with bcrypt

### Users (ADMIN Only)
- View all users
- View user by ID
- Update user role

### Customers
- Create, read, update, delete customers
- Pagination support
- Unique email and phone validation
- ADMIN: full access
- EMPLOYEE: read-only access

### Tasks
- ADMIN can create and assign tasks to employees
- Tasks linked to customers
- ADMIN sees all tasks
- EMPLOYEE sees only assigned tasks
- Task status updates with ownership checks

---

## 🛠️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
2️⃣ Install Dependencies
npm install
3️⃣ Environment Variables
Create a .env file:

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mini_crm
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
4️⃣ Start PostgreSQL (Docker)
docker-compose up -d
5️⃣ Prisma Setup
npx prisma migrate dev
npx prisma db seed
This creates the initial ADMIN user.

6️⃣ Run the Server
npm run start:dev
Server runs at:

http://localhost:3000
📘 API Documentation (Swagger)
Swagger UI available at:

http://localhost:3000/api/docs
JWT Bearer authentication supported

All request/response schemas documented

🧪 API Testing
Postman collections are available in the postman/ folder:

Auth-Customers.postman_collection.json

Tasks.postman_collection.json

Refer to:

docs/TESTING.md
👤 Default Admin Credentials
Email: admin@test.com
Password: admin123
📂 Project Structure (Simplified)
src/
 ├── auth
 ├── users
 ├── customers
 ├── tasks
 ├── prisma
 └── common