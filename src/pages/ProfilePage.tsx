import React from 'react';
import { User, Settings, CreditCard, LogOut } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const ProfilePage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{(t as any).profile || 'Profile'}</h1>
      <div className="max-w-2xl bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-slate-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{(t as any).fullName || 'Full Name'}</h2>
            <p className="text-slate-600 dark:text-slate-400">user@example.com</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
            <Settings className="h-5 w-5 text-slate-500" />
            <span>{(t as any).settings || 'Settings'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
            <CreditCard className="h-5 w-5 text-slate-500" />
            <span>{(t as any).pricing || 'Pricing'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer text-red-500">
            <LogOut className="h-5 w-5" />
            <span>{(t as any).logout || 'Logout'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
