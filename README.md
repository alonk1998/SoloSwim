# 🌊 SoloSwim — MVP

A swimming training app with an AI coaching layer powered by Claude.

---

## Project Structure

```
soloswim/
├── backend/
│   ├── main.py          ← FastAPI app (routes + AI logic)
│   ├── mock_data.py     ← Fake swimmer data (no DB needed)
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx         ← React entry point
        ├── App.jsx          ← App shell + navigation
        ├── api.js           ← All API calls in one place
        ├── index.css        ← All styles
        ├── data/
        │   └── mockData.js  ← Mirror of backend data (fallback)
        ├── components/
        │   ├── Card.jsx
        │   └── StatTile.jsx
        └── pages/
            ├── Dashboard.jsx
            ├── WorkoutLog.jsx
            ├── AICoach.jsx
            └── WeeklyProgress.jsx
```

---

## Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- An **Anthropic API key** (get one at https://console.anthropic.com)

---

## Step 1 — Set up the Backend

```bash
# Go into the backend folder
cd soloswim/backend

# Create a virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set your Anthropic API key
# On Mac/Linux:
export ANTHROPIC_API_KEY="sk-ant-..."
# On Windows:
set ANTHROPIC_API_KEY=sk-ant-...

# Start the server
uvicorn main:app --reload
```

The backend will run at: **http://localhost:8000**

You can test it in your browser:
- http://localhost:8000/profile
- http://localhost:8000/workouts
- http://localhost:8000/weekly-summary
- http://localhost:8000/ai-insights  ← calls Claude API

---

## Step 2 — Set up the Frontend

Open a **new terminal tab/window**:

```bash
cd soloswim/frontend

# Install Node packages
npm install

# Start the dev server
npm run dev
```

The frontend will run at: **http://localhost:5173**

Open that URL in your browser — you should see the SoloSwim dashboard!

---

## How the AI Coaching Works

1. User clicks **"Analyze My Training"** on the AI Coach page
2. React calls `GET /ai-insights` on the FastAPI backend
3. The backend builds a prompt from the mock workout data
4. The prompt is sent to Claude (claude-opus-4-5)
5. Claude returns 3 JSON fields: `performance_summary`, `weakness`, `next_workout`
6. The frontend renders each insight in a styled card

---

## Customizing the Mock Data

Edit `backend/mock_data.py` to change:
- **SWIMMER_PROFILE** — name, goal, level, weekly target
- **WORKOUTS** — add/remove workout entries

The AI insights will automatically reflect your changes.

---

## Common Issues

| Problem | Fix |
|--------|-----|
| `CORS error` in browser | Make sure the FastAPI server is running on port 8000 |
| `anthropic not found` | Run `pip install -r requirements.txt` inside the venv |
| AI Coach shows error | Check that `ANTHROPIC_API_KEY` is set in the backend terminal |
| Frontend shows stale data | It falls back to `mockData.js` if the backend is offline |

---

## Next Steps (after MVP)

- Add a real database (PostgreSQL + SQLAlchemy)
- Add workout entry form so users can log new sessions
- Add user authentication
- Add swim pace goal tracking over time
- Deploy backend to Railway, frontend to Vercel
