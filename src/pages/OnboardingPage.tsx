import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Wallet, MapPin, User, Store, Globe, Target, Star, TrendingUp, Zap, Rocket, ShieldAlert, Clock, ListChecks, Building2, Truck, AlertTriangle, Moon, Sun } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { generateContentCached } from '../lib/geminiCache';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';

const Guidance = ({ text, primaryColorHex }: { text: string, primaryColorHex: string }) => (
  <div 
    className="p-4 rounded-xl border flex items-start gap-3"
    style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}
  >
    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: primaryColorHex }} />
    <p className="text-sm leading-relaxed" style={{ color: primaryColorHex }}>{text}</p>
  </div>
);

export default function OnboardingPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, primaryColorHex } = useTheme();
  const t = translations[language];
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    location: '',
    activityType: 'physical',
    riskLevel: 'medium',
    experienceLevel: 3,
    growthAmbition: 'medium',
    interests: '',
    timeCommitment: 'full-time',
    skills: [] as string[],
    preferredIndustries: [] as string[],
    assets: [] as string[],
    // Manual details for smart analysis
    activityTypeDetails: '',
    riskLevelDetails: '',
    experienceDetails: '',
    growthDetails: '',
    timeDetails: '',
    otherSkills: '',
    otherIndustries: '',
    otherAssets: '',
    marketKnowledge: '',
    uniqueValue: '',
    legalStatus: 'none'
  });

  const totalSteps = 14;
  const progress = (step / totalSteps) * 100;
  const stepNames = [
    { name: t.personalInfo, icon: User },
    { name: t.capital, icon: Wallet },
    { name: t.activityType, icon: Store },
    { name: t.riskLevel, icon: ShieldAlert },
    { name: t.experienceLevel, icon: Star },
    { name: t.growthAmbition, icon: TrendingUp },
    { name: t.timeCommitment, icon: Clock },
    { name: t.skills, icon: ListChecks },
    { name: t.preferredIndustries, icon: Building2 },
    { name: t.availableAssets, icon: Truck },
    { name: t.marketKnowledge, icon: Globe },
    { name: t.competitiveAdvantage, icon: Zap },
    { name: t.legalStatus, icon: ShieldAlert },
    { name: t.interestsAndPassion, icon: Target }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleOnboarding = async () => {
    setLoading(true);
    setError(null);
    
    const capitalNum = parseInt(formData.capital) || 0;
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(t.apiKeyMissing);
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const userProfile = {
        ...formData,
        capital: capitalNum
      };

      const prompt = `
        Generate 3 unique and highly profitable business ideas for a user in Algeria with the following comprehensive profile:
        - Name: ${userProfile.name}
        - Capital: ${userProfile.capital} DZD
        - Location: ${userProfile.location}
        - Activity Type: ${userProfile.activityType} (${userProfile.activityTypeDetails || 'No additional details'})
        - Risk Tolerance: ${userProfile.riskLevel} (${userProfile.riskLevelDetails || 'No additional details'})
        - Experience Level: ${userProfile.experienceLevel}/5 (${userProfile.experienceDetails || 'No additional details'})
        - Growth Ambition: ${userProfile.growthAmbition} (${userProfile.growthDetails || 'No additional details'})
        - Time Commitment: ${userProfile.timeCommitment} (${userProfile.timeDetails || 'No additional details'})
        - Skills & Expertise: ${(userProfile.skills || []).join(', ')} (Other: ${userProfile.otherSkills || 'None'})
        - Preferred Industries: ${(userProfile.preferredIndustries || []).join(', ')} (Other: ${userProfile.otherIndustries || 'None'})
        - Available Assets: ${(userProfile.assets || []).join(', ')} (Other: ${userProfile.otherAssets || 'None'})
        - Market Knowledge: ${userProfile.marketKnowledge || 'N/A'}
        - Unique Value Proposition: ${userProfile.uniqueValue || 'N/A'}
        - Legal Status: ${userProfile.legalStatus || 'N/A'}
        - Interests & Passion: ${userProfile.interests || 'N/A'}

        The ideas must be realistic for the Algerian market in 2026, taking into account the user's specific skills, available assets, and their personal analysis of the local market.
        Provide detailed information for each idea including financials, market analysis, and branding.
        Respond in JSON format following the BusinessModel interface.
        All text content (title, description, etc.) should be in Arabic.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['physical', 'ecommerce'] },
                minCapital: { type: Type.NUMBER },
                maxCapital: { type: Type.NUMBER },
                riskLevel: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                complexity: { type: Type.INTEGER },
                skillLevelRequired: { type: Type.INTEGER },
                scalability: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                roiMonths: { type: Type.NUMBER },
                successRate: { type: Type.NUMBER },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                marketTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
                requiredExperience: { type: Type.STRING },
                requiredTools: { type: Type.ARRAY, items: { type: Type.STRING } },
                localRegulations: { type: Type.ARRAY, items: { type: Type.STRING } },
                seasonalTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
                environmentalImpact: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                branding: {
                  type: Type.OBJECT,
                  properties: {
                    suggestedNames: { type: Type.ARRAY, items: { type: Type.STRING } },
                    marketingStrategy: { type: Type.STRING }
                  }
                },
                sourcing: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      location: { type: Type.STRING },
                      contactType: { type: Type.STRING }
                    }
                  }
                },
                legalSteps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      task: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      cost: { type: Type.STRING }
                    }
                  }
                },
                financialRatios: {
                  type: Type.OBJECT,
                  properties: {
                    rent: { type: Type.NUMBER },
                    equipment: { type: Type.NUMBER },
                    inventory: { type: Type.NUMBER },
                    buffer: { type: Type.NUMBER }
                  }
                },
                marketAnalysis: {
                  type: Type.OBJECT,
                  properties: {
                    targetAudience: { type: Type.STRING },
                    competitors: { type: Type.STRING },
                    swot: {
                      type: Type.OBJECT,
                      properties: {
                        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                        threats: { type: Type.ARRAY, items: { type: Type.STRING } }
                      }
                    }
                  }
                },
                detailedFinancials: {
                  type: Type.OBJECT,
                  properties: {
                    fixedCosts: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          item: { type: Type.STRING },
                          cost: { type: Type.NUMBER }
                        }
                      }
                    },
                    variableCosts: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          item: { type: Type.STRING },
                          cost: { type: Type.NUMBER }
                        }
                      }
                    },
                    estimatedMonthlyRevenue: { type: Type.NUMBER },
                    breakEvenMonths: { type: Type.NUMBER }
                  }
                }
              },
              required: ["id", "title", "description", "type", "minCapital", "maxCapital", "riskLevel", "complexity", "skillLevelRequired", "scalability", "roiMonths", "successRate", "tags", "financialRatios", "marketAnalysis", "detailedFinancials", "branding", "marketTrends", "requiredExperience", "requiredTools", "localRegulations", "seasonalTrends", "sourcing", "legalSteps", "environmentalImpact"]
            }
          }
        }
      });

      const matches = JSON.parse(aiResponse.text || "[]");
      
      if (!Array.isArray(matches)) {
        throw new Error('AI response is not an array');
      }
      
      // Save user profile and matches to localStorage for the dashboard
      localStorage.setItem('economine_user', JSON.stringify({
        ...formData,
        capital: capitalNum
      }));
      localStorage.setItem('economine_matches', JSON.stringify(matches));
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error generating ideas:', error);
      setError(error.message || t.errorGeneratingIdeasDefault);
      
      // Fallback to static matches if AI fails
      try {
        const { getTopMatches } = await import('../lib/matchingEngine');
        const matches = getTopMatches({
          capital: capitalNum,
          type: formData.activityType,
          riskLevel: formData.riskLevel as 'low' | 'medium' | 'high',
          experienceLevel: formData.experienceLevel,
          growthAmbition: formData.growthAmbition as 'low' | 'medium' | 'high',
          interests: formData.interests
        });
        
        localStorage.setItem('economine_user', JSON.stringify({
          ...formData,
          capital: capitalNum
        }));
        localStorage.setItem('economine_matches', JSON.stringify(matches));
        
        // Wait a bit to show the error before navigating
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (fallbackError) {
        console.error('Fallback failed:', fallbackError);
        setError(t.fatalError);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.personalInfo}</h3>
              <p className="text-slate-500">{t.letsGetToKnowYou}</p>
            </div>
            
            <Guidance text={t.personalInfoGuidance} primaryColorHex={primaryColorHex} />

            <div className="space-y-3">
              <Label htmlFor="name" className="text-slate-700 font-semibold">{t.fullName}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder={t.fullNamePlaceholder} 
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="location" className="text-slate-700 font-semibold">{t.stateCity}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <Input 
                  id="location" 
                  type="text" 
                  placeholder={t.stateCityPlaceholder} 
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.capital}</h3>
              <p className="text-slate-500">{t.capitalDesc}</p>
            </div>

            <Guidance text={t.capitalGuidance} primaryColorHex={primaryColorHex} />

            <div className="space-y-3">
              <Label htmlFor="capital" className="text-slate-700 font-semibold">{t.capitalLabelOnboarding}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <Wallet className="h-5 w-5" />
                </div>
                <Input 
                  id="capital" 
                  type="number" 
                  placeholder={t.capitalPlaceholder} 
                  value={formData.capital}
                  onChange={(e) => updateFormData('capital', e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.activityType}</h3>
              <p className="text-slate-500">{t.activityTypeDesc}</p>
            </div>

            <Guidance text={t.activityTypeGuidance} primaryColorHex={primaryColorHex} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => updateFormData('activityType', 'physical')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 transition-all ${
                  formData.activityType === 'physical' 
                    ? 'shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                style={formData.activityType === 'physical' ? { borderColor: primaryColorHex, backgroundColor: `${primaryColorHex}10`, color: primaryColorHex } : {}}
              >
                <Store className={`h-10 w-10`} style={formData.activityType === 'physical' ? { color: primaryColorHex } : { color: '#94a3b8' }} />
                <span className="font-bold text-lg">{t.physicalProjectOnboarding}</span>
              </button>
              <button
                type="button"
                onClick={() => updateFormData('activityType', 'ecommerce')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 transition-all ${
                  formData.activityType === 'ecommerce' 
                    ? 'shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                style={formData.activityType === 'ecommerce' ? { borderColor: primaryColorHex, backgroundColor: `${primaryColorHex}10`, color: primaryColorHex } : {}}
              >
                <Globe className={`h-10 w-10`} style={formData.activityType === 'ecommerce' ? { color: primaryColorHex } : { color: '#94a3b8' }} />
                <span className="font-bold text-lg">{t.ecommerceOnboarding}</span>
              </button>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.activityTypeDetailsLabel}</Label>
              <Input 
                placeholder={t.activityTypeDetailsPlaceholder} 
                value={formData.activityTypeDetails}
                onChange={(e) => updateFormData('activityTypeDetails', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.riskLevel}</h3>
              <p className="text-slate-500">{t.riskLevelDesc}</p>
            </div>

            <Guidance text={t.riskLevelGuidance} primaryColorHex={primaryColorHex} />

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'low', label: t.riskLowOnboarding, color: '#10b981' },
                { id: 'medium', label: t.riskMediumOnboarding, color: primaryColorHex },
                { id: 'high', label: t.riskHighOnboarding, color: '#f43f5e' }
              ].map((risk) => (
                <button
                  key={risk.id}
                  type="button"
                  onClick={() => updateFormData('riskLevel', risk.id)}
                  className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    formData.riskLevel === risk.id 
                      ? `shadow-md` 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                  style={formData.riskLevel === risk.id ? { borderColor: risk.color, backgroundColor: `${risk.color}10`, color: risk.color } : {}}
                >
                  <div className={`w-4 h-4 rounded-full shadow-sm`} style={{ backgroundColor: risk.color }} />
                  <span className="font-bold text-lg">{risk.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.riskLevelDetailsLabel}</Label>
              <Input 
                placeholder={t.riskLevelDetailsPlaceholder} 
                value={formData.riskLevelDetails}
                onChange={(e) => updateFormData('riskLevelDetails', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.experienceLevel}</h3>
              <p className="text-slate-500">{t.experienceLevelDesc}</p>
            </div>
            
            <Guidance text={t.experienceLevelGuidance} primaryColorHex={primaryColorHex} />

            <div className="flex flex-col items-center gap-6 py-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => updateFormData('experienceLevel', star)}
                    className={`p-2 transition-all transform hover:scale-110 ${
                      formData.experienceLevel >= star ? 'text-amber-400' : 'text-slate-200'
                    }`}
                  >
                    <Star className="w-12 h-12 fill-current" />
                  </button>
                ))}
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-slate-700">
                  {formData.experienceLevel === 1 && t.expBeginner}
                  {formData.experienceLevel === 2 && t.expBasic}
                  {formData.experienceLevel === 3 && t.expIntermediate}
                  {formData.experienceLevel === 4 && t.expExpert}
                  {formData.experienceLevel === 5 && t.expProfessional}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.experienceDetailsLabel}</Label>
              <Input 
                placeholder={t.experienceDetailsPlaceholder} 
                value={formData.experienceDetails}
                onChange={(e) => updateFormData('experienceDetails', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div 
            key="step6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.growthAmbition}</h3>
              <p className="text-slate-500">{t.growthAmbitionDesc}</p>
            </div>
            
            <Guidance text={t.growthAmbitionGuidance} primaryColorHex={primaryColorHex} />

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'low', label: t.growthLowOnboarding, icon: Zap, color: '#10b981' },
                { id: 'medium', label: t.growthMediumOnboarding, icon: TrendingUp, color: primaryColorHex },
                { id: 'high', label: t.growthHighOnboarding, icon: Rocket, color: '#a855f7' }
              ].map((growth) => (
                <button
                  key={growth.id}
                  type="button"
                  onClick={() => updateFormData('growthAmbition', growth.id)}
                  className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    formData.growthAmbition === growth.id 
                      ? `shadow-md` 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                  style={formData.growthAmbition === growth.id ? { borderColor: growth.color, backgroundColor: `${growth.color}10`, color: growth.color } : {}}
                >
                  <growth.icon className={`w-8 h-8`} style={formData.growthAmbition === growth.id ? { color: growth.color } : { color: '#94a3b8' }} />
                  <span className="font-bold text-lg">{growth.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.growthDetailsLabel}</Label>
              <Input 
                placeholder={t.growthDetailsPlaceholder} 
                value={formData.growthDetails}
                onChange={(e) => updateFormData('growthDetails', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div 
            key="step7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.timeCommitment}</h3>
              <p className="text-slate-500">{t.timeCommitmentDesc}</p>
            </div>
            
            <Guidance text={t.timeCommitmentGuidance} primaryColorHex={primaryColorHex} />

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'part-time', label: t.timePartTime, icon: Clock },
                { id: 'full-time', label: t.timeFullTime, icon: Zap },
                { id: 'flexible', label: t.timeFlexible, icon: Rocket }
              ].map((time) => (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => updateFormData('timeCommitment', time.id)}
                  className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    formData.timeCommitment === time.id 
                      ? 'shadow-md' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                  style={formData.timeCommitment === time.id ? { borderColor: primaryColorHex, backgroundColor: `${primaryColorHex}10`, color: primaryColorHex } : {}}
                >
                  <time.icon className={`w-8 h-8`} style={formData.timeCommitment === time.id ? { color: primaryColorHex } : { color: '#94a3b8' }} />
                  <span className="font-bold text-lg">{time.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.timeDetailsLabel}</Label>
              <Input 
                placeholder={t.timeDetailsPlaceholder} 
                value={formData.timeDetails}
                onChange={(e) => updateFormData('timeDetails', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 8:
        return (
          <motion.div 
            key="step8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.skills}</h3>
              <p className="text-slate-500">{t.skillsDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[t.skillMarketing, t.skillSales, t.skillProgramming, t.skillDesign, t.skillManagement, t.skillCrafts, t.skillCooking, t.skillAccounting].map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    const newSkills = formData.skills.includes(skill)
                      ? formData.skills.filter(s => s !== skill)
                      : [...formData.skills, skill];
                    updateFormData('skills', newSkills);
                  }}
                  className={`p-4 rounded-xl border-2 font-bold transition-all ${
                    formData.skills.includes(skill)
                      ? 'text-white'
                      : 'border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                  style={formData.skills.includes(skill) ? { backgroundColor: primaryColorHex, borderColor: primaryColorHex } : {}}
                >
                  {skill}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.otherSkillsLabel}</Label>
              <Input 
                placeholder={t.otherSkillsPlaceholder} 
                value={formData.otherSkills}
                onChange={(e) => updateFormData('otherSkills', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 9:
        return (
          <motion.div 
            key="step9"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.preferredIndustries}</h3>
              <p className="text-slate-500">{t.preferredIndustriesDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[t.indTech, t.indFood, t.indClothing, t.indServices, t.indEducation, t.indHealth, t.indAgriculture, t.indTourism].map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => {
                    const newInds = formData.preferredIndustries.includes(ind)
                      ? formData.preferredIndustries.filter(i => i !== ind)
                      : [...formData.preferredIndustries, ind];
                    updateFormData('preferredIndustries', newInds);
                  }}
                  className={`p-4 rounded-xl border-2 font-bold transition-all ${
                    formData.preferredIndustries.includes(ind)
                      ? 'text-white'
                      : 'border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                  style={formData.preferredIndustries.includes(ind) ? { backgroundColor: primaryColorHex, borderColor: primaryColorHex } : {}}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.otherIndustriesLabel}</Label>
              <Input 
                placeholder={t.otherIndustriesPlaceholder} 
                value={formData.otherIndustries}
                onChange={(e) => updateFormData('otherIndustries', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 10:
        return (
          <motion.div 
            key="step10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.availableAssets}</h3>
              <p className="text-slate-500">{t.availableAssetsDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[t.assetCar, t.assetShop, t.assetOffice, t.assetComputer, t.assetWarehouse, t.assetMotorcycle, t.assetLand].map((asset) => (
                <button
                  key={asset}
                  type="button"
                  onClick={() => {
                    const newAssets = formData.assets.includes(asset)
                      ? formData.assets.filter(a => a !== asset)
                      : [...formData.assets, asset];
                    updateFormData('assets', newAssets);
                  }}
                  className={`p-4 rounded-xl border-2 font-bold transition-all ${
                    formData.assets.includes(asset)
                      ? 'text-white'
                      : 'border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                  style={formData.assets.includes(asset) ? { backgroundColor: primaryColorHex, borderColor: primaryColorHex } : {}}
                >
                  {asset}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.otherAssetsLabel}</Label>
              <Input 
                placeholder={t.otherAssetsPlaceholder} 
                value={formData.otherAssets}
                onChange={(e) => updateFormData('otherAssets', e.target.value)}
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
          </motion.div>
        );
      case 11:
        return (
          <motion.div 
            key="step11"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.marketKnowledge}</h3>
              <p className="text-slate-500">{t.marketKnowledgeDesc}</p>
            </div>
            
            <Guidance text={t.marketKnowledgeGuidance} primaryColorHex={primaryColorHex} />

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.marketAnalysisLabel}</Label>
              <textarea 
                placeholder={t.marketAnalysisPlaceholder} 
                value={formData.marketKnowledge}
                onChange={(e) => updateFormData('marketKnowledge', e.target.value)}
                className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-200 focus:ring-opacity-20 transition-all resize-none"
                style={{ 
                  '--tw-ring-color': primaryColorHex,
                  borderColor: 'var(--tw-ring-color)'
                } as React.CSSProperties}
              />
            </div>
          </motion.div>
        );
      case 12:
        return (
          <motion.div 
            key="step12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.competitiveAdvantage}</h3>
              <p className="text-slate-500">{t.competitiveAdvantageDesc}</p>
            </div>
            
            <Guidance text={t.competitiveAdvantageGuidance} primaryColorHex={primaryColorHex} />

            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">{t.uniqueStrengthsLabel}</Label>
              <textarea 
                placeholder={t.uniqueStrengthsPlaceholder} 
                value={formData.uniqueValue}
                onChange={(e) => updateFormData('uniqueValue', e.target.value)}
                className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-200 focus:ring-opacity-20 transition-all resize-none"
                style={{ 
                  '--tw-ring-color': primaryColorHex,
                  borderColor: 'var(--tw-ring-color)'
                } as React.CSSProperties}
              />
            </div>
          </motion.div>
        );
      case 13:
        return (
          <motion.div 
            key="step13"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.legalStatus}</h3>
              <p className="text-slate-500">{t.legalStatusDesc}</p>
            </div>
            
            <Guidance text={t.legalStatusGuidance} primaryColorHex={primaryColorHex} />

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'none', label: t.legalNone, icon: ShieldAlert },
                { id: 'ready', label: t.legalReady, icon: ListChecks },
                { id: 'in-progress', label: t.legalInProgress, icon: Clock }
              ].map((legal) => (
                <button
                  key={legal.id}
                  type="button"
                  onClick={() => updateFormData('legalStatus', legal.id)}
                  className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    formData.legalStatus === legal.id 
                      ? 'shadow-md' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                  style={formData.legalStatus === legal.id ? { borderColor: primaryColorHex, backgroundColor: `${primaryColorHex}10`, color: primaryColorHex } : {}}
                >
                  <legal.icon className={`w-8 h-8`} style={formData.legalStatus === legal.id ? { color: primaryColorHex } : { color: '#94a3b8' }} />
                  <span className="font-bold text-lg">{legal.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 14:
        return (
          <motion.div 
            key="step14"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">{t.interestsAndPassion}</h3>
              <p className="text-slate-500">{t.interestsAndPassionDesc}</p>
            </div>

            <Guidance text={t.interestsAndPassionGuidance} primaryColorHex={primaryColorHex} />

            <div className="space-y-3">
              <Label htmlFor="interests" className="text-slate-700 font-semibold">{t.interestsLabel}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <Target className="h-5 w-5" />
                </div>
                <Input 
                  id="interests" 
                  placeholder={t.interestsPlaceholder} 
                  value={formData.interests}
                  onChange={(e) => updateFormData('interests', e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>

            <div 
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 text-white rounded-xl shadow-md"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: primaryColorHex }}>{t.readyToStart}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: primaryColorHex }}>
                    {t.readyToStartDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex bg-slate-50 font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Right Side - Decorative (Hidden on mobile) */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: `linear-gradient(to bottom right, #0f172a, #1e293b, ${primaryColorHex}40)` }}
      >
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-lg text-white space-y-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
            <Wallet className="h-8 w-8" style={{ color: primaryColorHex }} />
          </div>
          <blockquote className="text-4xl font-bold leading-tight">
            "{t.onboardingQuote}"
          </blockquote>
          <p className="text-xl opacity-80" style={{ color: `${primaryColorHex}40` === primaryColorHex ? '#bfdbfe' : 'white' }}>
            {t.onboardingSubQuote}
          </p>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 md:p-16 lg:p-24 overflow-y-auto bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="absolute top-6 right-6 flex items-center gap-1 border-slate-200">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage('ar')} 
            className={`px-2 h-8 ${language === 'ar' ? 'font-bold' : 'text-slate-500'}`}
            style={{ color: language === 'ar' ? primaryColorHex : undefined }}
          >
            AR
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage('en')} 
            className={`px-2 h-8 ${language === 'en' ? 'font-bold' : 'text-slate-500'}`}
            style={{ color: language === 'en' ? primaryColorHex : undefined }}
          >
            EN
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage('fr')} 
            className={`px-2 h-8 ${language === 'fr' ? 'font-bold' : 'text-slate-500'}`}
            style={{ color: language === 'fr' ? primaryColorHex : undefined }}
          >
            FR
          </Button>
        </div>
        <div className="max-w-md w-full mx-auto space-y-8 mt-12">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                {React.createElement(stepNames[step - 1].icon, { className: "w-4 h-4" })}
                <span>{stepNames[step - 1].name}</span>
              </div>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className={`h-2 w-full bg-slate-100 rounded-full overflow-hidden flex ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: primaryColorHex }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setError(null)}
                className="mr-auto h-8 w-8 p-0 rounded-full hover:bg-red-100"
              >
                ×
              </Button>
            </div>
          )}

          {/* Form Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md pt-4 pb-6 sm:pb-0 sm:relative sm:bg-transparent sm:backdrop-blur-none flex gap-4 z-20">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="h-14 px-6 rounded-xl border-2 hover:bg-slate-50 text-slate-700 font-semibold"
              >
                {language === 'ar' ? <ChevronRight className="w-5 h-5 ml-2" /> : <ChevronLeft className="w-5 h-5 mr-2" />}
                {t.previous}
              </Button>
            )}

            {step < totalSteps ? (
              <Button 
                onClick={nextStep}
                className="flex-1 h-14 rounded-xl text-white shadow-lg font-semibold text-lg"
                style={{ backgroundColor: primaryColorHex }}
              >
                {t.next}
                {language === 'ar' ? <ChevronLeft className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 ml-2" />}
              </Button>
            ) : (
              <Button 
                onClick={handleOnboarding} 
                disabled={loading}
                className="flex-1 h-14 rounded-xl text-white shadow-lg font-semibold text-lg"
                style={{ backgroundColor: primaryColorHex }}
              >
                {loading ? t.generatingProjects : t.discoverProjects}
                {!loading && <Zap className={`w-5 h-5 animate-pulse ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />}
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
