// src/data/mockData.js
// This mirrors the backend mock data so the UI works even if backend is offline.
// In production you'd delete this and rely solely on the API.

export const PROFILE = {
  name: "Alex Chen",
  goal: "Improve endurance for open water 5K",
  level: "Intermediate",
  weekly_target_km: 15,
};

export const WORKOUTS = [
  { date: "2025-04-21", distance: 2000, duration: 42, stroke: "Freestyle", pace_per_100m: 2.1 },
  { date: "2025-04-19", distance: 1500, duration: 35, stroke: "Mixed", pace_per_100m: 2.33 },
  { date: "2025-04-17", distance: 2500, duration: 55, stroke: "Freestyle", pace_per_100m: 2.2 },
  { date: "2025-04-15", distance: 1000, duration: 25, stroke: "Backstroke", pace_per_100m: 2.5 },
  { date: "2025-04-13", distance: 3000, duration: 62, stroke: "Freestyle", pace_per_100m: 2.07 },
  { date: "2025-04-10", distance: 1800, duration: 40, stroke: "Mixed", pace_per_100m: 2.22 },
  { date: "2025-04-08", distance: 2200, duration: 48, stroke: "Freestyle", pace_per_100m: 2.18 },
  { date: "2025-04-06", distance: 1200, duration: 30, stroke: "Breaststroke", pace_per_100m: 2.5 },
];

export const WEEKLY_SUMMARY = [
  { week: "Apr 06", distance_km: 3.0, sessions: 2, avg_pace: 2.34 },
  { week: "Apr 13", distance_km: 4.8, sessions: 2, avg_pace: 2.15 },
  { week: "Apr 20", distance_km: 4.0, sessions: 2, avg_pace: 2.22 },
];
