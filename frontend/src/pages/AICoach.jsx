// src/pages/AICoach.jsx
// Fetches AI-generated insights from the backend and displays them.

import { useState } from "react";
import { api } from "../api";
import Card from "../components/Card";

// Each insight has an icon, title, and which API key to display
const INSIGHT_CONFIG = [
  {
    key: "performance_summary",
    icon: "📊",
    title: "Performance Summary",
    color: "#0ea5e9",
  },
  {
    key: "weakness",
    icon: "🎯",
    title: "Area to Improve",
    color: "#f59e0b",
  },
  {
    key: "next_workout",
    icon: "🏊",
    title: "Recommended Next Workout",
    color: "#10b981",
  },
];

export default function AICoach() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Called when user clicks "Analyze My Training"
  async function fetchInsights() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAIInsights();
      setInsights(data);
    } catch (e) {
      setError("Could not connect to backend. Make sure the FastAPI server is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">AI Coach</h1>
        <p className="page-sub">Powered by Claude — personalized insights from your data</p>
      </div>

      {/* ── Trigger button ── */}
      {!insights && !loading && (
        <div className="coach-cta">
          <div className="coach-illustration">🤖</div>
          <p className="coach-prompt">
            Ready to analyze your recent workouts and give you personalized advice.
          </p>
          <button className="btn-primary" onClick={fetchInsights}>
            Analyze My Training
          </button>
        </div>
      )}

      {/* ── Loading state ── */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Claude is analyzing your training data…</p>
        </div>
      )}

      {/* ── Error state ── */}
      {error && (
        <Card className="error-card">
          <p className="error-text">⚠️ {error}</p>
          <button className="btn-secondary" onClick={fetchInsights}>
            Try Again
          </button>
        </Card>
      )}

      {/* ── Insight cards ── */}
      {insights && (
        <>
          <div className="insight-list">
            {INSIGHT_CONFIG.map(({ key, icon, title, color }) => (
              <Card key={key} className="insight-card">
                <div className="insight-header" style={{ "--insight-color": color }}>
                  <span className="insight-icon">{icon}</span>
                  <span className="insight-title">{title}</span>
                </div>
                <p className="insight-text">{insights[key]}</p>
              </Card>
            ))}
          </div>
          <button
            className="btn-secondary refresh-btn"
            onClick={fetchInsights}
            disabled={loading}
          >
            🔄 Refresh Analysis
          </button>
        </>
      )}
    </div>
  );
}
