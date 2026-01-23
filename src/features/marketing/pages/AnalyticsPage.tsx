import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { Button } from '../../../components/ui/Button';
import { ArrowRight } from 'lucide-react';

const AnalyticsChart = React.memo(() => (
    <div
        className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative group hover:border-novara-100 transition-colors"
        role="img"
        aria-label="Bar chart displaying user engagement over time"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-novara-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

        <div className="flex items-end gap-4 mb-8 h-64 w-full bg-slate-50/50 rounded-xl p-4 border border-slate-100 border-dashed relative">
            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-novara-500 to-novara-400 rounded-t-lg relative group/bar transition-all duration-500 ease-out origin-bottom hover:scale-x-110 hover:-translate-y-1 shadow-sm"
                    style={{
                        height: `${h}%`,
                        opacity: 0.8,
                        animation: `fade-in-up 0.8s ease-out forwards ${i * 100}ms`
                    }}
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/bar:translate-y-0 shadow-lg whitespace-nowrap z-20 pointer-events-none flex flex-col items-center">
                        <span>{h}% Engagement</span>
                        <div className="w-2 h-2 bg-slate-800 rotate-45 transform translate-y-[3px]"></div>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
            {[
                { value: "98%", label: "Engagement", delay: 0 },
                { value: "15k", label: "Active Users", delay: 100 },
                { value: "4.9", label: "Satisfaction", delay: 200 }
            ].map((stat, i) => (
                <div key={i} className="px-2 animate-fade-in-up" style={{ animationDelay: `${stat.delay + 300}ms` }}>
                    <div className="text-3xl font-bold text-slate-900 mb-1 group-hover:text-novara-600 transition-colors">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </div>
    </div>
));
AnalyticsChart.displayName = 'AnalyticsChart';

const InsightCard = ({ index, title, desc, link }: { index: number; title: string; desc: string; link?: string }) => {
    const isClickable = !!link;
    return (
        <div
            className={`
                flex gap-5 p-4 rounded-xl 
                transition-all duration-300 ease-out
                group animate-fade-in-up border border-transparent 
                ${isClickable ? 'cursor-pointer hover:bg-slate-50 hover:border-slate-100 hover:-translate-y-0.5 hover:shadow-sm' : ''}
            `}
            style={{ animationDelay: `${index * 150}ms` }}
            tabIndex={isClickable ? 0 : -1}
            role={isClickable ? "link" : "article"}
            onClick={() => isClickable && console.log(`Navigate to ${link}`)}
            onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    console.log(`Navigate to ${link}`);
                }
            }}
        >
            <div className="w-12 h-12 rounded-full bg-novara-100 flex items-center justify-center text-novara-600 font-bold text-lg shrink-0 group-hover:bg-novara-600 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-md">
                {index + 1}
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2 group-hover:text-novara-700 transition-colors">
                    {title}
                    {isClickable && <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-novara-500" />}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-600 transition-colors">{desc}</p>
            </div>
        </div>
    );
};

export const AnalyticsPage = () => (
    <PageLayout title="Data-Driven Insights" subtitle="Make informed decisions with our comprehensive analytics suite.">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            <div className="absolute -left-1/4 top-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

            <AnalyticsChart />

            <div className="space-y-4">
                {[
                    { title: "Student Performance Tracking", desc: "Identify at-risk students early with predictive modeling and real-time alerts.", link: "/analytics/performance" },
                    { title: "Course ROI Analysis", desc: "Measure the business impact of your training programs with financial drill-downs.", link: "/analytics/roi" },
                    { title: "Custom Report Builder", desc: "Drag and drop data points to create the exact reports you need for stakeholders.", link: "/analytics/reports" }
                ].map((item, i) => (
                    <InsightCard key={i} index={i} {...item} />
                ))}

                <div className="pt-6 animate-fade-in-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                    <Button variant="outline" className="group border-novara-200 text-novara-700 hover:bg-novara-50 hover:border-novara-300">
                        Explore Full Analytics
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </div>
    </PageLayout>
);
