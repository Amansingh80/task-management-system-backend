# Task Management System - Backend API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.7-blueviolet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

Complete Task Management System Backend built with Node.js, TypeScript, Express, Prisma, and JWT Authentication.

## 🎯 Features

- ✅ **JWT Authentication** - Access & Refresh Tokens
- ✅ **User Management** - Register, Login, Logout
- ✅ **Task CRUD** - Create, Read, Update, Delete tasks
- ✅ **Pagination** - Efficient data loading
- ✅ **Filtering** - Filter by task status
- ✅ **Search** - Search tasks by title
- ✅ **Password Security** - bcrypt hashing
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Database ORM** - Prisma with PostgreSQL
- ✅ **Input Validation** - express-validator
- ✅ **Error Handling** - Comprehensive error middleware

## 🛠️ Tech Stack

- **Runtime:** Node.js v18+
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** express-validator

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- PostgreSQL database
- npm or yarn

### Setup Steps

1. **Clone the repository:**
```bash
git clone https://github.com/Amansingh80/task-management-system-backend.git
cd task-management-system-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanagement?schema=public"
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

4. **Setup database:**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Run the server:**
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## 🚀 Running in IntelliJ IDEA

1. Open IntelliJ IDEA
2. Install Node.js plugin (if not installed)
3. Open the project folder
4. Open Terminal (Alt+F12)
5. Run `npm install`
6. Create `.env` file with your configuration
7. Run `npm run dev`
8. Server starts at `http://localhost:3000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout user |

### Tasks (Protected Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (pagination, filtering, search) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/tasks/:id/toggle` | Toggle task status |

### Query Parameters for GET /api/tasks

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (PENDING, IN_PROGRESS, COMPLETED, ALL)
- `search` - Search by title

## 📝 API Examples

### Register User
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Task
```bash
POST http://localhost:3000/api/tasks
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "PENDING"
}
```

### Get Tasks with Filters
```bash
GET http://localhost:3000/api/tasks?page=1&limit=10&status=PENDING&search=project
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 📊 Database Schema

### User Model
```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  name          String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  tasks         Task[]
  refreshTokens RefreshToken[]
}
```

### Task Model
```prisma
model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(PENDING)
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}
```

### RefreshToken Model
```prisma
model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Access token (short-lived, 15 minutes)
- Refresh token (long-lived, 7 days)
- Protected routes with authentication middleware
- Input validation with express-validator
- SQL injection prevention (Prisma ORM)
- CORS configuration
- Comprehensive error handling

## 📁 Project Structure

```
task-management-backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   └── database.ts        # Prisma client
│   ├── controllers/
│   │   ├── auth.controller.ts # Auth logic
│   │   └── task.controller.ts # Task CRUD
│   ├── middleware/
│   │   ├── auth.middleware.ts # JWT verification
│   │   ├── error.middleware.ts# Error handling
│   │   └── validation.middleware.ts # Validation
│   ├── routes/
│   │   ├── auth.routes.ts     # Auth endpoints
│   │   └── task.routes.ts     # Task endpoints
│   ├── types/
│   │   └── express.d.ts       # TypeScript types
│   ├── utils/
│   │   ├── jwt.util.ts        # JWT helpers
│   │   └── password.util.ts   # Password hashing
│   └── index.ts               # App entry point
├── .env                       # Environment variables
├── .env.example               # Example env file
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # Documentation
```

## 🧪 Testing

Use tools like Postman, Insomnia, or Thunder Client to test the API endpoints.

## 📚 Documentation

For complete setup guide and documentation, visit:
https://amansingh80.github.io/task-management-system-guide/

## 📄 License

MIT

## 👨‍💻 Author

Built for Software Engineering Assessment

---

**Happy Coding! 🚀**