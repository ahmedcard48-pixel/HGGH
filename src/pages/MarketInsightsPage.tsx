import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MarketInsightsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).marketInsights || 'Market Insights'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).marketInsightsDesc || 'Deep dive into the Algerian market trends and investment opportunities.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'E-commerce Growth', value: '+25%', icon: <TrendingUp className="h-6 w-6 text-green-500" /> },
              { title: 'Tech Startups', value: '150+', icon: <Activity className="h-6 w-6 text-blue-500" /> },
              { title: 'Agric-Tech Investment', value: '4.2B DZD', icon: <BarChart3 className="h-6 w-6 text-amber-500" /> },
              { title: 'Renewable Energy', value: '+18%', icon: <PieChart className="h-6 w-6 text-purple-500" /> },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</h3>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {(t as any).latestReports || 'Latest Reports'}
            </h2>
            <div className="space-y-6">
              {[1, 2, 3].map((report) => (
                <div key={report} className="flex flex-col md:flex-row gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                  <div className="w-full md:w-48 h-32 bg-slate-200 dark:bg-slate-800 rounded-lg flex-shrink-0"></div>
                  <div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">Q{report} 2026</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Algerian Tech Sector Analysis
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Comprehensive overview of the technology sector growth, key players, and emerging opportunities for investors.
                    </p>
                    <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      {(t as any).readMore || 'Read More'} &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
