# mock_data.py
# This file contains fake swimmer data so we don't need a real database yet.

SWIMMER_PROFILE = {
    "name": "Alex Chen",
    "goal": "Improve endurance for open water 5K",
    "level": "Intermediate",
    "weekly_target_km": 15,
}

# Each workout has: date, distance (meters), duration (minutes), stroke style
WORKOUTS = [
    {"date": "2025-04-21", "distance": 2000, "duration": 42, "stroke": "Freestyle"},
    {"date": "2025-04-19", "distance": 1500, "duration": 35, "stroke": "Mixed"},
    {"date": "2025-04-17", "distance": 2500, "duration": 55, "stroke": "Freestyle"},
    {"date": "2025-04-15", "distance": 1000, "duration": 25, "stroke": "Backstroke"},
    {"date": "2025-04-13", "distance": 3000, "duration": 62, "stroke": "Freestyle"},
    {"date": "2025-04-10", "distance": 1800, "duration": 40, "stroke": "Mixed"},
    {"date": "2025-04-08", "distance": 2200, "duration": 48, "stroke": "Freestyle"},
    {"date": "2025-04-06", "distance": 1200, "duration": 30, "stroke": "Breaststroke"},
]
