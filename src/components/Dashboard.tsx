import { Activity, Banknote, BriefcaseBusiness, ChartNoAxesCombined, ShieldAlert, TrendingUp } from "lucide-react";
import type { EconomyState } from "../game/types";
import { MetricCard } from "./MetricCard";

type DashboardProps = {
  state: EconomyState;
};

function riskTone(risk: EconomyState["systemicRisk"]) {
  if (risk === "危机") return "danger";
  if (risk === "高") return "danger";
  if (risk === "中") return "warn";
  return "good";
}

export function Dashboard({ state }: DashboardProps) {
  return (
    <section className="panel economy-panel" aria-labelledby="economy-title">
      <div className="panel-heading">
        <div>
          <h2 id="economy-title">当前经济状态</h2>
          <p>第 {state.round} 轮</p>
        </div>
        <span className={`risk-chip risk-${state.systemicRisk}`}>{state.systemicRisk}</span>
      </div>

      <div className="metric-grid">
        <MetricCard
          label="GDP 增长率"
          value={`${state.gdpGrowth.toFixed(1)}%`}
          helper="产出与投资"
          tone={state.gdpGrowth >= 4 ? "good" : state.gdpGrowth < 1 ? "danger" : "neutral"}
          icon={<TrendingUp size={18} />}
        />
        <MetricCard
          label="通胀率"
          value={`${state.inflation.toFixed(1)}%`}
          helper="价格压力"
          tone={state.inflation > 4 ? "danger" : state.inflation > 3 ? "warn" : "good"}
          icon={<Activity size={18} />}
        />
        <MetricCard
          label="失业率"
          value={`${state.unemployment.toFixed(1)}%`}
          helper="就业压力"
          tone={state.unemployment > 7 ? "danger" : state.unemployment > 5.5 ? "warn" : "good"}
          icon={<BriefcaseBusiness size={18} />}
        />
        <MetricCard
          label="银行坏账率"
          value={`${state.badDebtRate.toFixed(1)}%`}
          helper="资产质量"
          tone={state.badDebtRate > 6 ? "danger" : state.badDebtRate > 3.5 ? "warn" : "good"}
          icon={<Banknote size={18} />}
        />
        <MetricCard
          label="股票指数"
          value={state.stockIndex.toLocaleString("zh-CN")}
          helper="资产价格"
          tone={state.stockIndex > 3400 ? "good" : state.stockIndex < 2800 ? "danger" : "neutral"}
          icon={<ChartNoAxesCombined size={18} />}
        />
        <MetricCard
          label="系统风险"
          value={state.systemicRisk}
          helper="综合压力"
          tone={riskTone(state.systemicRisk)}
          icon={<ShieldAlert size={18} />}
        />
      </div>
    </section>
  );
}
