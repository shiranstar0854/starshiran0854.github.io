import { clamp, round1 } from "./policy";
import type { EconomyState } from "./types";

export function calculateBanking(previous: EconomyState, creditGrowth: number, policyBadDebt: number, capitalImpact: number) {
  const loans = clamp(previous.loans + creditGrowth * 1.65, 90, 230);
  const deposits = clamp(previous.deposits + previous.householdSavings * 0.08 - Math.max(0, creditGrowth) * 0.25, 120, 220);
  const badDebtRate = clamp(
    previous.badDebtRate + policyBadDebt + Math.max(0, creditGrowth - 7) * 0.08 + previous.corporateDefaultRisk * 0.035,
    0.8,
    12,
  );
  const bankCapital = clamp(previous.bankCapital + capitalImpact + loans * 0.006 - badDebtRate * 0.16, 6, 28);
  const liquidity = clamp(previous.liquidity + deposits * 0.025 - loans * 0.014 - badDebtRate * 0.22, 15, 95);

  return {
    loans: round1(loans),
    deposits: round1(deposits),
    badDebtRate: round1(badDebtRate),
    bankCapital: round1(bankCapital),
    liquidity: round1(liquidity),
  };
}
