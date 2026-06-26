import { useEffect, useState } from "react";

function StatsBar({ items = [] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const total = items.length;
  const lost = items.filter((i) => i.status === "lost").length;
  const found = items.filter((i) => i.status === "found").length;
  const resolved = items.filter((i) => i.status === "resolved").length;

  const stats = [
    { icon: "📊", number: total, label: "Total Items", color: "var(--accent-2)" },
    { icon: "🔴", number: lost, label: "Lost", color: "var(--status-lost)" },
    { icon: "🟢", number: found, label: "Found", color: "var(--status-found)" },
    { icon: "✅", number: resolved, label: "Resolved", color: "var(--status-resolved)" },
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-number" style={{ color: stat.color }}>
            {animated ? stat.number : 0}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
