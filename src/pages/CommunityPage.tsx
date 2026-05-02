import React from 'react';
import { Users, MessageSquare, Heart, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CommunityPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).community || 'Community'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).communityDesc || 'Connect with other entrepreneurs and investors in Algeria.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
              <div className="flex-grow">
                <textarea 
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={(t as any).shareThoughts || 'Share your thoughts or ask a question...'}
                  rows={3}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    {(t as any).post || 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    U{post}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Entrepreneur {post}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  What are the best practices for registering a tech startup in Algiers? I'm looking for advice on the legal procedures and required documents.
                </p>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>24</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>8</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
