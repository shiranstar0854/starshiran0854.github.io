import type { EconomyState } from "./types";

export function describeExternalCondition(state: EconomyState) {
  const { housePriceIndex, externalDemand } = state.variables;
  if (housePriceIndex < 45) return "房地产走弱可能压低财富效应和地方财政。";
  if (externalDemand < 45) return "外需偏弱会冲击企业订单。";
  if (housePriceIndex > 62 || externalDemand > 62) return "外部模块对增长形成支撑，但要观察依赖风险。";
  return "房地产和外需处于中性区间。";
}
