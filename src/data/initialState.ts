import type { EconomyState, HistoryPoint, PolicyDecision, RoundResult } from "../game/types";

export const initialDecision: PolicyDecision = {
  rate: "hold",
  lending: "normal",
  liquidity: "hold",
};

export const initialState: EconomyState = {
  round: 1,
  baseRate: 3.5,
  gdpGrowth: 4.2,
  inflation: 2.4,
  unemployment: 5.1,
  householdIncome: 100,
  householdConsumption: 68,
  householdSavings: 32,
  householdDebt: 42,
  confidence: 64,
  corporateRevenue: 120,
  corporateDebt: 78,
  corporateProfit: 12.5,
  corporateDefaultRisk: 3.8,
  deposits: 160,
  loans: 138,
  bankCapital: 18,
  badDebtRate: 2.6,
  liquidity: 55,
  stockIndex: 3200,
  bondYield: 3.1,
  riskAppetite: 58,
  volatility: 16,
  creditGrowth: 6.2,
  systemicRisk: "中",
};

export const initialResult: RoundResult = {
  title: "第 1 轮基准状态",
  financing: "企业融资环境处于中性区间，贷款扩张速度温和。",
  consumption: "居民收入和信心支撑消费，但债务水平已经需要观察。",
  bankingRisk: "银行坏账率可控，资本缓冲仍能吸收常规损失。",
  market: "股票指数与风险偏好处于平衡状态，债券收益率接近基准利率。",
  summary: "当前系统没有明显危机，但任何连续宽松或连续收紧都会改变风险结构。",
  deltas: {},
};

export const initialHistory: HistoryPoint[] = [
  {
    round: initialState.round,
    gdpGrowth: initialState.gdpGrowth,
    inflation: initialState.inflation,
    unemployment: initialState.unemployment,
    badDebtRate: initialState.badDebtRate,
    stockIndex: initialState.stockIndex,
    systemicRisk: initialState.systemicRisk,
  },
];
