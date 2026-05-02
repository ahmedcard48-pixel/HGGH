import React from 'react';
import { Brain, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const AIToolsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{(t as any).aiTools || 'AI Tools'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <Brain className="h-10 w-10 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{(t as any).aiConsultantTab}</h2>
          <p className="text-slate-600 dark:text-slate-400">{(t as any).askConsultantPlaceholder}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <Sparkles className="h-10 w-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{(t as any).aiMastermindTab}</h2>
          <p className="text-slate-600 dark:text-slate-400">{(t as any).clickToUpdateMastermind}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <MessageSquare className="h-10 w-10 text-emerald-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{(t as any).brandingAITitle}</h2>
          <p className="text-slate-600 dark:text-slate-400">{(t as any).clickToGenerateBranding}</p>
        </div>
      </div>
    </div>
  );
};
