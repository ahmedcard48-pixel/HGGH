import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { 
  Briefcase, Search, Bell, LayoutDashboard, Lightbulb, 
  PieChart, Settings, Rocket, ArrowRight, ChevronRight,
  Target, ShieldAlert, Store, Globe, CheckCircle2, Circle,
  TrendingUp, AlertTriangle, Clock, Users, BarChart3, ListChecks,
  Truck, Building2, Wallet, Star, Zap, Info, Languages, Menu, X
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { GoogleGenAI, Type } from "@google/genai";
import { aiService } from '../services/aiService';
import { generateContentCached } from '../lib/geminiCache';
import { BusinessModel } from '../data/businessDB';
import { getTopMatches } from '../lib/matchingEngine';
import { calculateAllocation } from '../lib/financialCalc';
import { ProjectCarousel } from '../components/dashboard/ProjectCarousel';
import { ProjectDetail } from '../components/dashboard/ProjectDetail';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme, ThemeColor, BorderRadius, BackgroundType, FontFamily, ThemeSettings } from '../context/ThemeContext';
import { DynamicBackground } from '../components/dashboard/DynamicBackground';
import { SettingsPanel } from '../components/dashboard/SettingsPanel';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import { Palette, Layers, RefreshCcw, Moon, Sun } from 'lucide-react';

