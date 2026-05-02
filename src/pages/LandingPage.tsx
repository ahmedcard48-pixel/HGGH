import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lightbulb, CheckCircle, Briefcase, BarChart3, Menu, X, Star, Quote, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import { DynamicBackground } from '../components/dashboard/DynamicBackground';
import Header from '../components/Header';

import Footer from '../components/Footer';

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
  ];

  const testimonials = [
    { name: t.testimonial1Name, role: t.testimonial1Role, text: t.testimonial1Text, rating: 5 },
    { name: t.testimonial2Name, role: t.testimonial2Role, text: t.testimonial2Text, rating: 5 },
    { name: t.testimonial3Name, role: t.testimonial3Role, text: t.testimonial3Text, rating: 5 },
  ];

  return (
    <div className="min-h-screen relative font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <DynamicBackground />
      {/* Navigation */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-6 shadow-sm"
              >
                <span className={`flex h-2 w-2 rounded-full ${isRTL ? 'me-2' : 'ml-2'}`} style={{ backgroundColor: primaryColorHex }}></span>
                {t.heroBadge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                {t.heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
              >
                {t.heroDesc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
              >
                <Button size="lg" className="h-14 px-8 text-lg rounded-full text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all" style={{ backgroundColor: primaryColorHex }} asChild>
                  <Link to="/register">
                    {t.startJourneyBtn} <ArrowLeft className={`${isRTL ? 'ms-2' : 'mr-2'} h-5 w-5 ${!isRTL && 'rotate-180'}`} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 backdrop-blur-sm bg-white/50 dark:bg-slate-900/30 transition-all" asChild>
                  <Link to="/pricing">{t.viewPricing}</Link>
                </Button>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-16 relative max-w-6xl mx-auto px-4 sm:px-6"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-amber-500/10 rounded-[2.5rem] -rotate-1 blur-2xl"></div>
                <div className="relative bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-[2.5rem] shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-sm group">

                  {/* Fallback pattern underneath */}
                  <div className="absolute inset-3 rounded-[2rem] bg-slate-50 dark:bg-slate-800 -z-10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">{t.heroBadge || 'ECONOMINE'}</span>
                  </div>

                  <div className="relative group/image">
                    {/* Placeholder designed to look good if image isn't loaded */}
                    <div className="w-full min-h-[300px] sm:min-h-[400px] max-h-[600px] rounded-[2rem] bg-gradient-to-br from-indigo-100 to-amber-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-8 border border-white/20">
                      <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-white/50 dark:bg-slate-700/50 rounded-full flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-indigo-400" />
                        </div>
                        <p className="text-slate-500 font-medium">Storefront Visual Placeholder</p>
                      </div>
                    </div>

                    {/* The actual image loads on top */}
                    <img
                      src="/hero_storefront.png"
                      alt="ECONOMINE Storefront"
                      className="absolute inset-0 w-full h-full rounded-[2rem] object-cover transition-opacity duration-1000 opacity-0 animate-subtle-zoom"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    />
                  </div>

                  {/* Subtle Overlays */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80 pointer-events-none"></div>

                  {/* Floating Elements Over the Image */}
                  <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden sm:flex">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="text-amber-400 h-4 w-4 fill-amber-400" />
                        <Star className="text-amber-400 h-4 w-4 fill-amber-400" />
                        <Star className="text-amber-400 h-4 w-4 fill-amber-400" />
                        <Star className="text-amber-400 h-4 w-4 fill-amber-400" />
                        <Star className="text-amber-400 h-4 w-4 fill-amber-400" />
                      </div>
                      <p className="text-sm font-medium">Top Rated Projects</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white font-bold tracking-wide">
                      Market Ready
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.whyEconomine}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">{t.whyEconomineDesc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}
                >
                  <Lightbulb className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.feature1Title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t.feature1Desc}</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}
                >
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.feature2Title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t.feature2Desc}</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}
                >
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.feature3Title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t.feature3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{t.testimonialsTitle}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">{t.testimonialsDesc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-8 rounded-3xl shadow-sm border transition-shadow bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-700/50">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 mb-4 opacity-20 text-slate-900 dark:text-white" />
                  <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 border-t bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{t.faqTitle}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">{t.faqDesc}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl border overflow-hidden transition-colors bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <span className="font-semibold text-lg text-slate-900 dark:text-white">{faq.q}</span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
