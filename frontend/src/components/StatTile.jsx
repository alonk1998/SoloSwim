// src/components/StatTile.jsx
// Displays a single metric (e.g. "Total Distance: 15.2 km")

export default function StatTile({ label, value, unit, icon, color }) {
  return (
    <div className="stat-tile" style={{ "--tile-color": color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">
        {value}
        {unit && <span className="stat-unit">{unit}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
