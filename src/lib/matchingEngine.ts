import { BusinessModel, businessDB } from '../data/businessDB';

export interface UserPreferences {
  capital: number;
  type: string;
  riskLevel: 'low' | 'medium' | 'high';
  experienceLevel: number; // 1-5
  growthAmbition: 'low' | 'medium' | 'high';
  interests: string;
}

export function getTopMatches(prefs: UserPreferences): BusinessModel[] {
  const { capital, type, riskLevel, experienceLevel, growthAmbition, interests } = prefs;
  
  // 1. Hard Filter: Capital and Type
  const filtered = businessDB.filter(
    (b) => capital >= b.minCapital && b.type === type
  );

  // Helper function to calculate score and match percentage
  const calculateScoreAndMatch = (business: BusinessModel, isRelaxed: boolean = false) => {
    let score = isRelaxed ? 50 : 0;
    let matchPoints = 100; // Start with 100% match

    // Factor A: Capital Proximity (0-40 points)
    // How well the user's capital covers the project's range
    const midpoint = (business.minCapital + business.maxCapital) / 2;
    const capDiff = Math.abs(capital - midpoint) / midpoint;
    const capPenalty = Math.min(capDiff * 40, 40);
    score += capPenalty;
    matchPoints -= capPenalty * 0.5; // Up to 20% penalty for capital mismatch

    // Factor B: Risk Alignment (0-30 points)
    const riskMap = { low: 0, medium: 1, high: 2 };
    const riskDiff = Math.abs(riskMap[riskLevel] - riskMap[business.riskLevel]);
    const riskPenalty = riskDiff * 15;
    score += riskPenalty;
    matchPoints -= riskPenalty * 0.5; // Up to 15% penalty for risk mismatch

    // Factor C: Complexity vs Experience (0-30 points)
    // If business is too complex for user's experience, increase score (penalty)
    const complexityPenalty = Math.max(0, business.complexity - experienceLevel) * 10;
    const cappedComplexityPenalty = Math.min(complexityPenalty, 30);
    score += cappedComplexityPenalty;
    matchPoints -= cappedComplexityPenalty * 0.5; // Up to 15% penalty for complexity

    // Factor D: Growth Ambition Alignment (0-20 points)
    const growthMap = { low: 0, medium: 1, high: 2 };
    const growthDiff = Math.abs(growthMap[growthAmbition] - growthMap[business.scalability]);
    const growthPenalty = growthDiff * 10;
    score += growthPenalty;
    matchPoints -= growthPenalty * 0.5; // Up to 10% penalty for growth mismatch

    // Factor E: Success Rate (Bonus: -20 points)
    // Higher success rate reduces the score (better)
    const successBonus = (business.successRate / 100) * 20;
    score -= successBonus;
    matchPoints += successBonus * 0.25; // Up to 5% bonus for high success rate

    // Factor F: Interest Matching (Bonus: -40 points)
    const userInterests = interests.toLowerCase().split(/[،, ]+/).filter(i => i.length > 1);
    const matchCount = business.tags.filter(tag => 
      userInterests.some(ui => tag.toLowerCase().includes(ui) || ui.includes(tag.toLowerCase()))
    ).length;
    const interestBonus = Math.min(matchCount * 15, 40);
    score -= interestBonus;
    matchPoints += interestBonus * 0.5; // Up to 20% bonus for interest match

    if (isRelaxed) {
      matchPoints -= 15; // Flat penalty for relaxed filter
    }

    // Ensure match percentage is between 50% and 99%
    const finalMatchPercentage = Math.max(50, Math.min(99, Math.round(matchPoints)));

    return { 
      business: { ...business, matchPercentage: finalMatchPercentage }, 
      score 
    };
  };

  // 2. Scoring Algorithm (Lower score is better)
  const scored = filtered.map((business) => calculateScoreAndMatch(business));

  // Sort by score (ascending)
  scored.sort((a, b) => a.score - b.score);

  // If we have fewer than 3 matches after hard filter, try to relax the filter slightly
  if (scored.length < 3) {
    const relaxed = businessDB.filter(
      (b) => !filtered.includes(b) && capital >= b.minCapital * 0.8
    ).map(business => calculateScoreAndMatch(business, true));
    
    scored.push(...relaxed);
    scored.sort((a, b) => a.score - b.score);
  }

  return scored.slice(0, 3).map((item) => item.business);
}
