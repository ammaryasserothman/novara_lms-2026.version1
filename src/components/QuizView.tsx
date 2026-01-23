import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Quiz } from '../types';
import { cn } from '../utils/cn';

interface QuizViewProps {
    quiz: Quiz;
    onComplete: (score: number, passed: boolean) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answers, setAnswers] = useState<number[]>([]); // Store all answers
    const [score, setScore] = useState<number | null>(null);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    const handleOptionSelect = (index: number) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedOption === null) return;

        setIsSubmitted(true);

        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(newAnswers);

        // Auto-advance if correct? Or wait for user?
        // Let's show feedback then wait for 'Next'
    };

    const handleNext = () => {
        if (isLastQuestion) {
            calculateScore();
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        }
    };

    const calculateScore = () => {
        // Calculate final score
        let correctCount = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctIndex) correctCount++;
        });

        const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
        setScore(finalScore);
        onComplete(finalScore, finalScore >= quiz.passingScore);
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setAnswers([]);
        setScore(null);
    };

    // RESULTS VIEW
    if (score !== null) {
        const passed = score >= quiz.passingScore;
        return (
            <Card className="text-center py-12">
                <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                    passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                )}>
                    {passed ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {passed ? 'Quiz Passed!' : 'Quiz Failed'}
                </h2>
                <p className="text-slate-500 mb-6">
                    You scored <span className="font-bold text-slate-900">{score}%</span>.
                    {passed ? ' Great job!' : ` You need ${quiz.passingScore}% to pass.`}
                </p>

                <div className="flex justify-center gap-4">
                    {!passed && (
                        <Button variant="outline" onClick={handleRetry}>
                            <RotateCcw size={16} className="mr-2" /> Retry Quiz
                        </Button>
                    )}
                    {/* If passed, parent component handles navigation */}
                </div>
            </Card>
        );
    }

    // QUESTION VIEW
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex justify-between items-center text-sm text-slate-500 font-medium">
                <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span>Min. Score: {quiz.passingScore}%</span>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                    {currentQuestion.text}
                </h3>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === currentQuestion.correctIndex;
                        const showResult = isSubmitted;

                        let optionStyle = "border-slate-200 hover:border-novara-300 hover:bg-slate-50";
                        let icon = null;

                        if (showResult) {
                            if (isCorrect) {
                                optionStyle = "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500";
                                icon = <CheckCircle2 size={18} className="text-green-600" />;
                            } else if (isSelected && !isCorrect) {
                                optionStyle = "border-red-300 bg-red-50 text-red-700";
                                icon = <XCircle size={18} className="text-red-500" />;
                            } else {
                                optionStyle = "border-slate-100 opacity-50";
                            }
                        } else if (isSelected) {
                            optionStyle = "border-novara-500 bg-novara-50 text-novara-900 ring-1 ring-novara-500";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={isSubmitted}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center",
                                    optionStyle
                                )}
                            >
                                <span className="font-medium">{option}</span>
                                {icon}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Feedback Area */}
            {isSubmitted && (
                <div className={cn(
                    "mb-8 p-4 rounded-xl border",
                    selectedOption === currentQuestion.correctIndex
                        ? "bg-green-50 border-green-100 text-green-800"
                        : "bg-red-50 border-red-100 text-red-800"
                )}>
                    <p className="font-bold mb-1">
                        {selectedOption === currentQuestion.correctIndex ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm opacity-90">{currentQuestion.explanation}</p>
                </div>
            )}

            <div className="flex justify-end">
                {!isSubmitted ? (
                    <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        size="lg"
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button onClick={handleNext} size="lg">
                        {isLastQuestion ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} className="ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
};
