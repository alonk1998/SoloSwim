// src/components/Card.jsx
// A simple reusable card wrapper used across all pages.

export default function Card({ title, subtitle, children, accent, className = "" }) {
  return (
    <div className={`card ${accent ? "card--accent" : ""} ${className}`}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
