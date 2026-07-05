import { calculateBanking } from "./banking";
import { calculateEconomy } from "./economy";
import { calculateMarket } from "./market";
import { clamp, lendingImpact, liquidityImpact, rateImpact, round1, round2 } from "./policy";
import type { EconomyState, HistoryPoint, PolicyDecision, RiskLevel, RoundResult } from "./types";

function riskLevel(score: number): RiskLevel {
  if (score >= 78) return "危机";
  if (score >= 58) return "高";
  if (score >= 35) return "中";
  return "低";
}

function riskScore(state: EconomyState) {
  return clamp(
    state.badDebtRate * 6 + state.inflation * 4.2 + state.unemployment * 3.2 + state.volatility * 1.1 - state.bankCapital * 1.4,
    0,
    100,
  );
}

function describeDelta(value: number, unit: string) {
  if (value > 0) return `上升 ${round1(value)}${unit}`;
  if (value < 0) return `下降 ${Math.abs(round1(value))}${unit}`;
  return "基本不变";
}

function buildResult(previous: EconomyState, next: EconomyState, decision: PolicyDecision): RoundResult {
  const rate = rateImpact[decision.rate];
  const lending = lendingImpact[decision.lending];
  const liquidity = liquidityImpact[decision.liquidity];
  const gdpDelta = next.gdpGrowth - previous.gdpGrowth;
  const consumptionDelta = next.householdConsumption - previous.householdConsumption;
  const badDebtDelta = next.badDebtRate - previous.badDebtRate;
  const stockDelta = next.stockIndex - previous.stockIndex;

  return {
    title: `第 ${next.round} 轮：${rate.label} / 放贷${lending.label} / 流动性${liquidity.label}`,
    financing: `信用增速为 ${next.creditGrowth.toFixed(1)}%，企业债务 ${describeDelta(
      next.corporateDebt - previous.corporateDebt,
      "",
    )}，利润率随融资环境调整。`,
    consumption: `居民消费 ${describeDelta(consumptionDelta, "")}，信心指数为 ${next.confidence.toFixed(1)}。`,
    bankingRisk: `银行坏账率 ${describeDelta(badDebtDelta, " 个百分点")}，资本缓冲为 ${next.bankCapital.toFixed(1)}。`,
    market: `股票指数 ${describeDelta(stockDelta, " 点")}，债券收益率为 ${next.bondYield.toFixed(1)}%。`,
    summary:
      next.systemicRisk === "危机"
        ? "系统进入危机区间：坏账、通胀或失业压力已经形成明显传导。"
        : next.systemicRisk === "高"
          ? "系统风险偏高：短期增长和金融稳定之间的矛盾开始显现。"
          : next.systemicRisk === "低"
            ? "系统较稳：增长、通胀和银行风险处于可控范围。"
            : "系统处于中性区间：继续观察信用扩张和通胀变化。",
    deltas: {
      gdpGrowth: round1(gdpDelta),
      inflation: round1(next.inflation - previous.inflation),
      unemployment: round1(next.unemployment - previous.unemployment),
      badDebtRate: round1(badDebtDelta),
      stockIndex: Math.round(stockDelta),
    },
  };
}

export function simulateRound(previous: EconomyState, decision: PolicyDecision): { state: EconomyState; result: RoundResult } {
  const rate = rateImpact[decision.rate];
  const lending = lendingImpact[decision.lending];
  const liquidity = liquidityImpact[decision.liquidity];
  const baseRate = round2(clamp(previous.baseRate + rate.rateDelta, 1, 8));
  const creditGrowth = clamp(previous.creditGrowth + rate.credit + lending.credit - previous.badDebtRate * 0.08, -4, 15);
  const economy = calculateEconomy(previous, creditGrowth, liquidity.liquidity, rate.demand);

  const corporateRevenue = clamp(previous.corporateRevenue + economy.gdpGrowth * 0.9 + creditGrowth * 0.42, 80, 190);
  const corporateDebt = clamp(previous.corporateDebt + Math.max(0, creditGrowth) * 0.75 - baseRate * 0.12, 45, 140);
  const corporateProfit = clamp(corporateRevenue * 0.105 - corporateDebt * 0.025 - baseRate * 0.35, -8, 26);
  const corporateDefaultRisk = clamp(previous.corporateDefaultRisk + Math.max(0, -corporateProfit) * 0.4 + corporateDebt * 0.018 - economy.gdpGrowth * 0.18, 1, 18);

  const banking = calculateBanking(
    { ...previous, corporateDefaultRisk: round1(corporateDefaultRisk) },
    creditGrowth,
    lending.badDebt,
    lending.capital,
  );
  const market = calculateMarket(previous, economy.gdpGrowth, liquidity.liquidity, baseRate, banking.badDebtRate);

  const nextDraft: EconomyState = {
    ...previous,
    ...economy,
    ...banking,
    ...market,
    round: previous.round + 1,
    baseRate,
    liquidity: round1(clamp(banking.liquidity + liquidity.liquidity, 10, 100)),
    creditGrowth: round1(creditGrowth),
    corporateRevenue: round1(corporateRevenue),
    corporateDebt: round1(corporateDebt),
    corporateProfit: round1(corporateProfit),
    corporateDefaultRisk: round1(corporateDefaultRisk),
    systemicRisk: "中",
  };
  const state = { ...nextDraft, systemicRisk: riskLevel(riskScore(nextDraft)) };

  return {
    state,
    result: buildResult(previous, state, decision),
  };
}

export function toHistoryPoint(state: EconomyState): HistoryPoint {
  return {
    round: state.round,
    gdpGrowth: state.gdpGrowth,
    inflation: state.inflation,
    unemployment: state.unemployment,
    badDebtRate: state.badDebtRate,
    stockIndex: state.stockIndex,
    systemicRisk: state.systemicRisk,
  };
}
