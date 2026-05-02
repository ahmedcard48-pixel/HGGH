import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ServicesPage from './pages/ServicesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import { AIToolsPage } from './pages/AIToolsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ProfilePage } from './pages/ProfilePage';
import MarketInsightsPage from './pages/MarketInsightsPage';
import CommunityPage from './pages/CommunityPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';
import LegalPage from './pages/LegalPage';
import FundingPage from './pages/FundingPage';
import EventsPage from './pages/EventsPage';
import PartnersPage from './pages/PartnersPage';
import HelpCenterPage from './pages/HelpCenterPage';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/ai-tools" element={<AIToolsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
          </Routes>
        </Router>
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </LanguageProvider>
  );
}
