import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Store, Globe, Clock, CheckCircle2, Star } from 'lucide-react';
import { BusinessModel } from '../../data/businessDB';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from '../../i18n/translations';

import { useTheme } from '../../context/ThemeContext';

interface ProjectGridProps {
  matches: BusinessModel[];
  onViewDetails: (project: BusinessModel) => void;
  getRiskBadge: (level: string) => React.ReactNode | null;
}

export function ProjectGrid({ matches, onViewDetails, getRiskBadge }: ProjectGridProps) {
  const { language } = useLanguage();
  const { settings } = useTheme();
  const t = translations[language];

  const cardStyle = {
    borderRadius: settings.borderRadius === 'none' ? '0' : settings.borderRadius === 'md' ? '0.375rem' : settings.borderRadius === 'xl' ? '0.75rem' : settings.borderRadius === '2xl' ? '1rem' : '1.5rem',
    backgroundColor: settings.darkMode ? `rgba(15, 23, 42, ${settings.glassOpacity / 100})` : `rgba(255, 255, 255, ${settings.glassOpacity / 100})`,
    backdropFilter: `blur(${settings.glassBlur}px)`,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map(project => (
        <Card 
          key={project.id} 
          className="border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer" 
          style={cardStyle}
          onClick={() => onViewDetails(project)}
        >
          <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-50" />
            <div className="relative z-10 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full shadow-lg">
              {project.type === 'physical' ? <Store className="w-12 h-12 text-blue-600 dark:text-blue-400" /> : <Globe className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-xs font-bold uppercase tracking-wider">{t.viewPricing}</span>
            </div>
          </div>
          <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-700/50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-semibold rounded-lg px-2.5 py-0.5 flex items-center gap-1">
                  {project.type === 'physical' ? <Store className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                  {project.type === 'physical' ? t.physicalProject : t.ecommerceProject}
                </Badge>
                {project.matchPercentage && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 font-semibold rounded-lg px-2.5 py-0.5 flex items-center gap-1">
                    {language === 'ar' ? `تطابق ${project.matchPercentage}%` : language === 'fr' ? `Correspondance ${project.matchPercentage}%` : `${project.matchPercentage}% Match`}
                  </Badge>
                )}
              </div>
              {getRiskBadge(project.riskLevel)}
            </div>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">{t.capitalRecovery}</span>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {project.roiMonths} {t.months}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">{t.successRate}</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {project.successRate}%
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">{t.complexity}</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-2.5 h-2.5 ${s <= project.complexity ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-600'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className="text-[9px] font-bold uppercase dark:border-slate-600 dark:text-slate-300">
                {t.growth} {project.scalability === 'high' ? t.growthFast : project.scalability === 'medium' ? t.growthMedium : t.growthStable}
              </Badge>
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
