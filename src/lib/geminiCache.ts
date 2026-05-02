import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse } from "@google/genai";

const CACHE_PREFIX = 'ai_cache_';

// Simple synchronous hash function for strings
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

export async function generateContentCached(
  ai: GoogleGenAI,
  params: GenerateContentParameters
): Promise<GenerateContentResponse> {
  // Create a deterministic cache key based on the prompt and config
  const cacheKey = CACHE_PREFIX + hashString(JSON.stringify(params));

  // Try to get from localStorage
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log('Using cached AI response to save API quota');
      const parsed = JSON.parse(cached);
      
      // Reconstruct a mock GenerateContentResponse
      return {
        text: parsed.text,
        functionCalls: parsed.functionCalls,
        candidates: parsed.candidates,
      } as GenerateContentResponse;
    }
  } catch (e) {
    console.warn('Failed to read from localStorage cache', e);
  }

  // If not cached, call the API
  console.log('Calling Gemini API (Not cached)');
  
  // Upgrade model to gemini-3-flash-preview for better efficiency if it was using older models
  if (params.model === 'gemini-2.5-flash' || params.model === 'gemini-1.5-flash') {
    params.model = 'gemini-3-flash-preview';
  }
  
  const response = await ai.models.generateContent(params);

  // Save to cache
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      text: response.text,
      functionCalls: response.functionCalls,
      candidates: response.candidates,
    }));
  } catch (e) {
    console.warn('Failed to write to localStorage cache (Quota exceeded?)', e);
    // If quota exceeded, try to clear old cache
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CACHE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      // Remove half of the cached items to free up space
      for (let i = 0; i < keysToRemove.length / 2; i++) {
        localStorage.removeItem(keysToRemove[i]);
      }
      // Try saving again
      localStorage.setItem(cacheKey, JSON.stringify({
        text: response.text,
        functionCalls: response.functionCalls,
        candidates: response.candidates,
      }));
    } catch (e2) {
      console.warn('Still failed to write to cache after cleanup', e2);
    }
  }

  return response;
}
