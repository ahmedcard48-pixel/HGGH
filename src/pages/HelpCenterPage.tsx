import React from 'react';
import { HelpCircle, Book, MessageCircle, FileQuestion } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HelpCenterPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).helpCenter || 'Help Center'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).helpDesc || 'How can we help you today?'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                <Book className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Getting Started Guide</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Learn how to use ECONOMINE effectively.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-start gap-4 hover:border-purple-500 transition-colors cursor-pointer">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                <FileQuestion className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">FAQs</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Answers to the most common questions.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I generate a business plan?', a: 'You can generate a business plan by navigating to the Dashboard and using the AI Advisor tool. Provide details about your idea, and it will generate a comprehensive plan.' },
              { q: 'Is my data secure?', a: 'Yes, we take data security very seriously. All your projects and personal information are encrypted and stored securely.' },
              { q: 'Can I upgrade my plan later?', a: 'Absolutely! You can upgrade your subscription at any time from the Settings > Pricing page. The new features will be available immediately.' },
              { q: 'How do I contact an accountant?', a: 'Visit the Partner Directory page to find verified accountants. You can filter by location and expertise, and contact them directly through the platform.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 ml-7">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 text-center text-white">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="mb-6 opacity-90">Our support team is always ready to assist you.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
