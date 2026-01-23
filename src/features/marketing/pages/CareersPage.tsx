import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { Button } from '../../../components/ui/Button';
import { Globe, Briefcase, Award, MapPin } from 'lucide-react';

interface StatProps {
    value: number;
    suffix?: string;
    label: string;
    prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: { end: number, duration?: number, suffix?: string, prefix?: string }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{prefix}{count}{suffix}</span>;
}

const StatCard = React.memo(({ stat, index }: { stat: StatProps; index: number }) => (
    <div
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg hover:border-novara-100 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up group"
        style={{ animationDelay: `${index * 150}ms` }}
        tabIndex={0}
        role="article"
    >
        <div className="text-4xl font-bold text-novara-600 mb-1 font-mono group-hover:scale-110 transition-transform duration-300 inline-block">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
        </div>
        <div className="text-slate-500 font-medium">{stat.label}</div>
    </div>
));
StatCard.displayName = 'StatCard';

interface BenefitProps {
    icon: React.ReactElement;
    title: string;
    desc: string;
}

const LifeAtNovaraCard = React.memo(({ benefit, index }: { benefit: BenefitProps; index: number }) => (
    <div
        className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center gap-3 hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
        style={{ animationDelay: `${index * 150}ms` }}
        tabIndex={0}
        role="group"
    >
        <div className="w-12 h-12 rounded-full bg-novara-50 text-novara-600 flex items-center justify-center mb-1 group-hover:bg-novara-100 transition-colors">
            {React.cloneElement(benefit.icon as React.ReactElement<{ size: number }>, { size: 24 })}
        </div>
        <div className="text-center">
            <div className="font-bold text-slate-900 mb-1">{benefit.title}</div>
            <div className="text-xs text-slate-500">{benefit.desc}</div>
        </div>
    </div>
));
LifeAtNovaraCard.displayName = 'LifeAtNovaraCard';

interface JobProps {
    role: string;
    dept: string;
    loc: string;
}

const JobCard = React.memo(({ job, index }: { job: JobProps; index: number }) => (
    <div
        className="bg-white p-6 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-novara-300 hover:shadow-md transition-all cursor-pointer group gap-4 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
        role="link"
        tabIndex={0}
    >
        <div>
            <h4 className="font-bold text-slate-900 text-lg group-hover:text-novara-600 transition-colors">{job.role}</h4>
            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600 group-hover:bg-novara-50 group-hover:text-novara-700 transition-colors">{job.dept}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {job.loc}</span>
            </div>
        </div>
        <button className="text-novara-600 font-bold text-sm px-6 py-2.5 bg-novara-50 rounded-lg group-hover:bg-novara-600 group-hover:text-white transition-all whitespace-nowrap focus:ring-2 focus:ring-novara-500 focus:outline-none">
            View Role
        </button>
    </div>
));
JobCard.displayName = 'JobCard';

export const CareersPage = () => {
    const stats: StatProps[] = [
        { value: 50, suffix: '+', label: "Employees" },
        { value: 12, label: "Countries" },
        { value: 20, prefix: '$', suffix: 'M', label: "In Funding" }
    ];

    const benefits: BenefitProps[] = [
        { icon: <Globe />, title: "Remote-First", desc: "Work from anywhere in the world." },
        { icon: <Briefcase />, title: "Competitive Pay", desc: "Top-tier salary & equity packages." },
        { icon: <Award />, title: "Growth Budget", desc: "$2,000/yr for your learning." },
    ];

    const jobs: JobProps[] = [
        { role: 'Senior React Engineer', dept: 'Engineering', loc: 'Remote (US/EU)' },
        { role: 'Product Designer', dept: 'Design', loc: 'Remote (Global)' },
        { role: 'Customer Success Manager', dept: 'Sales', loc: 'London, UK' },
        { role: 'DevOps Specialist', dept: 'Engineering', loc: 'Remote (US)' }
    ];

    return (
        <PageLayout title="Join Our World-Class Team" subtitle="Build the future of learning with us. We're hiring across all roles.">
            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {stats.map((stat, i) => (
                    <StatCard key={i} stat={stat} index={i} />
                ))}
            </div>

            {/* Life at Novara */}
            <div className="mb-16">
                <div className="bg-novara-50 rounded-3xl p-8 md:p-12 text-center border border-novara-100/50 relative overflow-hidden">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-novara-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-8 relative z-10">Life at Novara</h2>
                    <div className="grid md:grid-cols-3 gap-6 relative z-10">
                        {benefits.map((b, i) => (
                            <LifeAtNovaraCard key={i} benefit={b} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Open Positions */}
            <h3 className="text-2xl font-bold text-slate-900 mb-8 pl-4 border-l-4 border-novara-500 animate-fade-in-up">Open Positions</h3>
            <div className="space-y-4">
                {jobs.map((job, i) => (
                    <JobCard key={i} job={job} index={i} />
                ))}
            </div>

            <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <p className="text-slate-500 mb-4">Don't see your role?</p>
                <Button variant="outline" className="border-slate-200 hover:border-novara-300 text-slate-600 hover:text-novara-700">
                    Email us at careers@novara.com
                </Button>
            </div>
        </PageLayout>
    );
};
