import { GoogleGenAI, Type } from "@google/genai";
import { translations } from "../i18n/translations";
import { generateContentCached } from "../lib/geminiCache";

const getAIClient = (apiKey: string) => new GoogleGenAI({ apiKey });

const getSystemInstruction = (role: string, language: string) => {
  const instructions = {
    strategist: `You are an expert business strategist for the Algerian market. Provide concise, high-quality, and actionable business insights. Respond in professional ${language === 'ar' ? 'Arabic' : 'English'}.`,
    analyst: `You are a leading market analyst for the Algerian economy. Provide deep, accurate, and concise market insights. Respond in professional ${language === 'ar' ? 'Arabic' : 'English'}.`,
    brandStrategist: `You are a professional brand strategist. Provide a comprehensive, accurate, and concise branding guide. Respond in professional ${language === 'ar' ? 'Arabic' : 'English'}.`
  };
  return instructions[role as keyof typeof instructions];
};

export const aiService = {
  async generateBusinessIdeas(profile: any, language: string, responseSchema: any) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");
    const ai = getAIClient(apiKey);
    const langName = language === 'ar' ? 'Arabic' : 'English';

    const prompt = `Generate 3 unique, highly detailed, and profitable business ideas for a user in Algeria with this profile: ${JSON.stringify(profile)}.
    The ideas must be realistic for the Algerian market in 2026, taking into account the user's specific skills, available assets, and their personal analysis of the local market.
    
    CRITICAL INSTRUCTIONS:
    1. Every single field in the response schema MUST be populated with detailed, realistic, and relevant information.
    2. NEVER leave any field as an empty string, empty array, or null.
    3. For 'marketAnalysis', provide a deep dive into the target audience, specific competitors in the Algerian market, and a full SWOT analysis.
    4. For 'detailedFinancials', include a comprehensive list of fixed and variable costs, realistic monthly revenue based on the Algerian context (DZD), and a calculated break-even point.
    5. Ensure the 'branding' section includes creative names, meaningful slogans, and a cohesive color palette.
    6. All text content (title, description, etc.) should be in ${langName}.
    7. The projects must be viable and specific to the Algerian economic landscape (DZD currency, local regulations, sourcing).`;

    const response = await generateContentCached(ai, {
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction('strategist', language),
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse business ideas JSON", e);
      return [];
    }
  },

  async getMarketPulse(projectTitle: string, language: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");
    const ai = getAIClient(apiKey);

    const response = await generateContentCached(ai, {
      model: "gemini-3.1-pro-preview",
      contents: `Analyze the current Algerian market pulse for a project titled: ${projectTitle}. Keep it concise and insightful.`,
      config: {
        systemInstruction: getSystemInstruction('analyst', language),
        temperature: 0.7,
      }
    });

    return response.text || "";
  },

  async generateBranding(project: any, language: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");
    const ai = getAIClient(apiKey);

    const response = await generateContentCached(ai, {
      model: "gemini-3.1-pro-preview",
      contents: `Generate a full branding identity for: ${project.title}. Include names, slogans, color palette, voice, and typography. Respond in JSON.`,
      config: { 
        systemInstruction: getSystemInstruction('brandStrategist', language),
        temperature: 0.7,
        responseMimeType: "application/json" 
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      console.error("Failed to parse branding JSON", e);
      return {};
    }
  }
};
