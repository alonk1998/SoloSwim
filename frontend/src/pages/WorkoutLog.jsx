// src/pages/WorkoutLog.jsx
// Shows all logged workouts in a clean list.

import { useEffect, useState } from "react";
import { api } from "../api";
import { WORKOUTS } from "../data/mockData";
import Card from "../components/Card";

// Color per stroke type
const STROKE_COLOR = {
  Freestyle:   "#0ea5e9",
  Backstroke:  "#8b5cf6",
  Breaststroke:"#f59e0b",
  Mixed:       "#10b981",
};

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState(WORKOUTS);

  useEffect(() => {
    api.getWorkouts().then(setWorkouts).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Workout Log</h1>
        <p className="page-sub">{workouts.length} sessions recorded</p>
      </div>

      <div className="workout-list">
        {workouts.map((w, i) => (
          <Card key={i} className="workout-card">
            <div className="wl-row">
              {/* Left: stroke badge + date */}
              <div className="wl-left">
                <span
                  className="stroke-badge"
                  style={{ background: STROKE_COLOR[w.stroke] || "#64748b" }}
                >
                  {w.stroke}
                </span>
                <span className="wl-date">{w.date}</span>
              </div>

              {/* Right: metrics */}
              <div className="wl-metrics">
                <div className="wl-metric">
                  <div className="wl-val">{(w.distance / 1000).toFixed(1)}</div>
                  <div className="wl-key">km</div>
                </div>
                <div className="wl-divider" />
                <div className="wl-metric">
                  <div className="wl-val">{w.duration}</div>
                  <div className="wl-key">min</div>
                </div>
                <div className="wl-divider" />
                <div className="wl-metric">
                  <div className="wl-val">{w.pace_per_100m}</div>
                  <div className="wl-key">/100m</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
