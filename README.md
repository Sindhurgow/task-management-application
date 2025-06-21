# Task Management System

A full-stack **Task Management Application** built using **React** (frontend), **Express.js** (backend), and **SQLite** (database). It allows users to **create, view, update, and delete tasks** with smart status tracking and intuitive UI.

---

# Features

-  View all tasks in a clean, tabular format
-  Add new tasks with title, description, status, and due date
-  Edit existing tasks with live form feedback
-  Delete tasks with instant UI update
-  Smart date handling & optional AI-powered suggestions (extendable)
-  Real-time updates (WebSocket-ready architecture)
-  Backend API with proper CORS configuration

---

#  Tech Stack

| Layer         | Tech                          |
|--------------|-------------------------------|
| Frontend     | React + React Router          |
| Backend      | Express.js + Node.js          |
| Database     | SQLite (File-based)           |
| Styling      | CSS Modules / Custom CSS      |
| API Comm     | Fetch API                     |
| Routing      | `react-router-dom@6+`         |
| ID Generation| `uuid`                        |

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sindhurgow/task-management-system.git
cd task-management-system
```

### 2. Backend Setup
bash
Copy
Edit
cd backend/src
npm install
node index.js

Runs on http://localhost:4000

Creates a tasktable.db SQLite database if it doesn't exist

### 2. Frontend Setup
cd frontend
npm install
npm start

Runs on http://localhost:3000

## Sample API Endpoints

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | `/task`     | Get all tasks     |
| GET    | `/task/:id` | Get task by ID    |
| POST   | `/task`     | Create a new task |
| PUT    | `/task/:id` | Update a task     |
| DELETE | `/task/:id` | Delete a task     |

## Folder Structure 

task-management-system/
├── backend/
│   └── src/
        ├──  index.js              # Express server
    │   └── tasktable.db          # SQLite database file
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home.js
│   │   │   ├── add.js
│   │   │   ├── edit.js
│   │   │   └── editwrap.js
│   │   └── App.js
│   └── public/
└── README.md
