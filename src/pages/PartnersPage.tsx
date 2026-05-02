import React from 'react';
import { Search, Star, MapPin, ShieldCheck, Filter } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PartnersPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).partnerDirectory || 'Partner Directory'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).partnerDesc || 'Find verified accountants, lawyers, and agencies to help build your business.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name, service, or location..." 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Cabinet Ahmed & Co', type: 'Accounting', location: 'Algiers', rating: 4.9, verified: true },
              { name: 'Legal Solutions DZ', type: 'Law Firm', location: 'Oran', rating: 4.8, verified: true },
              { name: 'Digital Growth Agency', type: 'Marketing', location: 'Constantine', rating: 4.7, verified: false },
              { name: 'Expertise Finance', type: 'Consulting', location: 'Algiers', rating: 5.0, verified: true },
              { name: 'Tech Innovators', type: 'IT Services', location: 'Setif', rating: 4.6, verified: false },
              { name: 'Global Trade Logistics', type: 'Logistics', location: 'Bejaia', rating: 4.8, verified: true },
            ].map((partner, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl font-bold text-slate-700 dark:text-slate-300">
                    {partner.name.charAt(0)}
                  </div>
                  {partner.verified && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{partner.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">{partner.type}</p>
                
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {partner.location}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star className="w-4 h-4 fill-current" /> {partner.rating}
                  </div>
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
