import React from 'react';

export type Role = 'student' | 'instructor' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  email: string;
  bio?: string;
  title?: string;
  phone?: string;
  address?: string;
  level?: number;
  xp?: number;
  nextLevelXp?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz';
  content?: string; // For articles
  videoUrl?: string; // For video lessons
  quizId?: string; // Link to a quiz
  locked?: boolean; // Initial state
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number; // Percentage, e.g. 70
}

export interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  rating: number;
  studentsCount: number;
  description: string;
  totalModules: number;
  duration: string;
  syllabus: Module[]; // Added detailed structure
  price?: number; // Enterprise feature
  originalPrice?: number; // For discount display
  features?: string[]; // For pricing card details
  lessonsCount?: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  previewVideoUrl?: string; // Enterprise feature: Specific trailer/intro
}

export interface CartItem extends Course {
  cartId: string; // Unique ID for cart entry (in case of same item multiple times, though unlikely for courses)
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
}


export interface Enrollment {
  courseId: string;
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed';
  lastAccessed: Date;
  completedLessons: string[]; // IDs of completed lessons
  certificateId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: Role[];
}

export interface StatItem {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
}

export interface Bookmark {
  id: string;
  type: 'lesson' | 'resource' | 'course';
  subtype?: 'video' | 'pdf' | 'quiz' | 'link';
  title: string;
  course?: string;
  instructor: string;
  dateSaved: string;
  progress?: number;
  thumbnail?: string;
  size?: string;
  duration?: string;
  domain?: string;
}

export interface UserSettings {
  fullName: string;
  email: string;
  language: string;
  theme: string;
  twoFactor: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    updates: boolean;
  };
  privacy: {
    publicProfile: boolean;
    showCourses: boolean;
  };
}