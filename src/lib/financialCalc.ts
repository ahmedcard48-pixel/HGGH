export function calculateAllocation(userCapital: number, ratios: { rent: number; equipment: number; inventory: number; buffer: number }) {
  // Allocate 10% strictly to a Contingency Fund (صندوق الطوارئ)
  const contingencyFund = userCapital * 0.10;
  
  // The remaining 90% is distributed according to the project's ratios
  const availableCapital = userCapital * 0.90;

  return {
    rent: availableCapital * ratios.rent,
    equipment: availableCapital * ratios.equipment,
    inventory: availableCapital * ratios.inventory,
    buffer: availableCapital * ratios.buffer,
    contingencyFund: contingencyFund,
  };
}
