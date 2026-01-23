# Novara LMS - Production-Ready Learning Management System

A full-stack Learning Management System built with **React + TypeScript** frontend and **Node.js + Express + Prisma** backend. Features JWT authentication, course enrollment, progress tracking, payment integration, and role-based authorization.

## 🚀 Features

### Authentication & Authorization
- ✅ JWT-based authentication with refresh tokens
- ✅ Password reset with email verification
- ✅ Role-based access control (Admin, Instructor, Student)
- ✅ Secure password hashing with bcrypt

### Course Management
- ✅ Browse courses with filtering and search
- ✅ Detailed course pages with syllabus
- ✅ Video lessons, articles, and quizzes
- ✅ Course enrollment and progress tracking
- ✅ Student dashboard with enrolled courses

### Payment Integration
- ✅ Stripe payment processing
- ✅ Payment history and receipts
- ✅ Course purchase workflow

### User Experience
- ✅ Modern, responsive UI with TailwindCSS
- ✅ Dark mode support
- ✅ Real-time notifications
- ✅ Profile management
- ✅ Certificate generation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Lucide Icons** - Icons

### Backend
- **Node.js** - Runtime
- **Express 4** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **SQLite** - Database (easily switch to PostgreSQL)
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Stripe** - Payments
- **Zod** - Validation

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Git**
- **(Optional)** PostgreSQL if migrating from SQLite

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd novara-lms
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 3. Environment Setup

**Backend (.env)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="file:./src/prisma/dev.db"
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env)**
```bash
cd ..  # Back to root
cp .env.example .env
```

Your frontend `.env` should have:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

```bash
cd server

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

**Test Accounts Created:**
```
Admin:       admin@novara.edu / password123
Instructor:  sarah.chen@novara.edu / password123
Instructor:  david.park@novara.edu / password123
Student:     alex.rivera@novara.edu / password123
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
# From root directory
npm run dev
```
Frontend runs on http://localhost:5173

### 6. Access the Application

Open your browser to **http://localhost:5173** and login with any test account above.

## 📚 Project Structure

```
novara-lms/
├── server/                    # Backend API
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth, error handling
│   │   ├── routes/           # API routes
│   │   ├── services/         # Email, Stripe services
│   │   ├── prisma/           # Database schema & seeds
│   │   ├── types/            # TypeScript types
│   │   └── index.ts          # Server entry
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── components/               # React components
├── context/                  # React context (Auth, Global)
├── lib/                      # API client, utilities
├── pages/                    # Page components
├── hooks/                    # Custom React hooks
├── types.ts                  # TypeScript interfaces
├── App.tsx                   # Main app component
├── index.tsx                 # React entry point
└── package.json
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev                # Start dev server with hot reload
npm run build              # Compile TypeScript
npm start                  # Run compiled JS
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:seed        # Seed database
npm run prisma:studio      # Open Prisma Studio GUI
```

## 🌐 API Documentation

### Authentication Endpoints

```http
POST   /api/auth/signup          # Create new account
POST   /api/auth/login           # Login
POST   /api/auth/forgot-password # Request password reset
POST   /api/auth/reset-password  # Reset password with token
POST   /api/auth/refresh-token   # Refresh JWT token
GET    /api/auth/me              # Get current user
```

### Course Endpoints

```http
GET    /api/courses              # List all courses
GET    /api/courses/:id          # Get course details
POST   /api/courses/enroll       # Enroll in course
POST   /api/courses/:id/progress # Update lesson progress
```

### Example API Call

```typescript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'alex.rivera@novara.edu',
    password: 'password123'
  })
});

const { token, user } = await response.json();
```

## 🔐 Authentication Flow

1. User logs in with email/password
2. Backend validates credentials and returns JWT + Refresh Token
3. Frontend stores tokens in localStorage
4. All API requests include JWT in Authorization header
5. Expired tokens automatically refresh using refresh token
6. Invalid refresh tokens redirect to login

## 🗄️ Database Schema

### Models
- **User** - Admin, Instructor, Student roles
- **Course** - Course information and metadata
- **Module** - Course modules/sections
- **Lesson** - Individual lessons (video, article, quiz)
- **Quiz** - Quiz questions and answers
- **Enrollment** - Student course enrollments
- **Payment** - Payment records
- **PasswordReset** - Password reset tokens

## 📧 Email Configuration

For development, use [Ethereal Email](https://ethereal.email/) for testing:

1. Visit https://ethereal.email/create
2. Copy credentials to `server/.env`
3. Check email preview in console logs

For production, use:
- Gmail (with App Password)
- SendGrid
- AWS SES
- Mailgun

## 💳 Stripe Setup (Optional)

1. Create account at https://stripe.com
2. Get test API keys from Dashboard
3. Add to `server/.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

## 🚀 Deploying to Production

### Backend (Railway/Render/Heroku)

1. Create PostgreSQL database
2. Set environment variables
3. Update `DATABASE_URL` in Prisma schema
4. Run migrations: `npm run prisma:migrate`  
5. Build: `npm run build`
6. Start: `npm start`

### Frontend (Vercel/Netlify)

1. Set environment variable:
   - `VITE_API_URL=https://your-api-url.com/api`
2. Build command: `npm run build`
3. Output directory: `dist`

## 🧪 Testing

```bash
# Run all tests
npm test

# Backend tests
cd server && npm test

# Frontend tests
npm run test:ui
```

## 📦 Production Build

```bash
# Frontend
npm run build
# Output in: dist/

# Backend  
cd server && npm run build
# Output in: server/dist/
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

### Database Connection Issues
```bash
# Reset database
cd server
rm src/prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

### CORS Errors
Ensure `FRONTEND_URL` in `server/.env` matches your frontend URL.

## 📧 Support

For issues and questions:
- 📫 Email: support@novara.edu
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Built with ❤️ by the Novara Team**
