import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Menu, X, Moon, Sun} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import { DynamicBackground } from '../components/dashboard/DynamicBackground';
import { Footer } from '../components/Footer';

export default function ServicesPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <DynamicBackground />
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700/50">
        <div className="container mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white" style={{ backgroundColor: primaryColorHex }}>
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {settings.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/about" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {(t as any).aboutUs}
            </Link>
            <Link to="/services" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {(t as any).services}
            </Link>
            <Link to="/success-stories" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {(t as any).successStories}
            </Link>
            <Link to="/blog" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {(t as any).blog}
            </Link>
            <Link to="/pricing" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {t.pricing}
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {(t as any).contactUsPage}
            </Link>
            <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              {t.login}
            </Link>
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
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
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
                <Link to="/about" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {(t as any).aboutUs}
                </Link>
                <Link to="/services" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {(t as any).services}
                </Link>
                <Link to="/success-stories" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {(t as any).successStories}
                </Link>
                <Link to="/blog" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {(t as any).blog}
                </Link>
                <Link to="/pricing" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {t.pricing}
                </Link>
                <Link to="/contact" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {(t as any).contactUsPage}
                </Link>
                <Link to="/login" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {t.login}
                </Link>
                <div className="pt-2">
                  <Button asChild className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md font-bold">
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>{t.startNow}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}>
              <Briefcase className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              {(t as any).services}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {isRTL ? 'هذه الصفحة قيد التطوير. سنقوم بإضافة المحتوى قريباً.' : language === 'fr' ? 'Cette page est en cours de développement. Le contenu sera ajouté prochainement.' : 'This page is under development. Content will be added soon.'}
            </p>
            
            <div className="mt-12">
              <Button asChild size="lg" className="rounded-full px-8 text-white shadow-lg" style={{ backgroundColor: primaryColorHex }}>
                <Link to="/">
                  {isRTL ? 'العودة للرئيسية' : language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
