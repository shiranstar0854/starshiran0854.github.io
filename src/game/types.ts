export type RateDecision = "cut" | "hold" | "raise";
export type LendingDecision = "loose" | "normal" | "strict";
export type LiquidityDecision = "inject" | "hold" | "tighten";

export type PolicyDecision = {
  rate: RateDecision;
  lending: LendingDecision;
  liquidity: LiquidityDecision;
};

export type RiskLevel = "低" | "中" | "高" | "危机";

export type EconomyState = {
  round: number;
  baseRate: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  householdIncome: number;
  householdConsumption: number;
  householdSavings: number;
  householdDebt: number;
  confidence: number;
  corporateRevenue: number;
  corporateDebt: number;
  corporateProfit: number;
  corporateDefaultRisk: number;
  deposits: number;
  loans: number;
  bankCapital: number;
  badDebtRate: number;
  liquidity: number;
  stockIndex: number;
  bondYield: number;
  riskAppetite: number;
  volatility: number;
  creditGrowth: number;
  systemicRisk: RiskLevel;
};

export type RoundResult = {
  title: string;
  financing: string;
  consumption: string;
  bankingRisk: string;
  market: string;
  summary: string;
  deltas: Partial<Record<keyof EconomyState, number>>;
};

export type HistoryPoint = {
  round: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  badDebtRate: number;
  stockIndex: number;
  systemicRisk: RiskLevel;
};
