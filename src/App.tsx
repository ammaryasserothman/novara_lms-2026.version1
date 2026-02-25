import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { NetworkStatus } from './components/common/NetworkStatus';
import { Loading } from './components/ui/Loading';

// Context
import { AuthProvider } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import { CartProvider } from './context/CartContext';

// --- Feature: Marketing ---
const LandingPage = lazy(() => import('./features/marketing/pages/LandingPage').then(module => ({ default: module.LandingPage })));
const FeaturesPage = lazy(() => import('./features/marketing/pages/FeaturesPage').then(module => ({ default: module.FeaturesPage })));
const AnalyticsPage = lazy(() => import('./features/marketing/pages/AnalyticsPage').then(module => ({ default: module.AnalyticsPage })));
const IntegrationsPage = lazy(() => import('./features/marketing/pages/IntegrationsPage').then(module => ({ default: module.IntegrationsPage })));
const SecurityPage = lazy(() => import('./features/marketing/pages/SecurityPage').then(module => ({ default: module.SecurityPage })));
const AboutPage = lazy(() => import('./features/marketing/pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CareersPage = lazy(() => import('./features/marketing/pages/CareersPage').then(module => ({ default: module.CareersPage })));
const CustomersPage = lazy(() => import('./features/marketing/pages/CustomersPage').then(module => ({ default: module.CustomersPage })));
const ContactPage = lazy(() => import('./features/marketing/pages/ContactPage').then(module => ({ default: module.ContactPage })));
const BlogPage = lazy(() => import('./features/marketing/pages/BlogPage').then(module => ({ default: module.BlogPage })));
const DocumentationPage = lazy(() => import('./features/marketing/pages/DocumentationPage').then(module => ({ default: module.DocumentationPage })));
const HelpCenterPage = lazy(() => import('./features/marketing/pages/HelpCenterPage').then(module => ({ default: module.HelpCenterPage })));
const TermsPage = lazy(() => import('./features/marketing/pages/TermsPage').then(module => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() => import('./features/marketing/pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));

// --- Feature: Auth ---
const LoginPage = lazy(() => import('./features/auth/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./features/auth/pages/SignupPage').then(module => ({ default: module.SignupPage })));
const ForgotPasswordPage = lazy(() => import('./features/auth/pages/ForgotPasswordPage').then(module => ({ default: module.ForgotPasswordPage })));

// --- Feature: Commerce ---
const PricingPage = lazy(() => import('./features/commerce/pages/PricingPage').then(module => ({ default: module.PricingPage })));
const CartPage = lazy(() => import('./features/commerce/pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('./features/commerce/pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));

// --- Feature: Dashboard ---
const Dashboard = lazy(() => import('./features/dashboard/pages/Dashboard').then(module => ({ default: module.Dashboard })));
const ProfilePage = lazy(() => import('./features/dashboard/pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const SettingsPage = lazy(() => import('./features/dashboard/pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const CalendarPage = lazy(() => import('./features/dashboard/pages/CalendarPage').then(module => ({ default: module.CalendarPage })));
const SupportPage = lazy(() => import('./features/dashboard/pages/SupportPage').then(module => ({ default: module.SupportPage })));
const NotificationsPage = lazy(() => import('./features/dashboard/pages/NotificationsPage').then(module => ({ default: module.NotificationsPage })));

// --- Feature: Courses ---
const MyCoursesPage = lazy(() => import('./features/courses/pages/MyCoursesPage').then(module => ({ default: module.MyCoursesPage })));
const CatalogPage = lazy(() => import('./features/courses/pages/CatalogPage').then(module => ({ default: module.CatalogPage })));
const CourseDetailsPage = lazy(() => import('./features/courses/pages/CourseDetailsPage').then(module => ({ default: module.CourseDetailsPage })));
const LessonPage = lazy(() => import('./features/courses/pages/LessonPage').then(module => ({ default: module.LessonPage })));
const AssignmentsPage = lazy(() => import('./features/courses/pages/AssignmentsPage').then(module => ({ default: module.AssignmentsPage })));
const ProgressPage = lazy(() => import('./features/courses/pages/ProgressPage').then(module => ({ default: module.ProgressPage })));
const CertificatesPage = lazy(() => import('./features/courses/pages/CertificatesPage').then(module => ({ default: module.CertificatesPage })));
const BookmarksPage = lazy(() => import('./features/courses/pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const StudentsPage = lazy(() => import('./features/courses/pages/StudentsPage').then(module => ({ default: module.StudentsPage })));

// --- Feature: Community ---
const CommunityPage = lazy(() => import('./features/community/pages/CommunityPage').then(module => ({ default: module.CommunityPage })));

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
