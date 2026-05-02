import React from 'react';
import { Settings, Key, Bell, Shield, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SettingsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {(t as any).settings || 'Settings'}
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {[
                  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                  { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
                  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
                  { id: 'api-keys', label: 'API Keys', icon: <Key className="w-5 h-5" /> },
                  { id: 'preferences', label: 'Preferences', icon: <Settings className="w-5 h-5" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.id === 'profile' 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-grow">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input type="text" defaultValue="Ahmed User" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input type="email" defaultValue="ahmed@example.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+213 555 123 456" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Gemini API Key</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                  Enter your Gemini API key to unlock AI-powered features like the AI Advisor, Mastermind, and Visual Identity generator.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">API Key</label>
                    <input type="password" placeholder="AIzaSy..." className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="pt-2">
                    <button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Save API Key
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
