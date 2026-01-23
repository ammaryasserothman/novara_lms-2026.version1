import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { Zap, Users, BarChart, Globe, Shield, CheckCircle, ArrowRight } from 'lucide-react';

interface Feature {
    id: string;
    icon: React.ReactElement;
    title: string;
    desc: string;
    link?: string;
}

const features: Feature[] = [
    { id: 'creation', icon: <Zap className="text-amber-500" />, title: "Instant Course Creation", desc: "Drag-and-drop builder to launch courses in minutes, not months.", link: "/features/creation" },
    { id: 'collab', icon: <Users className="text-blue-500" />, title: "Collaborative Learning", desc: "Built-in discussion forums, group projects, and peer reviews." },
    { id: 'analytics', icon: <BarChart className="text-green-500" />, title: "Advanced Analytics", desc: "Track every click, quiz score, and engagement metric in real-time.", link: "/features/analytics" },
    { id: 'globe', icon: <Globe className="text-purple-500" />, title: "Multi-Language Support", desc: "Localize your content automatically for a global audience." },
    { id: 'security', icon: <Shield className="text-red-500" />, title: "Enterprise Security", desc: "Role-based access control and SSO integration out of the box." },
    { id: 'assessments', icon: <CheckCircle className="text-teal-500" />, title: "Certified Assessments", desc: "Robust testing engine with automated proctoring options.", link: "/features/assessments" }
];

const FeatureCard = React.memo(({ feature, index }: { feature: Feature; index: number }) => {
    const isClickable = !!feature.link;

    return (
        <div
            className={`
                relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 
                flex flex-col items-start h-full 
                transition-all duration-300 ease-out
                group animate-fade-in-up overflow-hidden
                ${isClickable ? 'cursor-pointer hover:shadow-xl hover:border-novara-200 hover:-translate-y-1 hover:rotate-[0.5deg]' : 'hover:shadow-md'}
                focus-within:ring-2 focus-within:ring-novara-500 focus-within:ring-offset-2
            `}
            style={{ animationDelay: `${index * 100}ms` }}
            role={isClickable ? 'link' : 'article'}
            tabIndex={isClickable ? 0 : -1}
            onClick={() => isClickable && console.log(`Navigating to ${feature.link}`)}
            onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    console.log(`Navigating to ${feature.link}`);
                }
            }}
        >
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-novara-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

            <div className="relative z-10 w-full flex-grow">
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-novara-50 transition-all duration-300 shrink-0 origin-left">
                    {React.cloneElement(feature.icon as React.ReactElement<{ size: number }>, { size: 28 })}
                </div>
                <h3 id={`feature-title-${feature.id}`} className="text-xl font-bold text-slate-900 mb-3 group-hover:text-novara-700 transition-colors">
                    {feature.title}
                </h3>
                <p id={`feature-desc-${feature.id}`} className="text-slate-500 leading-relaxed">
                    {feature.desc}
                </p>
            </div>

            {isClickable && (
                <div className="relative z-10 mt-6 flex items-center text-novara-600 font-bold text-sm group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
            )}
        </div>
    );
});

FeatureCard.displayName = 'FeatureCard';

export const FeaturesPage = () => (
    <PageLayout title="Powerful Features for Modern Learning" subtitle="Everything you need to create, manage, and scale your educational programs.">
        <div className="relative">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-novara-500/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -z-10 animate-pulse-slow delay-1000"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={feature.id} feature={feature} index={index} />
                ))}
            </div>
        </div>
    </PageLayout>
);
