import React from 'react';
import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

interface StatItem {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    color?: string;
}

interface StatsOverviewProps {
    stats: StatItem[];
    columns?: 2 | 3 | 4;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, columns = 4 }) => {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={cn("grid gap-6", gridCols[columns])}>
            {stats.map((stat, index) => (
                <Card key={index} className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-300 border-slate-200">
                    {stat.icon && (
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                            stat.color ? `bg-${stat.color}-50 text-${stat.color}-600` : "bg-novara-50 text-novara-600"
                        )}>
                            {stat.icon}
                        </div>
                    )}

                    <div>
                        <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            {stat.trend && (
                                <span className={cn(
                                    "text-xs font-bold px-1.5 py-0.5 rounded",
                                    stat.trendDirection === 'up' ? "bg-green-100 text-green-700" :
                                        stat.trendDirection === 'down' ? "bg-red-100 text-red-700" :
                                            "bg-slate-100 text-slate-600"
                                )}>
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
