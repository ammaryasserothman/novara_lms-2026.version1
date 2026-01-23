import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  FileText,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { Role } from '../types';
import { cn } from '../utils/cn';
import { Logo } from '../components/ui/Logo';

interface SidebarProps {
  isOpen: boolean;
  role: Role;
  onCloseMobile: () => void;
  onLogout: () => void;
}

interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: Role[];
}

interface NavGroup {
  title?: string;
  items: NavItemConfig[];
}

import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

// ... (existing imports, keep them if possible, but for this specific tool I need to match everything or be careful)

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, role, onCloseMobile, onLogout }) => {
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const NAV_CONFIG: NavGroup[] = useMemo(() => [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['student', 'instructor', 'admin'] },
      ]
    },
    {
      title: 'Learning',
      items: [
        { label: 'My Courses', path: '/courses', icon: <BookOpen size={20} />, roles: ['student'] },
        { label: 'Browse Catalog', path: '/catalog', icon: <Users size={20} />, roles: ['student', 'guest'] },
        { label: 'Assignments', path: '/courses/c1/assignments', icon: <FileText size={20} />, roles: ['student', 'instructor'] },
        { label: 'Progress', path: '/progress', icon: <TrendingUp size={20} />, roles: ['student'] },
        { label: 'Bookmarks', path: '/bookmarks', icon: <Bookmark size={20} />, roles: ['student', 'instructor'] },
        { label: 'Calendar', path: '/calendar', icon: <Calendar size={20} />, roles: ['student', 'instructor'] },
        { label: 'Certificates', path: '/certificates', icon: <Award size={20} />, roles: ['student'] },
      ]
    },
    {
      title: 'Community',
      items: [
        { label: 'Discussions', path: '/community', icon: <MessageSquare size={20} />, roles: ['student', 'instructor'] },
        { label: 'Students', path: '/students', icon: <Users size={20} />, roles: ['instructor', 'admin'] },
      ]
    },
    {
      title: 'System',
      items: [
        { label: 'Settings', path: '/settings', icon: <Settings size={20} />, roles: ['student', 'instructor', 'admin'] },
        { label: 'Support', path: '/support', icon: <HelpCircle size={20} />, roles: ['student', 'instructor', 'admin'] },
      ]
    }
  ], []);

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col",
    isOpen ? "translate-x-0" : "-translate-x-full",
    "lg:translate-x-0 lg:static lg:h-screen"
  );

  return (
    <>
      <aside className={sidebarClasses}>
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Logo className="w-full h-full" />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight font-sans">NOVARA</span>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
          {NAV_CONFIG.map((group, groupIdx) => {
            const filteredItems = group.items.filter(item => item.roles.includes(role));
            if (filteredItems.length === 0) return null;

            return (
              <div key={groupIdx}>
                {group.title && (
                  <h3 className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {group.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {filteredItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={onCloseMobile}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                          isActive
                            ? "bg-novara-50 text-novara-700 font-semibold shadow-sm"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-novara-500 rounded-r-full" />
                        )}
                        <span className={cn(
                          "transition-colors",
                          isActive ? "text-novara-600" : "text-slate-400 group-hover:text-slate-600"
                        )}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Sign Out"
      >
        <div className="space-y-4">
          <p className="text-slate-600">Are you sure you want to sign out? You will be redirected to the login page.</p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowLogoutConfirm(false);
                onLogout();
              }}
              className="bg-red-600 hover:bg-red-700 text-white border-transparent"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};