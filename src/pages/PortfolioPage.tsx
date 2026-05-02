import React from 'react';
import { Briefcase, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {(t as any).myPortfolio || 'My Portfolio'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Track your saved projects and investments.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {(t as any).addNew || 'Add New'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Value</h3>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">1,250,000 DZD</p>
              <p className="text-sm text-green-500 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +12.5% this month
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Projects</h3>
                <Briefcase className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">3</p>
              <p className="text-sm text-slate-500">2 in planning phase</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">ROI</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">18.2%</p>
              <p className="text-sm text-slate-500">Average return</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Saved Projects</h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Project Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Sector</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Est. Budget</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {[
                    { name: 'E-commerce Delivery', sector: 'Logistics', budget: '500,000 DZD', status: 'Active' },
                    { name: 'Smart Agriculture', sector: 'Agri-Tech', budget: '1,200,000 DZD', status: 'Planning' },
                    { name: 'Local Artisan Marketplace', sector: 'E-commerce', budget: '300,000 DZD', status: 'Saved' },
                  ].map((project, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{project.name}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{project.sector}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{project.budget}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          project.status === 'Planning' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
