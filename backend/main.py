# main.py
# SoloSwim FastAPI backend
# Run with: uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mock_data import WORKOUTS, SWIMMER_PROFILE
import anthropic
import json

app = FastAPI(title="SoloSwim API")

# Allow the React frontend (running on port 5173) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Helper: calculate pace (min per 100m) ───────────────────────────────────
def calc_pace(distance_m: int, duration_min: float) -> float:
    """Returns pace in minutes per 100 meters."""
    if distance_m == 0:
        return 0
    return round((duration_min / distance_m) * 100, 2)


# ─── Route 1: Swimmer profile ─────────────────────────────────────────────────
@app.get("/profile")
def get_profile():
    """Returns the swimmer's basic profile info."""
    return SWIMMER_PROFILE


# ─── Route 2: All workouts ────────────────────────────────────────────────────
@app.get("/workouts")
def get_workouts():
    """Returns all logged workouts, with pace added to each."""
    enriched = []
    for w in WORKOUTS:
        enriched.append({
            **w,
            "pace_per_100m": calc_pace(w["distance"], w["duration"]),
        })
    return enriched


# ─── Route 3: Weekly summary ──────────────────────────────────────────────────
@app.get("/weekly-summary")
def get_weekly_summary():
    """
    Returns stats for the last 4 weeks.
    Groups workouts by week number and calculates totals.
    """
    from datetime import datetime, timedelta

    weeks = {}
    for w in WORKOUTS:
        date = datetime.strptime(w["date"], "%Y-%m-%d")
        # Get the Monday of that week as the week key
        week_start = date - timedelta(days=date.weekday())
        key = week_start.strftime("%b %d")

        if key not in weeks:
            weeks[key] = {"week": key, "distance_km": 0, "sessions": 0, "avg_pace": []}

        weeks[key]["distance_km"] += w["distance"] / 1000
        weeks[key]["sessions"] += 1
        weeks[key]["avg_pace"].append(calc_pace(w["distance"], w["duration"]))

    # Clean up: round values and compute average pace
    result = []
    for week_data in weeks.values():
        avg_pace = round(sum(week_data["avg_pace"]) / len(week_data["avg_pace"]), 2)
        result.append({
            "week": week_data["week"],
            "distance_km": round(week_data["distance_km"], 1),
            "sessions": week_data["sessions"],
            "avg_pace": avg_pace,
        })

    return sorted(result, key=lambda x: x["week"])


# ─── Route 4: AI Coach insights ───────────────────────────────────────────────
@app.get("/ai-insights")
def get_ai_insights():
    """
    Sends workout data to Claude and returns 3 coaching insights:
    1. Performance summary
    2. Weakness / area to improve
    3. Recommended next workout
    """
    # Build a summary of recent workouts to send to Claude
    recent = WORKOUTS[:5]  # Last 5 workouts
    workout_text = "\n".join([
        f"- {w['date']}: {w['distance']}m in {w['duration']} min ({w['stroke']}), "
        f"pace: {calc_pace(w['distance'], w['duration'])} min/100m"
        for w in recent
    ])

    total_km = sum(w["distance"] for w in WORKOUTS) / 1000
    avg_pace = sum(calc_pace(w["distance"], w["duration"]) for w in WORKOUTS) / len(WORKOUTS)

    prompt = f"""You are an expert swimming coach. Analyze this swimmer's recent data and give 3 short, specific, actionable insights.

Swimmer profile:
- Name: {SWIMMER_PROFILE['name']}
- Goal: {SWIMMER_PROFILE['goal']}
- Level: {SWIMMER_PROFILE['level']}
- Weekly target: {SWIMMER_PROFILE['weekly_target_km']} km

Recent workouts:
{workout_text}

Overall stats:
- Total distance logged: {total_km:.1f} km
- Average pace: {avg_pace:.2f} min/100m

Respond ONLY with a JSON object with exactly these 3 keys:
{{
  "performance_summary": "2-3 sentence summary of their current performance level and trends",
  "weakness": "1-2 sentences identifying their main weakness or area to improve",
  "next_workout": "A specific workout recommendation with distance, intervals, and focus area"
}}

Be encouraging but honest. Be specific with numbers. No generic advice."""

    # Call Claude API
    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=600,
        messages=[{"role": "user", "content": prompt}]
    )

    # Parse the JSON response from Claude
    raw = message.content[0].text.strip()
    # Remove markdown code fences if Claude added them
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    insights = json.loads(raw.strip())
    return insights
