export const THREADS = [
    {
        id: 't1',
        title: 'Welcome to the Course! Start Here.',
        author: { name: 'Sarah Jenkins', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0F172A&color=fff', role: 'Instructor' },
        date: 'Oct 1, 2024',
        preview: 'Welcome everyone to Advanced React Patterns. Please read the syllabus carefully and introduce yourself in this thread...',
        replies: 42,
        likes: 15,
        tags: ['Announcement'],
        isPinned: true,
        isResolved: false,
        category: 'General'
    },
    {
        id: 't2',
        title: 'Help with Module 2: Memoization',
        author: { name: 'David Kim', avatar: '', role: 'Student' },
        date: '2 hours ago',
        preview: 'I am struggling to understand when exactly to use useMemo vs just letting React re-render. Can someone explain?',
        replies: 5,
        likes: 2,
        tags: ['Question', 'Module 2'],
        isPinned: false,
        isResolved: true,
        category: 'Course Content'
    },
    {
        id: 't3',
        title: 'Project Group Formation - GMT Timezone',
        author: { name: 'Elena Rodriguez', avatar: '', role: 'Student' },
        date: '5 hours ago',
        preview: 'Looking for 2 more members for the capstone project. We usually meet around 6 PM GMT.',
        replies: 12,
        likes: 4,
        tags: ['Collaboration'],
        isPinned: false,
        isResolved: false,
        category: 'General'
    },
    {
        id: 't4',
        title: 'Issue with Assignment 3 submission',
        author: { name: 'Marcus Chen', avatar: '', role: 'Student' },
        date: '1 day ago',
        preview: 'I keep getting a timeout error when uploading the ZIP file. Is anyone else facing this?',
        replies: 3,
        likes: 0,
        tags: ['Technical'],
        isPinned: false,
        isResolved: false,
        category: 'Technical'
    }
];

export const COMMENTS = [
    {
        id: 'c1',
        author: { name: 'Sarah Jenkins', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0F172A&color=fff', role: 'Instructor' },
        date: '1 hour ago',
        text: 'Great question, David! `useMemo` is primarily for expensive calculations. If your calculation takes less than 1ms, the overhead of `useMemo` might actually be higher than the recalculation itself.',
        likes: 8,
        isAnswer: true,
        replies: []
    },
    {
        id: 'c2',
        author: { name: 'Alex Rivera', avatar: '', role: 'Student' },
        date: '45 mins ago',
        text: 'Thanks Sarah! That makes sense. Is there a specific tool you recommend to measure that 1ms threshold?',
        likes: 1,
        isAnswer: false,
        replies: [
            {
                id: 'c3',
                author: { name: 'Sarah Jenkins', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0F172A&color=fff', role: 'Instructor' },
                date: '10 mins ago',
                text: 'Yes! The React DevTools Profiler is perfect for this. I will record a quick loom video to demonstrate.',
                likes: 3,
                isAnswer: false
            }
        ]
    }
];
