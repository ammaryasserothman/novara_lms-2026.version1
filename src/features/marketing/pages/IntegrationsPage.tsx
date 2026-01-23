import React from 'react';
import { PageLayout } from '../../../components/PageLayout';
import { ArrowRight } from 'lucide-react';
import SlackIcon from '../../../assets/icons/slack.png';
import ZoomIcon from '../../../assets/icons/zoom.png';
import SalesforceIcon from '../../../assets/icons/salesforce.png';
import HubSpotIcon from '../../../assets/icons/hubspot.png';
import GoogleDriveIcon from '../../../assets/icons/google-drive.webp';
import TeamsIcon from '../../../assets/icons/microsoft-teams.png';
import ZapierIcon from '../../../assets/icons/zapier.png';
import NotionIcon from '../../../assets/icons/notion.png';

interface Integration {
    id: string;
    name: string;
    icon: string | null;
    url?: string;
}

const integrations: Integration[] = [
    { id: 'slack', name: 'Slack', icon: SlackIcon, url: '/integrations/slack' },
    { id: 'zoom', name: 'Zoom', icon: ZoomIcon, url: '/integrations/zoom' },
    { id: 'salesforce', name: 'Salesforce', icon: SalesforceIcon },
    { id: 'hubspot', name: 'HubSpot', icon: HubSpotIcon },
    { id: 'google-drive', name: 'Google Drive', icon: GoogleDriveIcon },
    { id: 'microsoft-teams', name: 'Microsoft Teams', icon: TeamsIcon },
    { id: 'zapier', name: 'Zapier', icon: ZapierIcon },
    { id: 'notion', name: 'Notion', icon: NotionIcon },
];

const IntegrationCard = ({ tool, index }: { tool: Integration; index: number }) => {
    const isClickable = !!tool.url;

    return (
        <div
            className={`
                relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 
                flex flex-col items-center justify-center gap-4 
                hover:border-novara-200 hover:shadow-lg transition-all duration-300 ease-out group 
                ${isClickable ? 'cursor-pointer hover:-translate-y-1 hover:rotate-[0.5deg]' : ''}
                animate-fade-in-up overflow-hidden
            `}
            style={{ animationDelay: `${index * 100}ms` }}
            role="button"
            tabIndex={0}
            aria-label={`Connect with ${tool.name}`}
            onClick={() => isClickable && console.log(`Navigating to ${tool.url}`)}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && isClickable) {
                    e.preventDefault();
                    console.log(`Navigating to ${tool.url}`);
                }
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-novara-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-novara-50 transition-all overflow-hidden relative shrink-0 z-10 group-hover:scale-110 duration-300">
                {tool.icon ? (
                    <img
                        src={tool.icon}
                        alt=""
                        loading="lazy"
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <span className="text-xl font-bold text-slate-400 group-hover:text-novara-600 transition-colors select-none">
                        {tool.name[0]}
                    </span>
                )}
            </div>
            <span className="font-bold text-slate-700 group-hover:text-novara-700 transition-colors z-10">
                {tool.name}
            </span>
            {isClickable && (
                <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-novara-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            )}
        </div>
    );
};

export const IntegrationsPage = () => (
    <PageLayout title="Connect with Your Favorite Tools" subtitle="Seamlessly integrate with the software your team already uses.">
        <div className="relative">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-novara-500/5 rounded-full blur-[90px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -z-10 animate-pulse-slow delay-700"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {integrations.map((tool, index) => (
                    <IntegrationCard key={tool.id} tool={tool} index={index} />
                ))}
            </div>

            <div className="mt-16 bg-novara-900 rounded-3xl p-12 text-center text-white relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Don't see what you need?</h3>
                    <p className="mb-8 text-novara-100">Our robust API allows you to build custom integrations in minutes.</p>
                    <button className="group bg-white text-novara-900 px-8 py-3 rounded-xl font-bold hover:bg-novara-50 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-novara-900 active:bg-novara-100 hover:shadow-lg hover:-translate-y-0.5">
                        View API Docs
                        <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
            </div>
        </div>
    </PageLayout>
);
