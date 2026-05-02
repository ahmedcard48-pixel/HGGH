import React from 'react';
import { Landmark, Coins, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FundingPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).fundingGrants || 'Funding & Grants'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).fundingDesc || 'Discover financial support programs available for Algerian entrepreneurs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Landmark className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">ANADE (ex-ANSEJ)</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Support for young entrepreneurs (19-35 years old) to create micro-enterprises with interest-free loans.
              </p>
              <button className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 hover:underline">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <Coins className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">CNAC</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Funding for unemployed individuals aged 30-50 to start their own businesses.
              </p>
              <button className="text-green-600 dark:text-green-400 font-medium flex items-center gap-2 hover:underline">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">ANGEM</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Micro-credit agency providing small loans for home-based businesses and artisans.
              </p>
              <button className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-2 hover:underline">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
