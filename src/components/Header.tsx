import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { settings, updateSettings } = useTheme();
  const t = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryColorHex = settings.primaryColor === 'blue' ? '#2563eb' : 
                         settings.primaryColor === 'emerald' ? '#10b981' : 
                         settings.primaryColor === 'violet' ? '#8b5cf6' : 
                         settings.primaryColor === 'amber' ? '#f59e0b' : '#2563eb';

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700/50">
      <div className="container mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div 
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white"
            style={{ backgroundColor: primaryColorHex }}
          >
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">ECONOMINE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center space-x-6 ${isRTL ? 'rtl:space-x-reverse' : ''}`}>
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-4 mr-2">
            <Button variant="ghost" size="sm" onClick={() => setLanguage('ar')} className={`px-2 h-8 ${language === 'ar' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'}`} style={{ color: language === 'ar' ? primaryColorHex : undefined }}>AR</Button>
            <Button variant="ghost" size="sm" onClick={() => setLanguage('en')} className={`px-2 h-8 ${language === 'en' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'}`} style={{ color: language === 'en' ? primaryColorHex : undefined }}>EN</Button>
            <Button variant="ghost" size="sm" onClick={() => setLanguage('fr')} className={`px-2 h-8 ${language === 'fr' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'}`} style={{ color: language === 'fr' ? primaryColorHex : undefined }}>FR</Button>
          </div>
          <Link to="/pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">{t.pricing}</Link>
          <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">{t.login}</Link>
          <Button asChild className="rounded-full px-6 bg-slate-900 hover:bg-slate-800 text-white shadow-md">
            <Link to="/register">{t.startNow}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50 overflow-y-auto max-h-[calc(100vh-4rem)]"
          >
            <div className="px-4 py-6 space-y-6">
              <div className="flex justify-center gap-4 pb-4 border-b border-slate-50 dark:border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setLanguage('ar')} className={`px-4 h-10 ${language === 'ar' ? 'font-bold bg-slate-50 dark:bg-slate-800/50' : 'text-slate-500 dark:text-slate-400'}`} style={{ color: language === 'ar' ? primaryColorHex : undefined }}>AR</Button>
                <Button variant="ghost" size="sm" onClick={() => setLanguage('en')} className={`px-4 h-10 ${language === 'en' ? 'font-bold bg-slate-50 dark:bg-slate-800/50' : 'text-slate-500 dark:text-slate-400'}`} style={{ color: language === 'en' ? primaryColorHex : undefined }}>EN</Button>
                <Button variant="ghost" size="sm" onClick={() => setLanguage('fr')} className={`px-4 h-10 ${language === 'fr' ? 'font-bold bg-slate-50 dark:bg-slate-800/50' : 'text-slate-500 dark:text-slate-400'}`} style={{ color: language === 'fr' ? primaryColorHex : undefined }}>FR</Button>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                  className="h-10 w-10 text-slate-500 dark:text-slate-400"
                >
                  {settings.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{(t as any).platform || 'Platform'}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/about" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).aboutUsPage}</Link>
                    <Link to="/services" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).servicesPage}</Link>
                    <Link to="/pricing" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).pricing}</Link>
                    <Link to="/contact" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).contactUsPage}</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{(t as any).resources || 'Resources'}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/ai-tools" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).aiTools}</Link>
                    <Link to="/market-insights" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).marketInsights}</Link>
                    <Link to="/funding" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).fundingGrants}</Link>
                    <Link to="/legal" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).legalCompliance}</Link>
                    <Link to="/legal-templates" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).legalTemplates || 'Legal Templates'}</Link>
                    <Link to="/resources" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).resources}</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{(t as any).community || 'Community'}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/community" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).community}</Link>
                    <Link to="/success-stories" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).successStoriesPage}</Link>
                    <Link to="/events" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).eventsWebinars}</Link>
                    <Link to="/partners" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).partnerDirectory}</Link>
                    <Link to="/mentorship" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).mentorship || 'Mentorship'}</Link>
                    <Link to="/blog" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).blog}</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{(t as any).user || 'User'}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/portfolio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).myPortfolio}</Link>
                    <Link to="/profile" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).profile}</Link>
                    <Link to="/settings" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).settings}</Link>
                    <Link to="/help" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).helpCenter}</Link>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button asChild className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md font-bold">
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>{t.startNow}</Link>
                </Button>
                <div className="mt-4 text-center">
                  <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.login}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
