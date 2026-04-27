// src/api.js
// All API calls go through this file. Easy to swap base URL later.

const BASE = "http://localhost:8000";

// Generic fetch helper with error handling
async function fetchJSON(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  getProfile: () => fetchJSON("/profile"),
  getWorkouts: () => fetchJSON("/workouts"),
  getWeeklySummary: () => fetchJSON("/weekly-summary"),
  getAIInsights: () => fetchJSON("/ai-insights"),
};
