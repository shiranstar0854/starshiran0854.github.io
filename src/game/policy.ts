import type { LendingDecision, LiquidityDecision, RateDecision } from "./types";

export const rateImpact: Record<RateDecision, { label: string; rateDelta: number; credit: number; demand: number }> = {
  cut: { label: "降息", rateDelta: -0.25, credit: 1.4, demand: 1.1 },
  hold: { label: "不变", rateDelta: 0, credit: 0, demand: 0 },
  raise: { label: "加息", rateDelta: 0.25, credit: -1.3, demand: -1 },
};

export const lendingImpact: Record<LendingDecision, { label: string; credit: number; badDebt: number; capital: number }> = {
  loose: { label: "宽松", credit: 1.8, badDebt: 0.28, capital: -0.22 },
  normal: { label: "正常", credit: 0, badDebt: 0, capital: 0 },
  strict: { label: "严格", credit: -1.4, badDebt: -0.16, capital: 0.12 },
};

export const liquidityImpact: Record<LiquidityDecision, { label: string; liquidity: number; market: number; inflation: number }> = {
  inject: { label: "投放", liquidity: 6, market: 70, inflation: 0.18 },
  hold: { label: "不变", liquidity: 0, market: 0, inflation: 0 },
  tighten: { label: "收紧", liquidity: -6, market: -75, inflation: -0.14 },
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function round1(value: number) {
  return Math.round(value * 10) / 10;
}

export function round2(value: number) {
  return Math.round(value * 100) / 100;
}
