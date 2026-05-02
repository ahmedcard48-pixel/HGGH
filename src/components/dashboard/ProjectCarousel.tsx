import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Store, Globe, Clock, CheckCircle2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { BusinessModel } from '../../data/businessDB';
import { Button } from '@/src/components/ui/button';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from '../../i18n/translations';

import { useTheme } from '../../context/ThemeContext';

interface ProjectCarouselProps {
  matches: BusinessModel[];
  onViewDetails: (project: BusinessModel) => void;
  getRiskBadge: (level: string) => React.ReactNode | null;
  getTypeBadge: (type: string) => React.ReactNode | null;
}

export function ProjectCarousel({ matches, onViewDetails, getRiskBadge, getTypeBadge }: ProjectCarouselProps) {
  const { language } = useLanguage();
  const { settings, primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', direction: isRTL ? 'rtl' : 'ltr' });

  const cardStyle = {
    borderRadius: `var(--border-radius)`,
    backgroundColor: settings.darkMode ? `rgba(15, 23, 42, var(--glass-opacity))` : `rgba(255, 255, 255, var(--glass-opacity))`,
    backdropFilter: `blur(var(--glass-blur))`,
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 pb-12 sm:pb-0">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {matches.map(project => (
            <div key={project.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0">
              <Card 
                className="border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer h-full" 
                style={cardStyle}
                onClick={() => onViewDetails(project)}
              >
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-50" style={{ background: `linear-gradient(to bottom right, ${primaryColorHex}10, ${primaryColorHex}30)` }} />
                  <div className="relative z-10 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full shadow-lg">
                    {project.type === 'physical' ? <Store className="w-12 h-12" style={{ color: primaryColorHex }} /> : <Globe className="w-12 h-12" style={{ color: primaryColorHex }} />}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">{t.viewPricing}</span>
                  </div>
                </div>
                <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getTypeBadge(project.type)}
                    {getRiskBadge(project.riskLevel)}
                    {project.matchPercentage && (
                      <Badge variant="outline" className="flex items-center gap-1 text-[10px] border-none bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        {language === 'ar' ? `تطابق ${project.matchPercentage}%` : language === 'fr' ? `Correspondance ${project.matchPercentage}%` : `${project.matchPercentage}% Match`}
                      </Badge>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1 text-[10px] border-none" style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}>
                      <Star className="w-3 h-3" style={{ fill: primaryColorHex }} />
                      {t.marketPulseBadge} {project.successRate}%
                    </Badge>
                  </div>
                  <CardTitle 
                    className="text-xl font-bold text-slate-900 dark:text-white leading-tight transition-colors"
                    style={{ color: 'inherit' }}
                  >
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-1 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">{t.capitalRecovery}</span>
                      <span className="text-sm font-bold flex items-center gap-1" style={{ color: primaryColorHex }}>
                        <Clock className="w-3 h-3" /> {project.roiMonths} {t.months}
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">{t.successRate}</span>
                      <span className="text-sm font-bold flex items-center gap-1" style={{ color: primaryColorHex }}>
                        <CheckCircle2 className="w-3 h-3" /> {project.successRate}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className={`absolute ${isRTL ? '-right-4' : '-left-4'} top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white shadow-lg rounded-full hidden sm:flex`}
        onClick={scrollPrev}
      >
        {isRTL ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`absolute ${isRTL ? '-left-4' : '-right-4'} top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white shadow-lg rounded-full hidden sm:flex`}
        onClick={scrollNext}
      >
        {isRTL ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </Button>
    </div>
  );
}
