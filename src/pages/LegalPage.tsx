import React from 'react';
import { Scale, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LegalPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).legalCompliance || 'Legal & Compliance'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).legalDesc || 'Navigate the Algerian legal landscape with confidence.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <Scale className="h-10 w-10 text-blue-500 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Company Registration</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Step-by-step guide to registering your company (SARL, EURL, SPA) with the CNRC.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Choose a legal status
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Notarize statutes
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Register at CNRC
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <FileText className="h-10 w-10 text-amber-500 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tax Obligations</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Understand your tax duties, including IBS, TAP, and VAT (TVA) in Algeria.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Monthly declarations (G50)
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Annual balance sheet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
