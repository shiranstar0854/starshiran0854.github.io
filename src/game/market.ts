import { clamp, round1 } from "./policy";
import type { EconomyState } from "./types";

export function calculateMarket(previous: EconomyState, gdpGrowth: number, liquidityDelta: number, baseRate: number, badDebtRate: number) {
  const riskAppetite = clamp(previous.riskAppetite + gdpGrowth * 1.15 + liquidityDelta * 0.9 - badDebtRate * 1.1, 10, 90);
  const stockIndex = clamp(previous.stockIndex + riskAppetite * 2.8 + liquidityDelta * 8 - baseRate * 18 - badDebtRate * 10, 1800, 5600);
  const bondYield = clamp(baseRate + previous.inflation * 0.18 + badDebtRate * 0.08, 1, 9);
  const volatility = clamp(previous.volatility + badDebtRate * 0.65 + Math.max(0, 45 - riskAppetite) * 0.08 - liquidityDelta * 0.25, 8, 45);

  return {
    stockIndex: Math.round(stockIndex),
    bondYield: round1(bondYield),
    riskAppetite: round1(riskAppetite),
    volatility: round1(volatility),
  };
}
