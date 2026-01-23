import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { NetworkStatus } from './components/common/NetworkStatus';

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

// --- Feature: Commerce ---
import { PricingPage } from './features/commerce/pages/PricingPage';
import { CartPage } from './features/commerce/pages/CartPage';
import { CheckoutPage } from './features/commerce/pages/CheckoutPage';

// --- Feature: Dashboard ---
// --- Feature: Dashboard ---
import { Dashboard } from './features/dashboard/pages/Dashboard';
import { ProfilePage } from './features/dashboard/pages/ProfilePage';
import { SettingsPage } from './features/dashboard/pages/SettingsPage';
import { CalendarPage } from './features/dashboard/pages/CalendarPage';
import { SupportPage } from './features/dashboard/pages/SupportPage';
import { NotificationsPage } from './features/dashboard/pages/NotificationsPage';

// --- Feature: Courses ---
import { MyCoursesPage } from './features/courses/pages/MyCoursesPage';
import { CatalogPage } from './features/courses/pages/CatalogPage';
import { CourseDetailsPage } from './features/courses/pages/CourseDetailsPage';
import { LessonPage } from './features/courses/pages/LessonPage';
import { AssignmentsPage } from './features/courses/pages/AssignmentsPage';
import { ProgressPage } from './features/courses/pages/ProgressPage';
import { CertificatesPage } from './features/courses/pages/CertificatesPage';
import { BookmarksPage } from './features/courses/pages/BookmarksPage';
import { StudentsPage } from './features/courses/pages/StudentsPage';

// --- Feature: Community ---
import { CommunityPage } from './features/community/pages/CommunityPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <CartProvider>
          <NetworkStatus />
          <HashRouter>
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
          </HashRouter>
        </CartProvider>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
