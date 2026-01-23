# System Diagrams

## 1. Use Case Diagram

```mermaid
usecaseDiagram
    actor Student
    actor Instructor
    actor Admin

    package "Novara LMS" {
        usecase "Sign Up / Login" as UC1
        usecase "Browse Courses" as UC2
        usecase "Enroll in Course" as UC3
        usecase "Watch Lesson" as UC4
        usecase "Take Quiz" as UC5
        usecase "View Progress" as UC6
        usecase "Manage Courses" as UC7
        usecase "View Analytics" as UC8
    }

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5
    Student --> UC6

    Instructor --> UC1
    Instructor --> UC7
    Instructor --> UC8

    Admin --> UC1
    Admin --> UC7
    Admin --> UC8
```

## 2. Class Diagram (Backend Schema)

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String password
        +String role
        +create()
        +login()
    }

    class Course {
        +String id
        +String title
        +String instructor
        +Module[] modules
        +getDetails()
    }

    class Module {
        +Int id
        +String title
        +Lesson[] lessons
    }

    class Lesson {
        +String id
        +String type
        +String content
        +complete()
    }

    class Enrollment {
        +String id
        +String userId
        +String courseId
        +Int progress
        +String status
        +updateProgress()
    }

    User "1" --> "*" Enrollment
    Course "1" --> "*" Enrollment
    Course "1" *-- "*" Module
    Module "1" *-- "*" Lesson
```

## 3. Sequence Diagram (Course Enrollment)

```mermaid
sequenceDiagram
    participant S as Student
    participant FE as Frontend (React)
    participant API as Backend API
    participant DB as Database

    S->>FE: Click "Enroll Now"
    FE->>API: POST /api/courses/enroll (token, courseId)
    API->>API: Validate Token
    API->>DB: Check if already enrolled
    alt Not Enrolled
        DB-->>API: null
        API->>DB: Create Enrollment Record
        DB-->>API: Success (Enrollment Object)
        API-->>FE: 201 Created
        FE->>S: Show "Start Learning" Button
    else Already Enrolled
        DB-->>API: Enrollment Found
        API-->>FE: 400 Bad Request
        FE->>S: Show Error Message
    end
```
