import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { NetworkStatus } from './components/common/NetworkStatus';
import { Loading } from './components/ui/Loading';

// Context
import { AuthProvider } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import { CartProvider } from './context/CartContext';

// --- Feature: Marketing ---
import { LandingPage } from './features/marketing/pages/LandingPage';
import { FeaturesPage } from './features/marketing/pages/FeaturesPage';
import { AnalyticsPage } from './features/marketing/pages/AnalyticsPage';
import { IntegrationsPage } from './features/marketing/pages/IntegrationsPage';
import { SecurityPage } from './features/marketing/pages/SecurityPage';
import { AboutPage } from './features/marketing/pages/AboutPage';
import { CareersPage } from './features/marketing/pages/CareersPage';
import { CustomersPage } from './features/marketing/pages/CustomersPage';
import { ContactPage } from './features/marketing/pages/ContactPage';
import { BlogPage } from './features/marketing/pages/BlogPage';
import { DocumentationPage } from './features/marketing/pages/DocumentationPage';
import { HelpCenterPage } from './features/marketing/pages/HelpCenterPage';
import { TermsPage } from './features/marketing/pages/TermsPage';
import { PrivacyPage } from './features/marketing/pages/PrivacyPage';

// --- Feature: Auth ---
import { LoginPage } from './features/auth/pages/LoginPage';
import { SignupPage } from './features/auth/pages/SignupPage';
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage';

// --- Feature: Commerce (Lazy Loaded) ---
const PricingPage = React.lazy(() => import('./features/commerce/pages/PricingPage').then(module => ({ default: module.PricingPage })));
const CartPage = React.lazy(() => import('./features/commerce/pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = React.lazy(() => import('./features/commerce/pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));

// --- Feature: Dashboard (Lazy Loaded) ---
const Dashboard = React.lazy(() => import('./features/dashboard/pages/Dashboard').then(module => ({ default: module.Dashboard })));
const ProfilePage = React.lazy(() => import('./features/dashboard/pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const SettingsPage = React.lazy(() => import('./features/dashboard/pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const CalendarPage = React.lazy(() => import('./features/dashboard/pages/CalendarPage').then(module => ({ default: module.CalendarPage })));
const SupportPage = React.lazy(() => import('./features/dashboard/pages/SupportPage').then(module => ({ default: module.SupportPage })));
const NotificationsPage = React.lazy(() => import('./features/dashboard/pages/NotificationsPage').then(module => ({ default: module.NotificationsPage })));

// --- Feature: Courses (Lazy Loaded) ---
const MyCoursesPage = React.lazy(() => import('./features/courses/pages/MyCoursesPage').then(module => ({ default: module.MyCoursesPage })));
const CatalogPage = React.lazy(() => import('./features/courses/pages/CatalogPage').then(module => ({ default: module.CatalogPage })));
const CourseDetailsPage = React.lazy(() => import('./features/courses/pages/CourseDetailsPage').then(module => ({ default: module.CourseDetailsPage })));
const LessonPage = React.lazy(() => import('./features/courses/pages/LessonPage').then(module => ({ default: module.LessonPage })));
const AssignmentsPage = React.lazy(() => import('./features/courses/pages/AssignmentsPage').then(module => ({ default: module.AssignmentsPage })));
const ProgressPage = React.lazy(() => import('./features/courses/pages/ProgressPage').then(module => ({ default: module.ProgressPage })));
const CertificatesPage = React.lazy(() => import('./features/courses/pages/CertificatesPage').then(module => ({ default: module.CertificatesPage })));
const BookmarksPage = React.lazy(() => import('./features/courses/pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const StudentsPage = React.lazy(() => import('./features/courses/pages/StudentsPage').then(module => ({ default: module.StudentsPage })));

// --- Feature: Community (Lazy Loaded) ---
const CommunityPage = React.lazy(() => import('./features/community/pages/CommunityPage').then(module => ({ default: module.CommunityPage })));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <CartProvider>
          <NetworkStatus />
          <HashRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* --- Public Routes (Marketing) --- */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/integrations" element={<IntegrationsPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="/help-center" element={<HelpCenterPage />} />
                <Route path="/TermsPage" element={<TermsPage />} />
                <Route path="/PrivacyPage" element={<PrivacyPage />} />

                {/* --- Auth --- */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* --- Commerce --- */}
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* --- Protected Routes --- */}
                <Route path="dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="profile" element={<AppLayout><ProfilePage /></AppLayout>} />
                <Route path="settings" element={<AppLayout><SettingsPage /></AppLayout>} />
                <Route path="calendar" element={<AppLayout><CalendarPage /></AppLayout>} />
                <Route path="support" element={<AppLayout><SupportPage /></AppLayout>} />
                <Route path="notifications" element={<AppLayout><NotificationsPage /></AppLayout>} />

                {/* --- Courses --- */}
                <Route path="courses" element={<AppLayout><MyCoursesPage /></AppLayout>} />
                <Route path="catalog" element={<AppLayout><CatalogPage /></AppLayout>} />
                <Route path="courses/:courseId" element={<AppLayout><CourseDetailsPage /></AppLayout>} />
                <Route path="courses/:courseId/lessons/:lessonId" element={<AppLayout><LessonPage /></AppLayout>} />
                <Route path="courses/:courseId/assignments" element={<AppLayout><AssignmentsPage /></AppLayout>} />
                <Route path="progress" element={<AppLayout><ProgressPage /></AppLayout>} />
                <Route path="certificates" element={<AppLayout><CertificatesPage /></AppLayout>} />
                <Route path="bookmarks" element={<AppLayout><BookmarksPage /></AppLayout>} />
                <Route path="students" element={<AppLayout><StudentsPage /></AppLayout>} />

                {/* --- Community --- */}
                <Route path="community" element={<AppLayout><CommunityPage /></AppLayout>} />

              </Routes>
            </Suspense>
          </HashRouter>
        </CartProvider>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
