import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Bell, Search, Menu, ChevronRight, X } from 'lucide-react';
import { User } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { useGlobal } from '../context/GlobalContext';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  scrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuClick, scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courses } = useGlobal();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smart Breadcrumbs Generator
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbLabel = (segment: string) => {
    if ((segment.startsWith('c') && !isNaN(Number(segment.substring(1)))) || segment.length > 15) {
      return "Details";
    }
    return segment.replace('-', ' ');
  };

  // Filter courses based on search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to top 5 results
  }, [searchQuery, courses]);

  // Keyboard shortcut: Cmd+K or Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchOpen(true);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        inputRef.current?.blur();
      }

      // Arrow navigation
      if (isSearchOpen && filteredCourses.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCourses.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? filteredCourses.length - 1 : prev - 1);
        } else if (e.key === 'Enter' && filteredCourses[selectedIndex]) {
          e.preventDefault();
          navigate(`/courses/${filteredCourses[selectedIndex].id}`);
          setIsSearchOpen(false);
          setSearchQuery('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, filteredCourses, selectedIndex, navigate]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(0);
    setIsSearchOpen(true);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
    inputRef.current?.focus();
  };

  return (
    <header className={cn(
      "h-20 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200" : "bg-transparent"
    )}>
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-novara-500"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Breadcrumbs (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
          <span className="hover:text-novara-600 cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>Novara</span>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={index}>
                <ChevronRight size={14} className="text-slate-400" />
                <span
                  onClick={() => !isLast && navigate(path)}
                  className={cn(
                    "capitalize",
                    isLast ? "font-semibold text-slate-800 cursor-default" : "hover:text-novara-600 cursor-pointer transition-colors"
                  )}
                >
                  {getBreadcrumbLabel(segment)}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Enterprise Search Bar with Dropdown */}
        <div ref={searchRef} className="flex-1 max-w-md ml-4 lg:ml-8 relative group">
          <Search
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
              isSearchOpen && searchQuery ? "text-novara-600" : "text-slate-400 group-focus-within:text-novara-500"
            )}
            size={18}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-10 pr-20 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-novara-100 focus:border-novara-400 transition-all shadow-sm group-hover:border-slate-300"
            aria-label="Search courses"
            aria-expanded={isSearchOpen && filteredCourses.length > 0}
            aria-controls="search-results"
          />

          {/* Clear button */}
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          {/* Keyboard shortcut hint */}
          <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">⌘K</kbd>
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery && (
            <div
              id="search-results"
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50 animate-scale-up"
              role="listbox"
            >
              {filteredCourses.length > 0 ? (
                <>
                  <div className="px-4 py-2 border-b border-slate-100 text-xs text-slate-500 font-semibold uppercase tracking-wide">
                    Courses ({filteredCourses.length})
                  </div>
                  {filteredCourses.map((course, index) => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseClick(course.id)}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex items-start gap-3 group",
                        selectedIndex === index && "bg-novara-50"
                      )}
                      role="option"
                      aria-selected={selectedIndex === index}
                    >
                      <img
                        src={course.thumbnail}
                        alt=""
                        className="w-16 h-12 object-cover rounded-lg border border-slate-200 group-hover:border-novara-300 transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-900 group-hover:text-novara-600 transition-colors line-clamp-1">
                          {course.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {course.instructor} • {course.category}
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 shrink-0">
                        ↵
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-4 py-8 text-center text-slate-500">
                  <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium">No courses found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2.5 text-slate-500 hover:text-novara-600 hover:bg-novara-50 rounded-full transition-all duration-200"
          aria-label="View notifications"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        <button onClick={() => navigate('/profile')} className="flex items-center gap-3 group focus:outline-none">
          <div className="hidden md:block text-right">
            <div className="text-sm font-semibold text-slate-800 group-hover:text-novara-600 transition-colors">{user.name}</div>
            <div className="text-xs text-slate-500 capitalize">{user.role}</div>
          </div>
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover group-hover:ring-2 group-hover:ring-novara-400 transition-all"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </button>
      </div>
    </header>
  );
};