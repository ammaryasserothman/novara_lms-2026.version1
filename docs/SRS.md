# Software Requirements Specification (SRS)
## Project: Novara LMS

### 1. Introduction
Novara LMS is an enterprise-grade Learning Management System designed to facilitate online education for students, instructors, and administrators. It provides a seamless interface for course creation, enrollment, progress tracking, and certification.

### 2. Scope
The system includes a responsive React-based frontend and a Node.js/Express backend. It covers the following core modules:
- User Authentication & Role Management
- Course Catalog & Enrollment
- Content Delivery (Video, Text, Quizzes)
- Progress Tracking & Analytics
- Certification & Achievements

### 3. Functional Requirements

#### 3.1 Authentication Module
- **FR-01**: Users must be able to Register (Sign Up) as Student or Instructor.
- **FR-02**: Users must be able to Log In using email and password.
- **FR-03**: System must differentiate between 'student', 'instructor', and 'admin' roles.

#### 3.2 Course Management (Instructor)
- **FR-04**: Instructors can view a dashboard of their courses.
- **FR-05**: Instructors can create, edit, and publish courses (Mocked/Planned).

#### 3.3 Learning Module (Student)
- **FR-06**: Students can browse and search for courses.
- **FR-07**: Students can enroll in courses.
- **FR-08**: Students can view lessons (Video/Text) and take quizzes.
- **FR-09**: System must block access to locked lessons until prerequisites are met.

#### 3.4 Progress & Certification
- **FR-10**: System tracks percentage completion of each course.
- **FR-11**: System generates a certificate upon 100% course completion.

### 4. Non-Functional Requirements
- **Performance**: Pages should load within 2 seconds.
- **Scalability**: Backend should handle concurrent requests via REST API.
- **Security**: Passwords must be hashed (bcrypt); Routes protected via JWT.
- **Usability**: UI must be responsive (Mobile/Desktop).

### 5. Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite.
- **Backend**: Node.js, Express, Prisma (ORM), SQLite/Postgres.
- **Testing**: Vitest, React Testing Library.
