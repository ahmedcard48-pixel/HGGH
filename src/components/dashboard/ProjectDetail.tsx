import React from 'react';
import { Button } from '@/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Store, Globe, Rocket, PieChart, BarChart3, Truck, Building2, ListChecks, TrendingUp, Zap, Target, ChevronRight, TrendingUp as TrendingUpIcon, Wallet, BarChart3 as BarChart3Icon, Lightbulb, Users, ShieldAlert, CheckCircle2, Star, MapPin } from 'lucide-react';
import { BusinessModel } from '../../data/businessDB';
import { Input } from '@/src/components/ui/input';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from '../../i18n/translations';

import { useTheme } from '../../context/ThemeContext';

interface ProjectDetailProps {
  selectedProject: BusinessModel;
  user: any;
  generateActionPlan: () => void;
  isGenerating: boolean;
  activeDetailTab: string;
  setActiveDetailTab: (tab: any) => void;
  runMastermind: () => void;
  isMasterminding: boolean;
  mastermindAnalysis: string | null;
  askConsultant: () => void;
  consultantMessages: {role: 'user' | 'assistant', content: string}[];
  consultantInput: string;
  setConsultantInput: (input: string) => void;
  isConsulting: boolean;
  actionPlan: any;
  renderFinancialChart: () => React.ReactNode | null;
  getRiskBadge: (level: string) => React.ReactNode | null;
  getTypeBadge: (type: string) => React.ReactNode | null;
  getImpactBadge: (impact: string) => React.ReactNode | null;
  getMarketPulse: () => void;
  isPulseLoading: boolean;
  marketPulse: string | null;
  generatePitch: () => void;
  isPitchLoading: boolean;
  pitch: string | null;
  getBrandingAI: () => void;
  isBrandingLoading: boolean;
  brandingAI: any;
  getGrowthStrategy: () => void;
  isGrowthLoading: boolean;
  growthStrategy: string | null;
  onBack: () => void;
}

