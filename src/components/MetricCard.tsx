import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "good" | "warn" | "danger" | "neutral";
  icon: ReactNode;
};

export function MetricCard({ label, value, helper, tone = "neutral", icon }: MetricCardProps) {
  return (
    <article className={`metric metric-${tone}`}>
      <div className="metric-icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{helper}</span>
      </div>
    </article>
  );
}
