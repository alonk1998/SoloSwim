// src/pages/Dashboard.jsx
// Home screen: greeting, quick stats, recent workout

import { useEffect, useState } from "react";
import { api } from "../api";
import { WORKOUTS, PROFILE } from "../data/mockData";
import StatTile from "../components/StatTile";
import Card from "../components/Card";

export default function Dashboard() {
  const [profile, setProfile] = useState(PROFILE);
  const [workouts, setWorkouts] = useState(WORKOUTS);

  // Try to fetch from real API; fall back to mock data silently
  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {});
    api.getWorkouts().then(setWorkouts).catch(() => {});
  }, []);

  // Compute quick stats from workout list
  const totalKm = (workouts.reduce((s, w) => s + w.distance, 0) / 1000).toFixed(1);
  const sessions = workouts.length;
  const avgPace = (
    workouts.reduce((s, w) => s + w.pace_per_100m, 0) / workouts.length
  ).toFixed(2);
  const lastWorkout = workouts[0]; // Most recent

  return (
    <div className="page">
      {/* ── Greeting banner ── */}
      <div className="hero">
        <div className="hero-wave">〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰</div>
        <h1 className="hero-title">Welcome back, {profile.name.split(" ")[0]} 👋</h1>
        <p className="hero-sub">Goal: {profile.goal}</p>
        <div className="hero-badge">{profile.level}</div>
      </div>

      {/* ── Quick stats ── */}
      <section className="section">
        <h2 className="section-title">Your Stats</h2>
        <div className="stat-grid">
          <StatTile icon="🏊" label="Total Distance" value={totalKm} unit="km" color="#0ea5e9" />
          <StatTile icon="📅" label="Sessions" value={sessions} color="#8b5cf6" />
          <StatTile icon="⚡" label="Avg Pace" value={avgPace} unit=" /100m" color="#10b981" />
          <StatTile icon="🎯" label="Weekly Target" value={profile.weekly_target_km} unit="km" color="#f59e0b" />
        </div>
      </section>

      {/* ── Last workout ── */}
      <section className="section">
        <h2 className="section-title">Last Workout</h2>
        {lastWorkout && (
          <Card>
            <div className="workout-row">
              <div>
                <div className="workout-date">{lastWorkout.date}</div>
                <div className="workout-stroke">{lastWorkout.stroke}</div>
              </div>
              <div className="workout-meta">
                <span className="workout-stat">{(lastWorkout.distance / 1000).toFixed(1)} km</span>
                <span className="workout-dot">·</span>
                <span className="workout-stat">{lastWorkout.duration} min</span>
                <span className="workout-dot">·</span>
                <span className="workout-stat pace">{lastWorkout.pace_per_100m} /100m</span>
              </div>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
