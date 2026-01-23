import React from 'react';
import { Button } from '../ui/Button';
import { Calendar, BookOpen } from 'lucide-react';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';

interface WelcomeBannerProps {
    user: User;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ user }) => {
    const navigate = useNavigate();
    const firstName = user.name.split(' ')[0];

    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Good morning, {firstName}! ☀️
                </h1>
                <p className="text-slate-500 mt-2 text-lg">
                    You're on a <span className="font-bold text-novara-600">12-day streak</span>. Keep the momentum going!
                </p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" icon={<Calendar size={18} />} onClick={() => navigate('/calendar')}>
                    Calendar
                </Button>
                <Button variant="primary" icon={<BookOpen size={18} />} onClick={() => navigate('/catalog')}>
                    Browse Courses
                </Button>
            </div>
        </div>
    );
};
