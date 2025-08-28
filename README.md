# Carbon Sustainability Actions App

A full-stack web application built with Django and React (Vite) for managing sustainability actions.  
Data is stored in a JSON file instead of a traditional database, per project requirements.

---

## Tech Stack

- Backend: Django, Django REST Framework
- Frontend: React, Vite, Axios, Tailwind CSS
- Data Storage: JSON file (actions.json)

---

## Getting Started

### 1. Backend (Django API)

1. Navigate to the backend folder:

cd backend/

2. Install dependencies (if any):

pip install -r requirements.txt

3. Run the server:

python manage.py runserver
or
python3 manage.py runserver

- The API will be available at http://127.0.0.1:8000/.

---

### 2. Frontend (React + Vite)

1. Navigate to the frontend folder:

cd frontend/

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

- The frontend will be available at http://localhost:5173/ (default Vite port).

---

## Features

- View all actions
- Add new action (action name, date, points)
- Update existing actions via inline editing
- Delete actions
- Persist data in actions.json

---

## API Endpoints

| Method | URL                  | Description                        |
|--------|--------------------|------------------------------------|
| GET    | /api/actions/       | Retrieve all sustainability actions |
| POST   | /api/actions/       | Add a new action                   |
| PUT    | /api/actions/<id>/  | Replace an existing action         |
| PATCH  | /api/actions/<id>/  | Update specific fields of an action|
| DELETE | /api/actions/<id>/  | Delete an action                   |

**POST / PATCH Payload Example:**

{
  "action": "Recycling",
  "date": "2025-01-08",
  "points": 25
}

---

## Notes

- The database is JSON-based, located at actions.json.
- Tailwind CSS is used for responsive and modern styling in the frontend.
- Axios handles API requests between React and Django.

---

## Author

- Built by Frank


