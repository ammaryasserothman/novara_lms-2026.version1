import { Course, User } from '../types';
import advancedReactThumb from '../assets/advanced-react-thumb.png';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  role: 'student',
  email: 'alex.rivera@novara.edu',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  title: 'Senior Student',
  bio: 'Passionate learner focused on Full Stack Development and AI integration in enterprise systems.',
  phone: '+1 (555) 012-3456',
  address: '123 Innovation Blvd, Tech City, CA 94043'
};

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced React Patterns & Performance',
    instructor: 'Sarah Jenkins',
    thumbnail: advancedReactThumb,
    category: 'Development',
    rating: 4.8,
    studentsCount: 1240,
    description: 'Master enterprise-grade React architecture, optimization techniques, and advanced hooks.',
    totalModules: 3,
    duration: '8h 30m',
    price: 64.99,
    originalPrice: 94.99,
    previewVideoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk?autoplay=1', // React Native in 100 Seconds (as placeholder for React)
    syllabus: [
      {
        id: 1,
        title: "Module 1: Advanced Patterns",
        duration: "2h 15m",
        lessons: [
          { id: '1-1', title: "Introduction to Compound Components", duration: "15m", type: 'video' },
          { id: '1-2', title: "Render Props vs. Custom Hooks", duration: "25m", type: 'video' },
          { id: '1-3', title: "State Reducers Pattern", duration: "45m", type: 'video' },
          { id: '1-4', title: "Module Quiz", duration: "15m", type: 'quiz' }
        ]
      },
      {
        id: 2,
        title: "Module 2: Performance Optimization",
        duration: "3h 30m",
        lessons: [
          { id: '2-1', title: "Profiling React Applications", duration: "20m", type: 'video' },
          { id: '2-2', title: "Code Splitting & Lazy Loading", duration: "45m", type: 'video' },
          { id: '2-3', title: "Memoization Deep Dive", duration: "35m", type: 'video' },
          { id: '2-4', title: "Virtualization Techniques", duration: "40m", type: 'video' }
        ]
      },
      {
        id: 3,
        title: "Module 3: Enterprise State Management",
        duration: "2h 45m",
        lessons: [
          { id: '3-1', title: "Server State vs. Client State", duration: "30m", type: 'video' },
          { id: '3-2', title: "Zustand & Jotai", duration: "45m", type: 'video' },
          { id: '3-3', title: "Complex Form State", duration: "50m", type: 'video' }
        ]
      },
    ]
  },
  {
    id: 'c2',
    title: 'UI/UX Design Systems Fundamentals',
    instructor: 'Marcus Chen',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Design',
    rating: 4.9,
    studentsCount: 850,
    description: 'Learn how to build scalable design systems using Figma and modern CSS methodologies.',
    totalModules: 2,
    duration: '6h 15m',
    price: 59.99,
    originalPrice: 89.99,
    previewVideoUrl: 'https://www.youtube.com/embed/pDdt0M9W7ew?autoplay=1', // UI/UX Design Trends
    syllabus: [
      {
        id: 1, title: 'Foundations', duration: '3h', lessons: [{ id: 'c2-1-1', title: 'Design Tokens', duration: '15m', type: 'video' }]
      },
      {
        id: 2, title: 'Components', duration: '3h', lessons: [{ id: 'c2-2-1', title: 'Button Components', duration: '25m', type: 'video' }]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Data Science for Business Intelligence',
    instructor: 'Dr. Emily Watson',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Data Science',
    rating: 4.7,
    studentsCount: 2100,
    description: 'A comprehensive guide to leveraging data for actionable business insights.',
    totalModules: 15,
    duration: '12h 45m',
    price: 124.99,
    originalPrice: 199.99,
    previewVideoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30?autoplay=1', // Data Science Roadmap
    syllabus: [
      {
        id: 1,
        title: "Module 1: Introduction to Data Science",
        duration: "2h 30m",
        lessons: [
          { id: 'c3-1-1', title: "What is Data Science?", duration: "20m", type: 'video' },
          { id: 'c3-1-2', title: "The Data Science Workflow", duration: "35m", type: 'video' },
          { id: 'c3-1-3', title: "Tools of the Trade", duration: "45m", type: 'video' },
          { id: 'c3-1-4', title: "Module Quiz", duration: "15m", type: 'quiz' }
        ]
      },
      {
        id: 2,
        title: "Module 2: Data Analysis Fundamentals",
        duration: "3h 15m",
        lessons: [
          { id: 'c3-2-1', title: "Understanding Data Types", duration: "25m", type: 'video' },
          { id: 'c3-2-2', title: "Exploratory Data Analysis", duration: "50m", type: 'video' },
          { id: 'c3-2-3', title: "Statistical Foundations", duration: "45m", type: 'video' }
        ]
      }
    ]
  },
  {
    id: 'c4',
    title: 'Enterprise Project Management',
    instructor: 'James Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    rating: 4.5,
    studentsCount: 300,
    description: 'Agile methodologies and leadership skills for managing large-scale projects.',
    totalModules: 6,
    duration: '4h 00m',
    price: 79.99,
    originalPrice: 129.99,
    previewVideoUrl: 'https://www.youtube.com/embed/Z0qISV3r9-4?autoplay=1', // Project Management in under 8 minutes
    syllabus: [
      {
        id: 1,
        title: "Module 1: Project Management Foundations",
        duration: "1h 30m",
        lessons: [
          { id: 'c4-1-1', title: "Introduction to Project Management", duration: "20m", type: 'video' },
          { id: 'c4-1-2', title: "Project Lifecycle Phases", duration: "35m", type: 'video' },
          { id: 'c4-1-3', title: "Stakeholder Management", duration: "25m", type: 'video' }
        ]
      },
      {
        id: 2,
        title: "Module 2: Agile Methodologies",
        duration: "2h 00m",
        lessons: [
          { id: 'c4-2-1', title: "What is Agile?", duration: "30m", type: 'video' },
          { id: 'c4-2-2', title: "Scrum Framework", duration: "45m", type: 'video' },
          { id: 'c4-2-3', title: "Kanban Essentials", duration: "30m", type: 'video' },
          { id: 'c4-2-4', title: "Module Quiz", duration: "15m", type: 'quiz' }
        ]
      }
    ]
  },
];

export const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Assignment Due', message: 'React Patterns assignment due in 2 hours', time: '2h ago', read: false },
  { id: '2', title: 'New Course Added', message: 'Advanced TypeScript is now available', time: '1d ago', read: true },
];