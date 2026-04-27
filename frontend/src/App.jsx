// src/App.jsx
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import WorkoutLog from "./pages/WorkoutLog";
import AICoach from "./pages/AICoach";
import WeeklyProgress from "./pages/WeeklyProgress";
import "./index.css";

// Navigation tabs
const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "workouts", label: "Workouts", icon: "📋" },
  { id: "coach", label: "AI Coach", icon: "🤖" },
  { id: "progress", label: "Progress", icon: "📈" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Render the correct page based on active tab
  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":   return <Dashboard />;
      case "workouts":    return <WorkoutLog />;
      case "coach":       return <AICoach />;
      case "progress":    return <WeeklyProgress />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="app">
      {/* ── Top header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-wave">〰</span>
            <span className="logo-text">SoloSwim</span>
          </div>
          <nav className="nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`nav-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="main">{renderPage()}</main>
    </div>
  );
}
