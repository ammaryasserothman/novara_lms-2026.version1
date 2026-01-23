import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
    className?: string;
    variant?: 'simple' | 'hero';
    icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    breadcrumbs,
    actions,
    className,
    variant = 'simple',
    icon
}) => {
    if (variant === 'hero') {
        return (
            <div className={cn("relative bg-[#0F2A44] text-white pt-12 pb-16 px-4 -mt-8 mx-auto -mx-4 lg:-mx-8 overflow-hidden mb-8", className)}>
                {/* Background Orbs */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-novara-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="max-w-3xl">
                        {breadcrumbs && (
                            <nav className="flex items-center gap-2 text-sm text-novara-100/60 mb-4">
                                {breadcrumbs.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        {index > 0 && <ChevronRight size={14} />}
                                        {item.path ? (
                                            <Link to={item.path} className="hover:text-white transition-colors">{item.label}</Link>
                                        ) : (
                                            <span className="text-white font-medium">{item.label}</span>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display tracking-tight">{title}</h1>
                        {description && <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">{description}</p>}
                    </div>

                    {actions && <div className="flex gap-3">{actions}</div>}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8", className)}>
            <div>
                {breadcrumbs && (
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {index > 0 && <ChevronRight size={14} />}
                                {item.path ? (
                                    <Link to={item.path} className="hover:text-novara-600 transition-colors">{item.label}</Link>
                                ) : (
                                    <span className="font-semibold text-slate-900">{item.label}</span>
                                )}
                            </div>
                        ))}
                    </nav>
                )}
                <div className="flex items-center gap-3">
                    {icon && <div className="text-novara-600">{icon}</div>}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
                </div>
                {description && <p className="text-slate-500 mt-2 text-lg">{description}</p>}
            </div>

            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
    );
};
