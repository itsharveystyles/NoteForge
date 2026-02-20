import React from "react";

const StatsCard = ({ label, value, icon: Icon, accent }) => {
  return (
    <div className="card-dark p-4 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent ? "var(--accent-muted)" : "var(--bg-tertiary)" }}
      >
        {Icon && (
          <Icon
            className="w-6 h-6"
            style={{ color: accent ? "var(--accent)" : "var(--text-secondary)" }}
          />
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