export default function DashboardPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, resetSettings, primaryColorHex, colors } = useTheme();
  const t: Record<string, string> = translations[language as 'ar' | 'en' | 'fr'];

  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<BusinessModel[]>([]);
  const [selectedProject, setSelectedProject] = useState<BusinessModel | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'empty' | 'grid' | 'detail' | 'financials' | 'settings'>('empty');
  const [activeDetailTab, setActiveDetailTab] = useState<'branding' | 'sourcing' | 'legal' | 'financial' | 'market' | 'roadmap' | 'growth' | 'actionPlan' | 'consultant' | 'mastermind' | 'marketPulse' | 'pitch' | 'brandingAI'>('branding');
  const [actionPlan, setActionPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [consultantMessages, setConsultantMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [consultantInput, setConsultantInput] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [mastermindAnalysis, setMastermindAnalysis] = useState<string | null>(null);
  const [isMasterminding, setIsMasterminding] = useState(false);
  const [marketPulse, setMarketPulse] = useState<string | null>(null);
  const [isPulseLoading, setIsPulseLoading] = useState(false);
  const [pitch, setPitch] = useState<string | null>(null);
  const [isPitchLoading, setIsPitchLoading] = useState(false);
  const [brandingAI, setBrandingAI] = useState<any>(null);
  const [isBrandingLoading, setIsBrandingLoading] = useState(false);
  const [growthStrategy, setGrowthStrategy] = useState<string | null>(null);
  const [isGrowthLoading, setIsGrowthLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getAIInstance = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(t.apiKeyMissing);
    }
    return new GoogleGenAI({ apiKey });
  };

  const getLanguageName = (lang: string) => {
    switch(lang) {
      case 'en': return 'English';
      case 'fr': return 'French';
      default: return 'Arabic';
    }
  };

  const regenerateIdeas = async () => {
    if (!user) return;
    setIsRegenerating(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const prompt = `
        Generate 3 unique and highly profitable business ideas for a user in Algeria with the following comprehensive profile:
        - Name: ${user.name}
        - Capital: ${user.capital} DZD
        - Location: ${user.location}
        - Activity Type: ${user.activityType} (${user.activityTypeDetails || 'No additional details'})
        - Risk Tolerance: ${user.riskLevel} (${user.riskLevelDetails || 'No additional details'})
        - Experience Level: ${user.experienceLevel}/5 (${user.experienceDetails || 'No additional details'})
        - Growth Ambition: ${user.growthAmbition} (${user.growthDetails || 'No additional details'})
        - Time Commitment: ${user.timeCommitment} (${user.timeDetails || 'No additional details'})
        - Skills & Expertise: ${(user.skills || []).join(', ')} (Other: ${user.otherSkills || 'None'})
        - Preferred Industries: ${(user.preferredIndustries || []).join(', ')} (Other: ${user.otherIndustries || 'None'})
        - Available Assets: ${(user.assets || []).join(', ')} (Other: ${user.otherAssets || 'None'})
        - Market Knowledge: ${user.marketKnowledge || 'N/A'}
        - Unique Value Proposition: ${user.uniqueValue || 'N/A'}
        - Legal Status: ${user.legalStatus || 'N/A'}
        - Interests & Passion: ${user.interests || 'N/A'}

        The ideas must be realistic for the Algerian market in 2026, taking into account the user's specific skills, available assets, and their personal analysis of the local market.
        Provide detailed information for each idea including financials, market analysis, and branding.
        Respond in JSON format following the BusinessModel interface.
        All text content (title, description, etc.) should be in ${langName}.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are an expert business strategist for the Algerian market. Provide concise, high-quality, and actionable business ideas. Avoid unnecessary filler. Ensure the JSON output is perfectly formatted and all text is in professional ${langName}.`,
          temperature: 0.7,
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

      const data = JSON.parse(aiResponse.text || "[]");
      if (Array.isArray(data)) {
        setMatches(data);
        localStorage.setItem('economine_matches', JSON.stringify(data));
        if (data.length > 0) {
          setViewMode('grid');
        }
      } else {
        throw new Error(t.aiResponseInvalid);
      }
    } catch (error: any) {
      console.error('Error regenerating ideas:', error);
      setError(error.message || t.errorGeneratingIdeas);
    } finally {
      setIsRegenerating(false);
    }
  };

  const generateActionPlan = async () => {
    if (!selectedProject) return;
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const prompt = `
        Generate a comprehensive and highly detailed action plan for a business named "${selectedProject.title}" in Algeria.
        User Capital: ${user.capital} DZD.
        Project Context: ${selectedProject.description}.
        
        The plan must be extremely specific to the Algerian market (2026 context), including:
        1. Branding: A unique store name, specific social media strategy for Algeria (Facebook, Instagram, TikTok), and a localized marketing strategy.
        2. Sourcing & Legal: Specific wholesale sources in Algeria (e.g., El Hamiz, Eulma, or local manufacturers), and a complete legal checklist (CNRC, tax ID, health permits).
        3. Capital Allocation: A precise breakdown of how to spend the ${user.capital} DZD, with detailed explanations for each category (Rent, Equipment, Raw Materials/Inventory).
        4. Financial Projections: Estimated monthly revenue in DZD, break-even point in months, and ROI in months.
        
        Ensure the output is professional, actionable, and accurate.
        All text content should be in ${langName}.
      `;
      
      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are a senior business consultant specializing in the Algerian market. Provide concise, high-quality, and actionable business plans. Avoid unnecessary filler. Ensure the JSON output is perfectly formatted and all text is in professional ${langName}.`,
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              branding: {
                type: Type.OBJECT,
                properties: {
                  storeName: { type: Type.STRING },
                  socialMediaHandles: { type: Type.ARRAY, items: { type: Type.STRING } },
                  marketingStrategy: { type: Type.STRING },
                  influencerTypes: { type: Type.STRING }
                },
                required: ["storeName", "socialMediaHandles", "marketingStrategy", "influencerTypes"]
              },
              sourcingAndLegal: {
                type: Type.OBJECT,
                properties: {
                  wholesaleSources: { type: Type.STRING },
                  legalChecklist: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["wholesaleSources", "legalChecklist"]
              },
              capitalAllocation: {
                type: Type.OBJECT,
                properties: {
                  rent: { type: Type.NUMBER },
                  equipment: { type: Type.NUMBER },
                  rawMaterials: { type: Type.NUMBER },
                  explanation: { type: Type.STRING }
                },
                required: ["rent", "equipment", "rawMaterials", "explanation"]
              },
              financialProjections: {
                type: Type.OBJECT,
                properties: {
                  estimatedMonthlyRevenue: { type: Type.NUMBER },
                  breakEvenMonths: { type: Type.NUMBER },
                  roiMonths: { type: Type.NUMBER }
                },
                required: ["estimatedMonthlyRevenue", "breakEvenMonths", "roiMonths"]
              }
            },
            required: ["branding", "sourcingAndLegal", "capitalAllocation", "financialProjections"]
          }
        }
      });

      const data = JSON.parse(aiResponse.text || "{}");
      setActionPlan(data);
      
      // Update selectedProject with new financial data if present
      if (data.financialProjections) {
        setSelectedProject(prev => prev ? {
          ...prev,
          detailedFinancials: {
            ...prev.detailedFinancials,
            estimatedMonthlyRevenue: data.financialProjections.estimatedMonthlyRevenue,
            breakEvenMonths: data.financialProjections.breakEvenMonths
          },
          roiMonths: data.financialProjections.roiMonths
        } : prev);
      }
      
      setActiveDetailTab('actionPlan');
    } catch (error: any) {
      console.error('Error generating action plan:', error);
      setError(error.message || t.errorGeneratingActionPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  const getMarketPulse = async () => {
    if (!selectedProject) return;
    setIsPulseLoading(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const prompt = `
        Analyze the current market sentiment in Algeria for the following business idea: ${selectedProject.title}.
        Context: ${selectedProject.description}.
        
        Provide a comprehensive "Market Pulse" report including:
        1. Current Trend Score (1-10) with a detailed justification.
        2. In-depth Consumer Demand Analysis in Algeria (specific demographics and behaviors).
        3. Critical Economic Factors (inflation, import/export rules, local manufacturing incentives) affecting this specific business in 2026.
        4. A "Golden Strategic Tip" for 2026 to gain a competitive edge.
        
        Respond in professional ${langName}. Ensure the analysis is data-driven and accurate.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are a leading market analyst for the Algerian economy. Provide deep, accurate, and concise market insights. Respond in professional ${langName}.`,
          temperature: 0.7,
        }
      });

      setMarketPulse(aiResponse.text || "");
      setActiveDetailTab('marketPulse');
    } catch (error: any) {
      console.error('Error getting market pulse:', error);
      setError(error.message || t.errorFetchingMarketPulse);
    } finally {
      setIsPulseLoading(false);
    }
  };

  const generatePitch = async () => {
    if (!selectedProject) return;
    setIsPitchLoading(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const prompt = `
        Create a professional and highly persuasive 1-minute elevator pitch for the following business: ${selectedProject.title}.
        Target: Potential Algerian Investors, Partners, or Bank Loan Officers (ANADE/ANGEM context).
        User Capital: ${user.capital} DZD.
        
        Structure:
        1. The Hook: A compelling problem statement relevant to the Algerian market.
        2. The Solution: How this business uniquely solves the problem.
        3. The Market Opportunity: Specific data or trends in Algeria that support this.
        4. The Financial Ask/ROI: Clear financial projections and what is needed from the partner.
        5. The Call to Action: A strong closing statement.
        
        Respond in professional ${langName}, using a tone that inspires confidence and accuracy.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are an expert pitch coach and business developer. Create a professional, persuasive, and concise elevator pitch in ${langName}.`,
          temperature: 0.7,
        }
      });

      setPitch(aiResponse.text || "");
      setActiveDetailTab('pitch');
    } catch (error: any) {
      console.error('Error generating pitch:', error);
      setError(error.message || t.errorGeneratingPitch);
    } finally {
      setIsPitchLoading(false);
    }
  };

  const getBrandingAI = async () => {
    if (!selectedProject) return;
    setIsBrandingLoading(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const prompt = `
        Generate a comprehensive and accurate branding guide for: ${selectedProject.title}.
        Target Audience: Algerian Consumers.
        
        Provide:
        1. 5 Creative Name Ideas (with deep meanings and cultural relevance in Algeria).
        2. Recommended Color Palette (Hex codes with psychological and cultural justifications).
        3. Typography Style (Specific font types like Modern Kufi, Sans-serif, etc., and why).
        4. Brand Voice/Personality (e.g., Trustworthy, Innovative, Traditional, Friendly).
        5. 5 Slogan Ideas (in catchy and professional Arabic/Darija).
        
        Respond in JSON format. All text content should be in ${langName}.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are a professional brand strategist. Provide a comprehensive, accurate, and concise branding guide. Avoid unnecessary filler. Ensure the JSON output is perfectly formatted and all text is in professional ${langName}.`,
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              names: { type: Type.ARRAY, items: { 
                type: Type.OBJECT, 
                properties: { name: { type: Type.STRING }, meaning: { type: Type.STRING } } 
              } },
              colors: { type: Type.ARRAY, items: { 
                type: Type.OBJECT, 
                properties: { hex: { type: Type.STRING }, reason: { type: Type.STRING } } 
              } },
              typography: { type: Type.STRING },
              voice: { type: Type.STRING },
              slogans: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });

      const data = JSON.parse(aiResponse.text || "{}");
      setBrandingAI(data);
      setActiveDetailTab('brandingAI');
    } catch (error: any) {
      console.error('Error getting branding AI:', error);
      setError(error.message || t.errorGeneratingBranding);
    } finally {
      setIsBrandingLoading(false);
    }
  };

  const getGrowthStrategy = async () => {
    if (!selectedProject) return;
    setIsGrowthLoading(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const prompt = `
        Provide a comprehensive and highly accurate 3-stage growth strategy for: ${selectedProject.title}.
        Focus on the Algerian market and economic landscape in 2026.
        
        Stages:
        1. Optimization & Local Foundation (Months 1-6): Focus on efficiency and local market penetration.
        2. Expansion & Regional Presence (Months 6-12): Specific Algerian cities or regions for expansion (e.g., Oran, Constantine, Sétif, Hassi Messaoud) with reasons.
        3. Scaling & Market Leadership (Year 2+): Digital transformation, franchising, or export opportunities.
        
        Include specific KPIs and milestones for each stage.
        Respond in professional ${langName}.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are a senior business growth strategist. Provide a comprehensive, accurate, and concise localized growth strategy for the Algerian market. Avoid unnecessary filler. Respond in professional ${langName}.`,
          temperature: 0.7,
        }
      });

      setGrowthStrategy(aiResponse.text || "");
      setActiveDetailTab('growth');
    } catch (error: any) {
      console.error('Error getting growth strategy:', error);
      setError(error.message || t.errorGeneratingGrowthStrategy);
    } finally {
      setIsGrowthLoading(false);
    }
  };

  const runMastermind = async () => {
    if (!selectedProject) return;
    setIsMasterminding(true);
    setError(null);
    
    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      // Get algorithm-based matches
      const matches = getTopMatches(user);
      
      const prompt = `
        You are the AI Mastermind for ECONOMINE, an Algerian business platform.
        Analyze the user's current project: ${JSON.stringify(selectedProject)}.
        User Profile: ${JSON.stringify(user)}.
        Algorithm-based top matches: ${JSON.stringify(matches)}.
        
        Provide a comprehensive, accurate, and strategic "Mastermind Analysis" including:
        1. A critical and deep assessment of the current project's viability in the current Algerian economic climate.
        2. A "Next Best Action" plan that reconciles the algorithm's matches with the user's current project and profile.
        3. A high-priority Risk Alert based on a deep SWOT analysis, with specific mitigation strategies.
        
        Ensure the tone is professional, direct, and highly strategic. Respond in professional ${langName}.
      `;

      const aiResponse = await generateContentCached(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are the ultimate business mastermind. Provide deep, accurate, concise, and comprehensive strategic analysis for the Algerian market. Avoid unnecessary filler. Respond in professional ${langName}.`,
          temperature: 0.7,
        }
      });

      setMastermindAnalysis(aiResponse.text || "");
      setActiveDetailTab('mastermind');
    } catch (error: any) {
      console.error('Error running mastermind:', error);
      setError(error.message || t.errorRunningMastermind);
    } finally {
      setIsMasterminding(false);
    }
  };

  const askConsultant = async () => {
    if (!consultantInput.trim() || !selectedProject) return;
    
    const userMessage = { role: 'user' as const, content: consultantInput };
    setConsultantMessages(prev => [...prev, userMessage]);
    setConsultantInput('');
    setIsConsulting(true);
    setError(null);

    try {
      const ai = getAIInstance();
      const langName = getLanguageName(language);
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `You are a highly professional and experienced business consultant for ECONOMINE, an Algerian platform. 
          You are helping the user with their project: ${selectedProject.title}.
          Project Description: ${selectedProject.description}.
          User Profile: ${JSON.stringify(user)}.
          Provide concise, high-quality, practical, and localized advice for the Algerian market. Avoid unnecessary filler.
          Always maintain a professional, encouraging, and strategic tone.
          Respond in professional ${langName}.`,
          temperature: 0.7,
        },
      });

      const response = await chat.sendMessage({ message: consultantInput });
      const assistantMessage = { role: 'assistant' as const, content: response.text || "" };
      setConsultantMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error consulting AI:', error);
      setError(error.message || t.errorContactingConsultant);
      const errorMessage = { role: 'assistant' as const, content: t.consultantErrorMessage };
      setConsultantMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsConsulting(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('economine_user');
    const matchesStr = localStorage.getItem('economine_matches');
    
    if (!userStr) {
      navigate('/onboarding');
      return;
    }
    
    setUser(JSON.parse(userStr));
    
    if (matchesStr) {
      const parsedMatches = JSON.parse(matchesStr);
      setMatches(parsedMatches);
      if (parsedMatches.length > 0) {
        setViewMode('grid');
      } else {
        setViewMode('empty');
      }
    } else {
      setViewMode('empty');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('economine_user');
    localStorage.removeItem('economine_matches');
    navigate('/');
  };

  const viewProjectDetails = (project: BusinessModel) => {
    setSelectedProject(project);
    setViewMode('detail');
    setActiveDetailTab('branding');
  };

  if (!user) return null;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'projects', label: t.projects, icon: Lightbulb },
    { id: 'financials', label: t.financials, icon: PieChart },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const renderFinancialChart = () => {
    if (!selectedProject || !user.capital) return null;
    
    const allocation = calculateAllocation(user.capital, selectedProject.financialRatios);
    const data = [
      { name: t.rentAndSetup, value: allocation.rent, color: primaryColorHex },
      { name: t.equipmentAndTools, value: allocation.equipment, color: '#10b981' },
      { name: t.initialInventory, value: allocation.inventory, color: '#f59e0b' },
      { name: t.workingCapital, value: allocation.buffer, color: '#8b5cf6' },
    ];

    return (
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toLocaleString()} DZD`} />
            <Legend layout="vertical" verticalAlign="middle" align="left" />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm px-3 py-1 rounded-full">{t.lowRisk}</Badge>;
      case 'medium': return <Badge className="shadow-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex, borderColor: `${primaryColorHex}40` }}>{t.mediumRisk}</Badge>;
      case 'high': return <Badge className="bg-rose-100 text-rose-700 border-rose-200 shadow-sm px-3 py-1 rounded-full">{t.highRisk}</Badge>;
      default: return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'physical': return (
        <Badge className="bg-slate-100 text-slate-700 border-slate-200 shadow-sm px-3 py-1 rounded-full flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5" />
          {t.physicalProject}
        </Badge>
      );
      case 'ecommerce': return (
        <Badge className="shadow-sm px-3 py-1 rounded-full flex items-center gap-1.5" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex, borderColor: `${primaryColorHex}40` }}>
          <Globe className="w-3.5 h-3.5" />
          {t.ecommerceProject}
        </Badge>
      );
      default: return null;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'low': return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm px-3 py-1 rounded-full">{t.lowImpact}</Badge>;
      case 'medium': return <Badge className="bg-blue-100 text-blue-700 border-blue-200 shadow-sm px-3 py-1 rounded-full">{t.mediumImpact}</Badge>;
      case 'high': return <Badge className="bg-amber-100 text-amber-700 border-amber-200 shadow-sm px-3 py-1 rounded-full">{t.highImpact}</Badge>;
      default: return null;
    }
  };

  const isRTL = language === 'ar';

  const glassCardStyle = {
    backgroundColor: settings.darkMode 
      ? `rgba(15, 23, 42, var(--glass-opacity))` 
      : `rgba(255, 255, 255, var(--glass-opacity))`,
    backdropFilter: `blur(var(--glass-blur)) saturate(1.5)`,
    borderRadius: `var(--border-radius)`,
    border: `1px solid ${settings.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
    boxShadow: settings.darkMode 
      ? `0 8px 32px 0 rgba(0, 0, 0, 0.3)` 
      : `0 8px 32px 0 rgba(31, 38, 135, 0.07)`,
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <DynamicBackground />
      {/* Top Navbar */}
      <header 
        className="h-14 sm:h-16 border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm transition-all duration-500"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${settings.glassOpacity / 100})`,
          backdropFilter: `blur(${settings.backgroundBlur}px)`
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            className="lg:hidden p-1.5 -ml-1 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
          <div 
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white shadow-md"
            style={{ backgroundColor: primaryColorHex, boxShadow: `0 4px 6px -1px ${primaryColorHex}40` }}
          >
            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 hidden xs:block">ECONOMINE</span>
        </div>
        
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <Input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="ps-10 bg-slate-100 border-transparent focus:bg-white rounded-full h-10"
              style={{ '--tw-ring-color': primaryColorHex } as any}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setActiveTab('settings');
                setViewMode('settings');
              }}
              className="text-slate-500 rounded-xl"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = primaryColorHex;
                e.currentTarget.style.backgroundColor = `${primaryColorHex}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <Palette className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline text-xs font-semibold">{t.uiCustomization}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setLanguage('ar')} className={language === 'ar' ? 'font-bold' : ''}>AR</Button>
            <Button variant="ghost" size="sm" onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</Button>
            <Button variant="ghost" size="sm" onClick={() => setLanguage('fr')} className={language === 'fr' ? 'font-bold' : ''}>FR</Button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className="h-8 w-8 text-slate-500 dark:text-slate-400"
            >
              {settings.darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          
          <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
              style={{ background: `linear-gradient(to bottom right, ${primaryColorHex}, #10b981)` }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-sm font-semibold hidden sm:block">{user.name || t.user}</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hidden sm:flex">
            {t.logout}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`
            fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 border-${isRTL ? 'l' : 'r'} border-slate-200 flex flex-col py-6 transition-all duration-300 ease-in-out lg:static lg:translate-x-0
            ${isMobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}
          `}
          style={{ 
            backgroundColor: `rgba(255, 255, 255, ${settings.glassOpacity / 100})`,
            backdropFilter: `blur(${settings.backgroundBlur}px)`
          }}
        >
          <div className="flex items-center justify-between px-6 mb-6 lg:hidden">
            <span className="text-xl font-bold tracking-tight text-slate-900">ECONOMINE</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'projects' || item.id === 'dashboard') {
                    setViewMode(matches.length > 0 ? 'grid' : 'empty');
                  } else if (item.id === 'financials') {
                    setViewMode('financials');
                  } else if (item.id === 'settings') {
                    setViewMode('settings');
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                style={activeTab === item.id ? { backgroundColor: `${primaryColorHex}15`, color: primaryColorHex, border: `1px solid ${primaryColorHex}30` } : {}}
              >
                <item.icon 
                  className={`h-5 w-5`} 
                  style={activeTab === item.id ? { color: primaryColorHex } : { color: '#94a3b8' }}
                />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 mt-auto">
            <div 
              className="rounded-2xl p-5 text-white shadow-2xl relative overflow-hidden group"
              style={{ background: `linear-gradient(to bottom right, #0f172a, ${primaryColorHex})` }}
            >
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-24 h-24" />
              </div>
              <div className="absolute -left-4 -top-4 opacity-10">
                <Target className="w-24 h-24" />
              </div>
              <h4 className="font-bold mb-1 relative z-10 opacity-80" style={{ color: `${primaryColorHex}40` === primaryColorHex ? '#bfdbfe' : 'white' }}>{t.currentCapital}</h4>
              <p className="text-2xl font-bold mb-4 relative z-10 tracking-tight" style={{ color: primaryColorHex === '#10b981' ? '#34d399' : '#10b981' }}>{user.capital?.toLocaleString()} {t.currency}</p>
              <Button size="sm" onClick={() => navigate('/onboarding')} className="w-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 relative z-10 rounded-xl font-bold border border-white/20 transition-all">
                {t.editBudget}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-32 lg:pb-8 transition-colors duration-500 ${settings.backgroundType !== 'minimal' ? 'bg-transparent' : 'bg-slate-50/50'}`}>
          
          {/* Mobile FAB for Generate */}
          {viewMode === 'grid' && (
            <div className="lg:hidden fixed bottom-20 right-6 z-30">
              <Button 
                onClick={regenerateIdeas} 
                disabled={isRegenerating}
                className="w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center p-0"
                style={{ backgroundColor: primaryColorHex, boxShadow: `0 10px 25px -5px ${primaryColorHex}80` }}
              >
                <Zap className={`w-6 h-6 ${isRegenerating ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
          )}
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

          
          {viewMode === 'empty' && (
            <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-inner mb-2"
                style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}
              >
                <Rocket className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">{t.startJourney}</h2>
                <p className="text-slate-500 text-lg">
                  {t.startJourneyDesc}
                </p>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate('/onboarding')}
                className="h-14 px-8 rounded-2xl text-white shadow-lg font-bold transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColorHex, boxShadow: `0 10px 15px -3px ${primaryColorHex}40` }}
              >
                {t.startAssessment}
                <ArrowRight className="mr-2 w-5 h-5 rtl:rotate-180" />
              </Button>
            </div>
          )}

          {viewMode === 'grid' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm" style={glassCardStyle}>
                <div 
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"
                  style={{ backgroundColor: `${primaryColorHex}20` }}
                ></div>
                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-1">{t.suggestedProjects}</h2>
                    <p className="text-slate-500 text-lg">{t.basedOnCapital} <span className="font-bold" style={{ color: primaryColorHex }}>({user.capital?.toLocaleString()} {t.currency})</span> {t.andPreferences}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={regenerateIdeas} 
                      disabled={isRegenerating}
                      className="rounded-xl text-white font-bold shadow-lg h-12 px-6"
                      style={{ backgroundColor: primaryColorHex, boxShadow: `0 10px 15px -3px ${primaryColorHex}40` }}
                    >
                      <Zap className={`w-4 h-4 ml-2 ${isRegenerating ? 'animate-pulse' : ''}`} />
                      {isRegenerating ? t.generating : t.generateNewIdeas}
                    </Button>
                    <Button onClick={() => navigate('/onboarding')} variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-50 font-bold h-12 px-6">
                      {t.updatePreferences}
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI Mastermind Quick Tip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div 
                  className="md:col-span-2 p-4 rounded-2xl shadow-lg text-white flex items-center justify-between"
                  style={{ background: `linear-gradient(to right, #0f172a, ${primaryColorHex})` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90">{t.aiMastermindTip}</p>
                      <p className="font-bold">{t.ecommerceGrowth}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-white hover:bg-white/10 hidden sm:flex">
                    {t.exploreMore}
                  </Button>
                </div>
                
                <div className="p-4 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-center" style={glassCardStyle}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">{t.generalMarketPulse}</span>
                    <Badge className="border-none" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}>{t.veryPositive}</Badge>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    {[40, 60, 45, 70, 85, 65, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: primaryColorHex }}></div>
                    ))}
                  </div>
                </div>
              </div>

              <ProjectCarousel 
                matches={matches} 
                onViewDetails={viewProjectDetails} 
                getRiskBadge={getRiskBadge} 
                getTypeBadge={getTypeBadge}
              />
            </div>
          )}

          {viewMode === 'financials' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{t.financials}</h2>
                  <p className="text-slate-500">{t.financialOverviewDesc}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.totalCapital}</p>
                    <p className="font-bold text-slate-900">{user.capital?.toLocaleString()} {t.currency}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card style={glassCardStyle} className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-100 bg-slate-50/30">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" style={{ color: primaryColorHex }} />
                      {t.capitalAllocation}
                    </CardTitle>
                    <CardDescription>{selectedProject ? `${t.allocationFor} ${selectedProject.title}` : t.allocationForTopMatch}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8">
                    {matches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="h-64">
                          {(() => {
                            const project = selectedProject || matches[0];
                            const allocation = calculateAllocation(user.capital, project.financialRatios);
                            const data = [
                              { name: t.rentAndSetup, value: allocation.rent, color: primaryColorHex },
                              { name: t.equipmentAndTools, value: allocation.equipment, color: '#10b981' },
                              { name: t.initialInventory, value: allocation.inventory, color: '#f59e0b' },
                              { name: t.workingCapital, value: allocation.buffer, color: '#8b5cf6' },
                            ];
                            return (
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                  >
                                    {data.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} DZD`} />
                                </RechartsPieChart>
                              </ResponsiveContainer>
                            );
                          })()}
                        </div>
                        <div className="space-y-4">
                          {(() => {
                            const project = selectedProject || matches[0];
                            const allocation = calculateAllocation(user.capital, project.financialRatios);
                            const items = [
                              { label: t.rentAndSetup, value: allocation.rent, color: primaryColorHex },
                              { label: t.equipmentAndTools, value: allocation.equipment, color: '#10b981' },
                              { label: t.initialInventory, value: allocation.inventory, color: '#f59e0b' },
                              { label: t.workingCapital, value: allocation.buffer, color: '#8b5cf6' },
                            ];
                            return items.map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                  <span className="text-sm font-medium text-slate-600">{item.label}</span>
                                </div>
                                <span className="font-bold text-slate-900">{item.value.toLocaleString()} {t.currency}</span>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-4">
                        <PieChart className="w-12 h-12 opacity-20" />
                        <p>{t.noDataAvailable}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card style={glassCardStyle} className="border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-100 bg-slate-50/30">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" style={{ color: primaryColorHex }} />
                      {t.profitProjections}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {matches.length > 0 ? (
                      <>
                        <div className="text-center p-6 rounded-2xl border" style={{ backgroundColor: `${primaryColorHex}10`, borderColor: `${primaryColorHex}20` }}>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: primaryColorHex }}>{t.estMonthlyProfit}</p>
                          <p className="text-3xl font-black" style={{ color: primaryColorHex }}>
                            {((selectedProject || matches[0]).detailedFinancials?.estimatedMonthlyRevenue || 0).toLocaleString()} {t.currency}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">{t.breakEvenPoint}</span>
                            <Badge variant="outline" className="font-bold">{(selectedProject || matches[0]).detailedFinancials?.breakEvenMonths || '0'} {t.months}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">{t.roiPotential}</span>
                            <Badge className="bg-blue-100 text-blue-700 border-none font-bold">{(selectedProject || matches[0]).roiMonths} {t.months}</Badge>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                          <p className="text-[10px] text-slate-400 italic leading-tight">{t.financialDisclaimer}</p>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 py-12">
                        <TrendingUp className="w-12 h-12 opacity-20" />
                        <p>{t.noDataAvailable}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}          {viewMode === 'settings' && (
            <SettingsPanel />
          )}

          {viewMode === 'detail' && selectedProject && (
            <ProjectDetail 
              selectedProject={selectedProject}
              user={user}
              generateActionPlan={generateActionPlan}
              isGenerating={isGenerating}
              activeDetailTab={activeDetailTab}
              setActiveDetailTab={setActiveDetailTab}
              runMastermind={runMastermind}
              isMasterminding={isMasterminding}
              mastermindAnalysis={mastermindAnalysis}
              askConsultant={askConsultant}
              consultantMessages={consultantMessages}
              consultantInput={consultantInput}
              setConsultantInput={setConsultantInput}
              isConsulting={isConsulting}
              actionPlan={actionPlan}
              renderFinancialChart={renderFinancialChart}
              getRiskBadge={getRiskBadge}
              getTypeBadge={getTypeBadge}
              getImpactBadge={getImpactBadge}
              getMarketPulse={getMarketPulse}
              isPulseLoading={isPulseLoading}
              marketPulse={marketPulse}
              generatePitch={generatePitch}
              isPitchLoading={isPitchLoading}
              pitch={pitch}
              getBrandingAI={getBrandingAI}
              isBrandingLoading={isBrandingLoading}
              brandingAI={brandingAI}
              getGrowthStrategy={getGrowthStrategy}
              isGrowthLoading={isGrowthLoading}
              growthStrategy={growthStrategy}
              onBack={() => setViewMode('grid')}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 px-2 flex justify-around items-center transition-all duration-500 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, 0.95)`,
          backdropFilter: `blur(10px)`,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)',
          paddingTop: '0.5rem'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (item.id === 'projects' || item.id === 'dashboard') {
                setViewMode(matches.length > 0 ? 'grid' : 'empty');
              } else if (item.id === 'financials') {
                setViewMode('financials');
              } else if (item.id === 'settings') {
                setViewMode('settings');
              }
            }}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all relative ${
              activeTab === item.id ? 'scale-110' : 'opacity-60 grayscale'
            }`}
            style={{ 
              color: activeTab === item.id ? primaryColorHex : '#64748b',
              backgroundColor: activeTab === item.id ? `${primaryColorHex}10` : 'transparent'
            }}
          >
            <item.icon 
              className={`h-5 w-5 ${activeTab === item.id ? 'animate-in zoom-in duration-300' : ''}`} 
            />
            <span className="text-[9px] uppercase font-bold tracking-tighter">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute -top-1 w-1 h-1 rounded-full"
                style={{ backgroundColor: primaryColorHex }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
