import { Building2, CircleDollarSign, Landmark, LineChart, ScrollText } from "lucide-react";
import type { RoundResult } from "../game/types";

type ResultPanelProps = {
  result: RoundResult;
};

const items = [
  { key: "financing", label: "企业融资变化", icon: Building2 },
  { key: "consumption", label: "居民消费变化", icon: CircleDollarSign },
  { key: "bankingRisk", label: "银行风险变化", icon: Landmark },
  { key: "market", label: "市场价格变化", icon: LineChart },
] as const;

export function ResultPanel({ result }: ResultPanelProps) {
  return (
    <section className="panel result-panel" aria-labelledby="result-title">
      <div className="panel-heading">
        <div>
          <h2 id="result-title">本轮结果</h2>
          <p>{result.title}</p>
        </div>
        <ScrollText size={22} aria-hidden="true" />
      </div>

      <div className="result-list">
        {items.map(({ key, label, icon: Icon }) => (
          <article key={key} className="result-item">
            <Icon size={18} aria-hidden="true" />
            <div>
              <h3>{label}</h3>
              <p>{result[key]}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="summary-box">
        <h3>系统总结</h3>
        <p>{result.summary}</p>
      </div>
    </section>
  );
}
