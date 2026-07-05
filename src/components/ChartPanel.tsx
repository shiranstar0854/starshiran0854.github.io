import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HistoryPoint } from "../game/types";

type ChartPanelProps = {
  history: HistoryPoint[];
};

export function ChartPanel({ history }: ChartPanelProps) {
  return (
    <section className="chart-section" aria-labelledby="chart-title">
      <div className="chart-heading">
        <div>
          <h2 id="chart-title">历史趋势</h2>
          <p>观察多轮政策如何传导到增长、通胀、坏账和资产价格。</p>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>宏观压力</h3>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={history} margin={{ top: 12, right: 18, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="#d9ded6" strokeDasharray="3 3" />
              <XAxis dataKey="round" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="gdpGrowth" name="GDP" stroke="#167c56" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="inflation" name="通胀" stroke="#c57a18" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="unemployment" name="失业" stroke="#9f3c2f" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>市场与银行</h3>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={history} margin={{ top: 12, right: 18, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="stockFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#167c56" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#167c56" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#d9ded6" strokeDasharray="3 3" />
              <XAxis dataKey="round" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="stockIndex" name="股票指数" stroke="#167c56" fill="url(#stockFill)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="badDebtRate" name="坏账率" stroke="#9f3c2f" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
