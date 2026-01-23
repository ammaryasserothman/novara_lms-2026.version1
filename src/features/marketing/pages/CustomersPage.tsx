import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { Button } from '../../../components/ui/Button';
import { Award, ArrowRight } from 'lucide-react';

const CustomerLogo = React.memo(({ name, index }: { name: string; index: number }) => (
    <div
        className="flex items-center justify-center font-bold text-2xl text-slate-300 border border-slate-100 bg-white rounded-2xl h-32 hover:border-novara-200 hover:text-novara-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default animate-fade-in-up select-none"
        style={{ animationDelay: `${index * 50}ms` }}
        role="img"
        aria-label={`${name} logo`}
    >
        {name}
    </div>
));
CustomerLogo.displayName = 'CustomerLogo';

interface StoryProps {
    company: string;
    result: string;
}

const CustomerStoryCard = React.memo(({ story, index }: { story: StoryProps; index: number }) => (
    <div
        className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-novara-100 hover:shadow-md transition-all duration-300 animate-fade-in-up group cursor-pointer"
        style={{ animationDelay: `${index * 150}ms` }}
        tabIndex={0}
    >
        <div className="font-bold text-slate-900 mb-2 text-lg group-hover:text-novara-700 transition-colors">{story.company}</div>
        <div className="text-sm text-novara-600 font-bold bg-novara-50 inline-block px-3 py-1 rounded-full group-hover:bg-novara-100 transition-colors">{story.result}</div>
    </div>
));
CustomerStoryCard.displayName = 'CustomerStoryCard';

export const CustomersPage = () => {
    const customers = ['Acme Corp', 'Global Dynamics', 'Interstellar', 'Nebula Inc', 'Cyberdyne', 'Massive Dynamic', 'Initech', 'Umbrella Corp'];

    const stories: StoryProps[] = [
        { company: "Initech", result: "Saved $2.5M in variable costs" },
        { company: "Massive Dynamic", result: "Increased retention by 40%" },
        { company: "Acme Corp", result: "Reduced ramp time by 65%" }
    ];

    return (
        <PageLayout title="Trusted by Industry Leaders" subtitle="From startups to Fortune 500s, organizations rely on Novara to train their workforce.">
            {/* Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                {customers.map((logo, i) => (
                    <CustomerLogo key={i} name={logo} index={i} />
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-20">
                {/* Testimonial Feature */}
                <div className="bg-novara-900 rounded-3xl p-10 text-white relative overflow-hidden flex flex-col justify-center min-h-[450px] animate-fade-in-up shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-novara-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="text-8xl text-novara-500 mb-4 font-serif opacity-30 leading-none select-none">"</div>
                        <p className="text-2xl md:text-3xl font-light leading-relaxed mb-10 italic">
                            Novara transformed our onboarding process. What used to take <span className="text-novara-200 font-medium">3 weeks</span> now takes <span className="text-novara-200 font-medium">3 days</span>. The ROI was immediate.
                        </p>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-full border border-white/10 shadow-inner"></div>
                            <div>
                                <div className="font-bold text-lg">Sarah Connor</div>
                                <div className="text-sm font-bold text-novara-300 uppercase tracking-wider">CTO, Cyberdyne</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Stories List */}
                <div className="bg-slate-50/50 rounded-3xl p-10 border border-slate-200/50 flex flex-col justify-center min-h-[450px] relative backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Award className="text-novara-500" />
                        Success Stories
                    </h3>
                    <div className="space-y-4">
                        {stories.map((story, i) => (
                            <CustomerStoryCard key={i} story={story} index={i} />
                        ))}
                    </div>
                    <Button variant="outline" className="mt-10 self-start group bg-white hover:border-novara-300">
                        Read All Case Studies
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </PageLayout>
    );
};
