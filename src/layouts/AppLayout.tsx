import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useScrollTop } from '../hooks/useScrollTop';
import { useAuth } from '../context/AuthContext';

export const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrolled = useScrollTop(20);

  // Scroll Restoration Logic
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null; // Or redirect logic if not handled by routes

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar - Fixed on Desktop, Drawer on Mobile */}
      <Sidebar
        isOpen={isSidebarOpen}
        role={user.role}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <Header
          user={user}
          onMenuClick={() => setIsSidebarOpen(true)}
          scrolled={scrolled}
        />

        {/* Scrollable Content */}
        <main
          ref={mainContentRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth"
        >
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
            <React.Suspense fallback={<div className="flex h-64 items-center justify-center text-slate-500">Loading component...</div>}>
              {children}
            </React.Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};