import React, { createContext, useContext, useState } from 'react';
import { User, Course, Enrollment, Notification, Achievement } from '../types';
import { COURSES as STATIC_COURSES, CURRENT_USER } from '../data/mockData';

// --- MOCK DATABASE INITIALIZATION ---
// In a real app, this data would come from an API. Here we hydrate the state.

/**
 * Global state interface for the application data layer.
 * Manages courses, enrollments, and calculated metrics.
 */
interface GlobalContextType {
  // Data
  /** The current active user profile. */
  currentUser: User;
  /** Full list of available courses (mock database). */
  courses: Course[];
  /** Map of enrollments by CourseID. */
  enrollments: Record<string, Enrollment>; // Map courseId -> Enrollment
  /** List of user notifications. */
  notifications: Notification[];
  /** List of achievements, both locked and unlocked. */
  achievements: Achievement[];
  /** Array of IDs for bookmarked items. */
  bookmarks: string[]; // IDs of bookmarked items

  // Actions / Logic
  /** Enrolls the current user in a course and initializes progress. */
  enrollInCourse: (courseId: string) => void;
  /** Marks a specific lesson as complete and updates course progress. */
  markLessonComplete: (courseId: string, lessonId: string) => void;
  /** Toggles the bookmark state of a course or item. */
  toggleBookmark: (itemId: string) => void;
  /** Marks a notification as read. */
  markNotificationRead: (id: string) => void;

  // Computed / AI Helpers
  /**
   * Calculates the percentage progress for a given course.
   * @param courseId The ID of the course
   * @returns Progress percentage (0-100)
   */
  getCourseProgress: (courseId: string) => number;
  /**
   * AI-driven algorithm to get course recommendations.
   * Logic: Suggests courses in the same category as completed ones, or popular ones.
   */
  getRecommendedCourses: () => Course[];
  /**
   * Returns the next incomplete lesson ID for a course.
   * @param courseId The ID of the course
   */
  getNextLesson: (courseId: string) => string | null; // Returns Lesson ID
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// --- HELPER LOGIC ---
const calculateProgress = (course: Course, completedCount: number): number => {
  // Flatten syllabus to count total lessons
  const totalLessons = course.syllabus.reduce((acc, module) => acc + module.lessons.length, 0);
  if (totalLessons === 0) return 0;
  return Math.round((completedCount / totalLessons) * 100);
};

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- STATE ---
  const [currentUser] = useState<User>(CURRENT_USER);
  const [courses] = useState<Course[]>(STATIC_COURSES); // Static for now

  // Dynamic State
  const [enrollments, setEnrollments] = useState<Record<string, Enrollment>>({
    'c1': {
      courseId: 'c1',
      progress: 65,
      status: 'in_progress',
      lastAccessed: new Date(),
      completedLessons: ['1-1', '1-2', '1-3', '1-4', '2-1'] // Mocks based on static data
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', title: 'Welcome!', message: 'Welcome to NOVARA LMS.', type: 'info', read: false, timestamp: new Date() }
  ]);

  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'a1', title: 'First Step', description: 'Complete your first lesson', icon: 'flag', unlocked: true, unlockedAt: new Date() },
    { id: 'a2', title: 'Course Finisher', description: 'Complete a full course', icon: 'award', unlocked: false }
  ]);

  // --- ACTIONS ---

  const enrollInCourse = (courseId: string) => {
    if (enrollments[courseId]) return; // Already enrolled

    setEnrollments(prev => ({
      ...prev,
      [courseId]: {
        courseId,
        progress: 0,
        status: 'not_started',
        lastAccessed: new Date(),
        completedLessons: []
      }
    }));

    addNotification('Course Enrolled', `You have started ${courses.find(c => c.id === courseId)?.title}`, 'success');
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    const enrollment = enrollments[courseId];
    if (!enrollment) return; // Should likely auto-enroll or error
    if (enrollment.completedLessons.includes(lessonId)) return; // Already done

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newCompleted = [...enrollment.completedLessons, lessonId];
    const newProgress = calculateProgress(course, newCompleted.length);

    // Logic: Check for course completion
    const isComplete = newProgress === 100;

    setEnrollments(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        progress: newProgress,
        completedLessons: newCompleted,
        lastAccessed: new Date(),
        status: isComplete ? 'completed' : 'in_progress',
        certificateId: isComplete ? `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}` : undefined
      }
    }));

    // Trigger Effects
    if (isComplete) {
      addNotification('Course Completed! 🎓', `Congratulations! You finished ${course.title}. Certificate available.`, 'success');
      unlockAchievement('a2');
    }
  };

  const toggleBookmark = (itemId: string) => {
    setBookmarks(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    setNotifications(prev => [{
      id: Date.now().toString(),
      title,
      message,
      type,
      read: false,
      timestamp: new Date()
    }, ...prev]);
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(a =>
      a.id === id && !a.unlocked ? { ...a, unlocked: true, unlockedAt: new Date() } : a
    ));
  };

  // --- GETTERS & AI LOGIC ---

  const getCourseProgress = (courseId: string) => {
    return enrollments[courseId]?.progress || 0;
  };

  // Simple "AI" Recommendation Engine
  const getRecommendedCourses = () => {
    // 1. Get user categories from enrolled courses
    const enrolledIds = Object.keys(enrollments);
    const userCategories = enrolledIds
      .map(id => courses.find(c => c.id === id)?.category)
      .filter(Boolean) as string[];

    // 2. Find courses NOT enrolled, prioritizing matching categories
    return courses
      .filter(c => !enrolledIds.includes(c.id))
      .sort((a, b) => {
        const aMatch = userCategories.includes(a.category) ? 1 : 0;
        const bMatch = userCategories.includes(b.category) ? 1 : 0;
        return bMatch - aMatch; // Descending match
      })
      .slice(0, 2); // Return top 2
  };

  // Logic to find the next playable video
  const getNextLesson = (courseId: string): string | null => {
    const enrollment = enrollments[courseId];
    const course = courses.find(c => c.id === courseId);
    if (!enrollment || !course) return null;

    // Use Set for O(1) lookups and avoid flatMap
    const completedSet = new Set(enrollment.completedLessons);
    for (const module of course.syllabus) {
      for (const lesson of module.lessons) {
        if (!completedSet.has(lesson.id)) {
          return lesson.id;
        }
      }
    }
    return null;
  };

  return (
    <GlobalContext.Provider value={{
      currentUser,
      courses,
      enrollments,
      notifications,
      achievements,
      bookmarks,
      enrollInCourse,
      markLessonComplete,
      toggleBookmark,
      markNotificationRead,
      getCourseProgress,
      getRecommendedCourses,
      getNextLesson
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};