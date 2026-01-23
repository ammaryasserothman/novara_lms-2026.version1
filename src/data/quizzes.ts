import { Quiz } from '../types';

export const MOCK_QUIZZES: Record<string, Quiz> = {
    'quiz-1': {
        id: 'quiz-1',
        title: 'Foundations of UI Design Quiz',
        passingScore: 70,
        questions: [
            {
                id: 'q1',
                text: 'Which of the following is a key principle of visual hierarchy?',
                options: ['Consistency', 'Contrast', 'Repetition', 'All of the above'],
                correctIndex: 3,
                explanation: 'Visual hierarchy relies on proper use of consistency, contrast, size, and repetition to guide the user\'s eye.'
            },
            {
                id: 'q2',
                text: 'What is the primary purpose of whitespace in design?',
                options: ['To fill empty space', 'To improve readability and focus', 'To reduce file size', 'To make the design look expensive'],
                correctIndex: 1,
                explanation: 'Whitespace (negative space) is essential for reducing clutter, improving readability, and drawing attention to key elements.'
            },
            {
                id: 'q3',
                text: 'Which color model is best for digital screens?',
                options: ['CMYK', 'RGB', 'Pantone', 'HSV'],
                correctIndex: 1,
                explanation: 'RGB (Red, Green, Blue) is the standard color model for light-emitting displays like monitors and phone screens.'
            }
        ]
    },
    'quiz-2': {
        id: 'quiz-2',
        title: 'React Fundamentals Quiz',
        passingScore: 60,
        questions: [
            {
                id: 'q1',
                text: 'What hook is used to manage state in a functional component?',
                options: ['useEffect', 'useContext', 'useState', 'useReducer'],
                correctIndex: 2,
                explanation: 'useState is the primary hook for adding state variables to functional components.'
            },
            {
                id: 'q2',
                text: 'What is the Virtual DOM?',
                options: ['A direct copy of the browser DOM', 'A lightweight JavaScript representation of the DOM', 'A browser extension', 'A specialized database'],
                correctIndex: 1,
                explanation: 'The Virtual DOM is a concept where a virtual representation of the UI is kept in memory and synced with the "real" DOM.'
            }
        ]
    }
};
