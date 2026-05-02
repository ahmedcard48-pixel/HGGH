import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EventsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const events = [
    {
      title: 'Algiers Tech Startup Summit 2026',
      date: 'May 15-16, 2026',
      location: 'CIC Alger',
      time: '09:00 - 18:00',
      attendees: '500+',
      type: 'Conference',
      color: 'bg-blue-500'
    },
    {
      title: 'E-commerce Masterclass',
      date: 'June 5, 2026',
      location: 'Online Webinar',
      time: '14:00 - 16:00',
      attendees: '200+',
      type: 'Webinar',
      color: 'bg-purple-500'
    },
    {
      title: 'Agri-Tech Investment Pitch',
      date: 'July 10, 2026',
      location: 'Oran',
      time: '10:00 - 15:00',
      attendees: '150+',
      type: 'Networking',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {(t as any).eventsWebinars || 'Events & Webinars'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {(t as any).eventsDesc || 'Join upcoming events to network, learn, and grow your business.'}
            </p>
          </div>

          <div className="space-y-6">
            {events.map((event, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-full md:w-48 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">{event.date.split(',')[0]}</span>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold text-white ${event.color}`}>
                      {event.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{event.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</div>
                    <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.attendees}</div>
                  </div>
                </div>
                
                <div className="w-full md:w-auto flex-shrink-0">
                  <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors">
                    Register Now
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
