// src/pages/WeeklyProgress.jsx
// Shows a simple bar chart of weekly distance using pure CSS (no chart library needed).

import { useEffect, useState } from "react";
import { api } from "../api";
import { WEEKLY_SUMMARY, PROFILE } from "../data/mockData";
import Card from "../components/Card";

export default function WeeklyProgress() {
  const [weeks, setWeeks] = useState(WEEKLY_SUMMARY);
  const [profile, setProfile] = useState(PROFILE);

  useEffect(() => {
    api.getWeeklySummary().then(setWeeks).catch(() => {});
    api.getProfile().then(setProfile).catch(() => {});
  }, []);

  // Find max distance to scale bars to 100%
  const maxKm = Math.max(...weeks.map((w) => w.distance_km), profile.weekly_target_km);

  // Target line position as a percentage of the chart height
  const targetPercent = (profile.weekly_target_km / maxKm) * 100;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Weekly Progress</h1>
        <p className="page-sub">Target: {profile.weekly_target_km} km/week</p>
      </div>

      {/* ── Bar chart ── */}
      <Card title="Distance per Week" className="chart-card">
        <div className="bar-chart">
          {/* Target line */}
          <div
            className="target-line"
            style={{ bottom: `${targetPercent}%` }}
          >
            <span className="target-label">Target {profile.weekly_target_km}km</span>
          </div>

          {/* Bars */}
          {weeks.map((w) => {
            const barHeight = (w.distance_km / maxKm) * 100;
            const hitTarget = w.distance_km >= profile.weekly_target_km;
            return (
              <div key={w.week} className="bar-col">
                <div className="bar-wrap">
                  <div
                    className={`bar ${hitTarget ? "bar--hit" : "bar--miss"}`}
                    style={{ height: `${barHeight}%` }}
                  >
                    <span className="bar-val">{w.distance_km}</span>
                  </div>
                </div>
                <div className="bar-label">{w.week}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Week-by-week table ── */}
      <Card title="Week Details">
        <table className="data-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Distance</th>
              <th>Sessions</th>
              <th>Avg Pace</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w.week}>
                <td>{w.week}</td>
                <td>{w.distance_km} km</td>
                <td>{w.sessions}</td>
                <td>{w.avg_pace} /100m</td>
                <td>{w.distance_km >= profile.weekly_target_km ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