export function ProjectDetail({
  selectedProject,
  user,
  generateActionPlan,
  isGenerating,
  activeDetailTab,
  setActiveDetailTab,
  runMastermind,
  isMasterminding,
  mastermindAnalysis,
  askConsultant,
  consultantMessages,
  consultantInput,
  setConsultantInput,
  isConsulting,
  actionPlan,
  renderFinancialChart,
  getRiskBadge,
  getTypeBadge,
  getImpactBadge,
  getMarketPulse,
  isPulseLoading,
  marketPulse,
  generatePitch,
  isPitchLoading,
  pitch,
  getBrandingAI,
  isBrandingLoading,
  brandingAI,
  getGrowthStrategy,
  isGrowthLoading,
  growthStrategy,
  onBack
}: ProjectDetailProps) {
  const { language } = useLanguage();
  const { settings, primaryColorHex } = useTheme();
  const t = translations[language];
  
  const glassCardStyle = {
    backgroundColor: settings.darkMode ? `rgba(15, 23, 42, var(--glass-opacity))` : `rgba(255, 255, 255, var(--glass-opacity))`,
    backdropFilter: `blur(var(--glass-blur))`,
    borderRadius: `var(--border-radius)`,
  };

  const [simulatedCapital, setSimulatedCapital] = React.useState(user.capital || selectedProject.minCapital);

  const financialSimulation = React.useMemo(() => {
    const cap = simulatedCapital;
    return {
      rent: cap * selectedProject.financialRatios.rent,
      equipment: cap * selectedProject.financialRatios.equipment,
      inventory: cap * selectedProject.financialRatios.inventory,
      buffer: cap * selectedProject.financialRatios.buffer,
      estimatedRevenue: (cap / selectedProject.minCapital) * (selectedProject.detailedFinancials?.estimatedMonthlyRevenue || 0)
    };
  }, [simulatedCapital, selectedProject]);
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-24">
      
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-white -ml-2 bg-white dark:bg-slate-900/50 backdrop-blur-sm sm:bg-transparent rounded-full px-4 h-10 sm:h-auto border border-slate-200 dark:border-slate-700 sm:border-none shadow-sm sm:shadow-none"
        >
          <ChevronRight className="w-5 h-5 ml-1 rtl:rotate-180" />
          <span className="font-bold">{t.backToProjects}</span>
        </Button>
      </div>

      {/* Project Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden" style={{ borderRadius: 'var(--border-radius)' }}>
          <CardHeader className="text-white p-6 sm:p-8" style={{ background: `linear-gradient(to right, #0f172a, ${primaryColorHex}dd)` }}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2">
                {getTypeBadge(selectedProject.type)}
                {getRiskBadge(selectedProject.riskLevel)}
                {getImpactBadge(selectedProject.environmentalImpact)}
                <Badge className="bg-white dark:bg-slate-900/10 text-white border-white/20 px-3 py-1 rounded-full text-[10px] sm:text-xs">
                  {selectedProject.roiMonths} {t.months} ROI
                </Badge>
              </div>
              <Button 
                onClick={generateActionPlan} 
                disabled={isGenerating}
                className="w-full sm:w-auto text-white rounded-lg font-bold shadow-md h-10 sm:h-auto"
                style={{ backgroundColor: primaryColorHex }}
              >
                {isGenerating ? t.generating : t.generateActionPlan}
              </Button>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">{selectedProject.title}</CardTitle>
            <CardDescription className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              {selectedProject.description}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 shadow-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 bg-white dark:bg-slate-900" style={{ borderRadius: 'var(--border-radius)' }}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}>
              <TrendingUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{t.roi}</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{selectedProject.roiMonths} {t.months}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}>
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{t.monthlyRevenue}</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{selectedProject.detailedFinancials?.estimatedMonthlyRevenue?.toLocaleString() || '0'} {t.currency}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl" style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}>
              <BarChart3Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{t.breakEven}</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{selectedProject.detailedFinancials?.breakEvenMonths || '0'} {t.months}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <div className="bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden" style={{ borderRadius: 'var(--border-radius)' }}>
        <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-800/50/50 no-scrollbar scroll-smooth">
          {[
            { id: 'branding', label: t.brandingAndMarketing, icon: Rocket },
            { id: 'brandingAI', label: t.brandingAI, icon: Star },
            { id: 'financial', label: t.financialStudy, icon: PieChart },
            { id: 'market', label: t.marketAnalysis, icon: BarChart3 },
            { id: 'marketPulse', label: t.marketPulseTab, icon: TrendingUp },
            { id: 'sourcing', label: t.sourcingAndLogistics, icon: Truck },
            { id: 'legal', label: t.legalProcedures, icon: Building2 },
            { id: 'roadmap', label: t.roadmap, icon: ListChecks },
            { id: 'growth', label: t.growthStrategyTab, icon: TrendingUp },
            { id: 'pitch', label: t.investorPitchTab, icon: Target },
            { id: 'actionPlan', label: t.actionPlanTab, icon: Rocket },
            { id: 'consultant', label: t.aiConsultantTab, icon: Zap },
            { id: 'mastermind', label: t.aiMastermindTab, icon: Target },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveDetailTab(tab.id as any)}
              className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
                activeDetailTab === tab.id 
                  ? 'border-b-2 bg-white dark:bg-slate-900' 
                  : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800/50'
              }`}
              style={activeDetailTab === tab.id ? { borderColor: primaryColorHex, color: primaryColorHex } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {activeDetailTab === 'marketPulse' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.algerianMarketPulse}</h3>
                <Button 
                  onClick={getMarketPulse} 
                  disabled={isPulseLoading} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isPulseLoading ? t.analyzing : t.updatePulse}
                </Button>
              </div>
              <div 
                className="p-6 rounded-2xl border leading-relaxed whitespace-pre-wrap"
                style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20`, color: '#0f172a' }}
              >
                {marketPulse || t.getInstantMarketPulse}
              </div>
            </div>
          )}

          {activeDetailTab === 'pitch' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.investorPitchTitle}</h3>
                <Button 
                  onClick={generatePitch} 
                  disabled={isPitchLoading} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isPitchLoading ? t.generating : t.generateNewPitch}
                </Button>
              </div>
              <div 
                className="p-8 rounded-2xl border italic text-lg leading-relaxed whitespace-pre-wrap shadow-inner"
                style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20`, color: '#0f172a' }}
              >
                {pitch || t.generatePitchDesc}
              </div>
            </div>
          )}

          {activeDetailTab === 'brandingAI' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.brandingAITitle}</h3>
                <Button 
                  onClick={getBrandingAI} 
                  disabled={isBrandingLoading} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isBrandingLoading ? t.generating : t.generateFullBranding}
                </Button>
              </div>
              
              {brandingAI ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t.namesAndMeanings}</h4>
                      <div className="space-y-3">
                        {brandingAI.names.map((n: any, i: number) => (
                          <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="font-bold" style={{ color: primaryColorHex }}>{n.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">{n.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t.slogans}</h4>
                      <div className="flex flex-wrap gap-2">
                        {brandingAI.slogans.map((s: string, i: number) => (
                          <Badge key={i} variant="secondary" className="px-3 py-1">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t.suggestedColorPalette}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {brandingAI.colors.map((c: any, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg shadow-sm" style={{ backgroundColor: c.hex }}></div>
                            <div>
                              <p className="text-xs font-bold uppercase">{c.hex}</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">{c.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.brandPersonality}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{brandingAI.voice}</p>
                      <h4 className="font-bold text-slate-900 dark:text-white mt-4 mb-2">{t.suggestedTypography}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{brandingAI.typography}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                  {t.clickToGenerateBranding}
                </div>
              )}
            </div>
          )}
          {activeDetailTab === 'mastermind' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.mastermindAnalysisTitle}</h3>
                <Button 
                  onClick={runMastermind} 
                  disabled={isMasterminding} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isMasterminding ? t.analyzing : t.updateAnalysis}
                </Button>
              </div>
              <div 
                className="p-6 rounded-2xl border leading-relaxed whitespace-pre-wrap"
                style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20`, color: '#0f172a' }}
              >
                {mastermindAnalysis || t.clickToUpdateMastermind}
              </div>
            </div>
          )}
          {activeDetailTab === 'consultant' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="h-96 overflow-y-auto space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                {consultantMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'text-white self-end ml-auto' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'}`}
                    style={msg.role === 'user' ? { backgroundColor: primaryColorHex } : {}}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={consultantInput}
                  onChange={(e) => setConsultantInput(e.target.value)}
                  placeholder={t.askConsultantPlaceholder}
                  className="flex-1 rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && askConsultant()}
                />
                <Button 
                  onClick={askConsultant} 
                  disabled={isConsulting} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isConsulting ? t.thinking : t.send}
                </Button>
              </div>
            </div>
          )}
          {activeDetailTab === 'actionPlan' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.proposedActionPlan}</h3>
                <Button 
                  onClick={generateActionPlan} 
                  disabled={isGenerating} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isGenerating ? t.generating : actionPlan ? t.updatePlan : t.generateActionPlanBtn}
                </Button>
              </div>
              
              {actionPlan ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t.brandingAndMarketing}</h4>
                      <p><strong>{t.storeName}</strong> {actionPlan.branding?.storeName || t.notAvailable}</p>
                      <p><strong>{t.socialMediaAccounts}</strong> {actionPlan.branding?.socialMediaHandles?.join(', ') || t.notAvailable}</p>
                      <p><strong>{t.marketingStrategy}</strong> {actionPlan.branding?.marketingStrategy || t.notAvailable}</p>
                      <p><strong>{t.influencerType}</strong> {actionPlan.branding?.influencerTypes || t.notAvailable}</p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t.sourcingAndLegal}</h4>
                      <p><strong>{t.suppliers}</strong> {actionPlan.sourcingAndLegal?.wholesaleSources || t.notAvailable}</p>
                      <p><strong>{t.legalChecklist}</strong></p>
                      <ul className="list-disc list-inside">
                        {actionPlan.sourcingAndLegal?.legalChecklist?.map((item: string, i: number) => <li key={i}>{item}</li>) || t.notAvailable}
                      </ul>
                    </div>
                  </div>
                  <div 
                    className="p-6 rounded-2xl border"
                    style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}
                  >
                    <h4 className="font-bold mb-4" style={{ color: primaryColorHex }}>{t.financialPlan}</h4>
                    <p><strong>{t.rent}</strong> {actionPlan.capitalAllocation?.rent?.toLocaleString() || '0'} {t.currency}</p>
                    <p><strong>{t.equipment}</strong> {actionPlan.capitalAllocation?.equipment?.toLocaleString() || '0'} {t.currency}</p>
                    <p><strong>{t.rawMaterials}</strong> {actionPlan.capitalAllocation?.rawMaterials?.toLocaleString() || '0'} {t.currency}</p>
                    <p><strong>{t.explanation}</strong> {actionPlan.capitalAllocation?.explanation || t.notAvailable}</p>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                  {t.clickToGenerateActionPlan}
                </div>
              )}
            </div>
          )}
          {activeDetailTab === 'branding' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" /> {t.suggestedNames}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedProject.branding.suggestedNames.map((name, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-lg text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        {name}
                        <Badge variant="outline" className="text-[10px]">{t.option} {i+1}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" style={{ color: primaryColorHex }} /> {t.launchStrategy}
                  </h3>
                  <div 
                    className="p-6 rounded-2xl border leading-relaxed"
                    style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20`, color: '#0f172a' }}
                  >
                    {selectedProject.branding.marketingStrategy}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDetailTab === 'financial' && (
            <div className="space-y-8 animate-in fade-in">
              <div 
                className="p-6 rounded-2xl border mb-8"
                style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: primaryColorHex }}>{t.interactiveBudgetSimulator}</h3>
                    <p className="text-sm opacity-80" style={{ color: primaryColorHex }}>{t.changeCapitalToSeeResults}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="text-sm font-bold whitespace-nowrap" style={{ color: primaryColorHex }}>{t.capitalLabel}</span>
                    <Input 
                      type="number" 
                      value={simulatedCapital}
                      onChange={(e) => setSimulatedCapital(Number(e.target.value))}
                      className="w-full md:w-48 bg-white dark:bg-slate-900 rounded-xl font-bold"
                      style={{ borderColor: `${primaryColorHex}40`, '--tw-ring-color': primaryColorHex } as any}
                    />
                    <span className="text-sm font-bold" style={{ color: primaryColorHex }}>DZD</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.simulatedCapitalDistribution}</h3>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">{t.budgetDistributionBasedOn} <span className="font-bold text-slate-900 dark:text-white">{simulatedCapital.toLocaleString()} {t.currency}</span></p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: t.rentAndSetup, value: financialSimulation.rent, ratio: selectedProject.financialRatios.rent, color: primaryColorHex },
                      { label: t.equipmentAndTools, value: financialSimulation.equipment, ratio: selectedProject.financialRatios.equipment, color: '#10b981' },
                      { label: t.initialInventory, value: financialSimulation.inventory, ratio: selectedProject.financialRatios.inventory, color: '#f59e0b' },
                      { label: t.workingCapital, value: financialSimulation.buffer, ratio: selectedProject.financialRatios.buffer, color: '#8b5cf6' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{item.label}</span>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900 dark:text-white">{item.value.toLocaleString()} {t.currency}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{(item.ratio * 100).toFixed(0)}% {t.ofTotal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 text-center space-y-6">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">{t.expectedMonthlyProfit}</p>
                    <p className="text-4xl font-black mt-2" style={{ color: primaryColorHex }}>{financialSimulation.estimatedRevenue.toLocaleString()} {t.currency}</p>
                  </div>
                  <div className="h-40 flex items-end justify-center gap-4 px-4">
                    {[0.6, 0.8, 1, 1.2, 1.4].map((scale, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-lg relative group" 
                        style={{ 
                          height: `${(financialSimulation.estimatedRevenue / 500000) * 100 * scale}%`, 
                          minHeight: '10%',
                          backgroundColor: `${primaryColorHex}30`
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {t.month} {i+1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic">{t.estimatesNote}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">{t.fixedCostsMonthly}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedProject.detailedFinancials?.fixedCosts?.map((cost, i) => (
                      <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                        <span className="text-slate-600 dark:text-slate-300">{cost.item}</span>
                        <span className="font-bold">{cost.cost.toLocaleString()} {t.currency}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">{t.variableCostsEstimated}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedProject.detailedFinancials?.variableCosts?.map((cost, i) => (
                      <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                        <span className="text-slate-600 dark:text-slate-300">{cost.item}</span>
                        <span className="font-bold">{cost.cost.toLocaleString()} {t.currency}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeDetailTab === 'market' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5" style={{ color: primaryColorHex }} /> {t.targetAudience}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedProject.marketAnalysis?.targetAudience || t.notAvailable}</p>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-500" /> {t.marketCompetition}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedProject.marketAnalysis?.competitors || t.notAvailable}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}>
                    <h5 className="font-bold text-xs mb-2 uppercase tracking-wider" style={{ color: primaryColorHex }}>{t.strengths}</h5>
                    <ul className="text-xs space-y-1 list-disc list-inside" style={{ color: primaryColorHex }}>
                      {selectedProject.marketAnalysis?.swot?.strengths?.map((s, i) => <li key={i}>{s}</li>) || <li>{t.notAvailable}</li>}
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <h5 className="font-bold text-rose-800 text-xs mb-2 uppercase tracking-wider">{t.weaknesses}</h5>
                    <ul className="text-xs text-rose-700 space-y-1 list-disc list-inside">
                      {selectedProject.marketAnalysis?.swot?.weaknesses?.map((w, i) => <li key={i}>{w}</li>) || <li>{t.notAvailable}</li>}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}>
                    <h5 className="font-bold text-xs mb-2 uppercase tracking-wider" style={{ color: primaryColorHex }}>{t.opportunities}</h5>
                    <ul className="text-xs space-y-1 list-disc list-inside" style={{ color: primaryColorHex }}>
                      {selectedProject.marketAnalysis?.swot?.opportunities?.map((o, i) => <li key={i}>{o}</li>) || <li>{t.notAvailable}</li>}
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <h5 className="font-bold text-amber-800 text-xs mb-2 uppercase tracking-wider">{t.threats}</h5>
                    <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                      {selectedProject.marketAnalysis?.swot?.threats?.map((t, i) => <li key={i}>{t}</li>) || <li>{t.notAvailable}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDetailTab === 'sourcing' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t.suppliersAndLogisticsNetwork}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProject.sourcing.map((source, i) => (
                  <div 
                    key={i} 
                    className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-700/50 transition-all flex items-start gap-4"
                    style={{ borderColor: 'var(--border-color, #f1f5f9)' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${primaryColorHex}40`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f1f5f9'}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColorHex}15`, color: primaryColorHex }}>
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{source.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {source.location}
                      </p>
                      <Badge variant="outline" className="mt-2 text-[10px]" style={{ color: primaryColorHex, borderColor: `${primaryColorHex}40` }}>{source.contactType}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDetailTab === 'legal' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t.legalRequirementsAlgeria}</h3>
              <div className="space-y-3">
                {selectedProject.legalSteps.map((step, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-5 rounded-2xl border-2 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700/50 transition-all group"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${primaryColorHex}40`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f1f5f9'}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center font-bold transition-colors"
                        style={{ backgroundColor: 'var(--bg-color, #f1f5f9)', color: 'var(--text-color, #94a3b8)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${primaryColorHex}15`;
                          e.currentTarget.style.color = primaryColorHex;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f1f5f9';
                          e.currentTarget.style.color = '#94a3b8';
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{step.task}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">{t.expectedDuration} {step.duration}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{t.cost} {step.cost}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDetailTab === 'roadmap' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="relative">
                <div className="absolute top-0 bottom-0 right-6 w-0.5" style={{ backgroundColor: `${primaryColorHex}20` }}></div>
                <div className="space-y-12 relative">
                  {[
                    { title: t.planningPhase, desc: t.planningDesc, icon: Lightbulb, color: primaryColorHex },
                    { title: t.legalPhase, desc: t.legalDesc, icon: Building2, color: '#10b981' },
                    { title: t.prepPhase, desc: t.prepDesc, icon: Truck, color: '#f59e0b' },
                    { title: t.launchPhase, desc: t.launchDesc, icon: Rocket, color: '#f43f5e' },
                  ].map((milestone, i) => (
                    <div key={i} className="flex items-start gap-8 relative">
                      <div 
                        className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg relative z-10 border-4 border-white"
                        style={{ backgroundColor: milestone.color }}
                      >
                        <milestone.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{milestone.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{milestone.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeDetailTab === 'growth' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.growthAndExpansionStrategy}</h3>
                <Button 
                  onClick={getGrowthStrategy} 
                  disabled={isGrowthLoading} 
                  className="text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  {isGrowthLoading ? t.planning : t.generateGrowthStrategy}
                </Button>
              </div>
              {growthStrategy ? (
                <div 
                  className="p-8 rounded-2xl border leading-relaxed whitespace-pre-wrap"
                  style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20`, color: '#0f172a' }}
                >
                  {growthStrategy}
                </div>
              ) : (
                <div 
                  className="p-8 rounded-2xl border leading-relaxed whitespace-pre-wrap text-center"
                  style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20`, color: '#0f172a' }}
                >
                  {t.getExpansionPlan}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" style={{ color: primaryColorHex }} /> {t.algerianMarketTrends}
                    </h4>
                    <div className="space-y-3">
                      {selectedProject.marketTrends.map((trend, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColorHex }}></div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> {t.requiredExperience}
                    </h4>
                    <p className="text-emerald-800 leading-relaxed">{selectedProject.requiredExperience}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" /> {t.expansionPossibilities}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">{t.scalability}</span>
                        <Badge className={
                          selectedProject.scalability === 'high' ? 'bg-purple-100 text-purple-700' :
                          selectedProject.scalability === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }>
                          {selectedProject.scalability === 'high' ? t.veryHigh : selectedProject.scalability === 'medium' ? t.medium : t.limited}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">{t.techComplexity}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-4 h-4 ${s <= selectedProject.complexity ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
