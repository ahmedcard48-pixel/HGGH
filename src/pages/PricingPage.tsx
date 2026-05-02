import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Check, ArrowRight, Briefcase, Menu, X, Tag, GraduationCap, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

import Footer from '../components/Footer';

export default function PricingPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tiers = [
    {
      name: t.basicPlan,
      price: t.free,
      description: t.basicDesc,
      features: [
        t.basicFeature1,
        t.basicFeature2,
        t.basicFeature3,
        t.basicFeature4
      ],
      buttonText: t.startFree,
      buttonVariant: 'outline' as const
    },
    {
      name: t.proPlan,
      price: t.proPrice,
      description: t.proDesc,
      features: [
        t.proFeature1,
        t.proFeature2,
        t.proFeature3,
        t.proFeature4,
        t.proFeature5
      ],
      buttonText: t.subscribeNow,
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: t.corpPlan,
      price: t.corpPrice,
      description: t.corpDesc,
      features: [
        t.corpFeature1,
        t.corpFeature2,
        t.corpFeature3,
        t.corpFeature4,
        t.corpFeature5
      ],
      buttonText: t.contactUs,
      buttonVariant: 'outline' as const
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900" dir={isRTL ? "rtl" : "ltr"}>
      {/* Navigation */}
      <Header />

      <main className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {t.investInSuccess}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.pricingDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {tiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative flex flex-col rounded-3xl transition-all duration-300 ${tier.popular ? 'md:-translate-y-4 bg-white dark:bg-slate-900 z-10' : 'border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg bg-white dark:bg-slate-900/50 backdrop-blur-sm'}`}
                style={tier.popular ? { 
                  borderColor: primaryColorHex,
                  boxShadow: `0 25px 50px -12px ${primaryColorHex}30`
                } : {}}
              >
                {tier.popular && (
                  <div 
                    className={`absolute top-0 ${isRTL ? 'start-1/2 rtl:translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-lg`}
                    style={{ backgroundColor: primaryColorHex }}
                  >
                    {t.mostPopular}
                  </div>
                )}
                <CardHeader className="p-8 pb-4 text-center">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-8 pt-4">
                  <div className="mb-8 text-center flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                    {tier.name !== t.basicPlan && <span className="text-slate-500 dark:text-slate-400 font-medium text-lg">{t.perMonth}</span>}
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                        <div className="mt-0.5 bg-emerald-100 p-1 rounded-full text-emerald-600 shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button 
                    className={`w-full h-14 rounded-xl font-bold text-lg transition-all ${tier.popular ? 'text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white'}`} 
                    style={tier.popular ? { backgroundColor: primaryColorHex } : {}}
                    variant={tier.buttonVariant} 
                    asChild
                  >
                    <Link to="/register">{tier.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.specialOffers}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">{t.offersDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white dark:from-slate-800 to-slate-50 dark:to-slate-900">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t.annualDiscount}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">{t.annualDiscountDesc}</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white dark:from-slate-800 to-slate-50 dark:to-slate-900">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t.studentDiscount}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">{t.studentDiscountDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-slate-600 dark:text-slate-300 font-bold transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = primaryColorHex}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              <ArrowRight className={`${isRTL ? 'me-2' : 'mr-2'} h-5 w-5 ${!isRTL && 'rotate-180'}`} />
              {t.backToHome}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
