import React from 'react';
import { BookOpen, FileText, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const ResourcesPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{(t as any).resources || 'Resources'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <BookOpen className="h-10 w-10 text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{(t as any).investmentGuides || 'Investment Guides'}</h2>
          <p className="text-slate-600 dark:text-slate-400">{(t as any).investmentGuidesDesc || 'Learn the basics of investing in Algeria.'}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <TrendingUp className="h-10 w-10 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{(t as any).marketTrends || 'Market Trends'}</h2>
          <p className="text-slate-600 dark:text-slate-400">{(t as any).marketTrendsDesc || 'Stay updated with the latest market trends.'}</p>
        </div>
      </div>
    </div>
  );
};
