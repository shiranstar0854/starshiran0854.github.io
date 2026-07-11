import type { EconomyState } from "./types";

export function describeEnterpriseCondition(state: EconomyState) {
  const { enterpriseOrders, enterpriseProfit, investmentIntent } = state.variables;
  if (enterpriseOrders < 45 && investmentIntent < 45) return "企业订单和投资意愿偏弱。";
  if (enterpriseProfit < 45) return "企业利润承压，扩张意愿有限。";
  if (enterpriseOrders > 62 && investmentIntent > 58) return "企业部门处于扩张区间。";
  return "企业部门处于观察区间。";
}
