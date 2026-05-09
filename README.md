# MERN Productivity Dashboard

A modern full-stack productivity application built using the MERN stack with task management, deadlines, categories, priority tracking, and a custom focus session timer.

---

# Note

This project currently does not include user authentication.

All tasks and focus sessions are stored in a shared database, meaning anyone with access to the deployed website can view, add, edit, or delete data.

Please use the application responsibly and avoid misusing or intentionally modifying other users' data.

# Live Demo 

## Frontend
https://todo-app-frontend-95m2.onrender.com

## Backend API
-https://todo-app-backend-pl9e.onrender.com/todos
-https://todo-app-backend-pl9e.onrender.com/settings
-https://todo-app-backend-pl9e.onrender.com/focus-sessions

---

# Features

## Task Management
- Add tasks
- Delete tasks
- Mark tasks as completed
- Add task descriptions
- Add task deadlines
- Task categories
- Priority levels (High, Medium, Low)
- Search and filter tasks
- Progress tracking

## Focus Session Timer
- Custom HH:MM:SS timer
- Start, pause, and reset functionality
- Focus session history
- Persistent session storage using MongoDB
- Delete saved sessions

## Backend Features
- REST API integration
- MongoDB database storage
- Persistent task/session data
- Full frontend-backend integration

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- Framer Motion
- Tailwind CSS
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Project Structure

```plaintext
todo-app/
│
├── Frontend/
│
└── Backend/
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/PRovokedCode/Todo-app-using-MERN.git
```

---

# Backend Setup

## 2. Navigate to Backend Folder

```bash
cd Backend
```

---

## 3. Install Backend Dependencies

```bash
npm install
```

---

## 4. Create `.env` File

Inside the `Backend` folder create a `.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoDB
```

---

## 5. Start Backend Server

```bash
npm run dev
```

Backend will run on:

```plaintext
http://localhost:5000
```

---

# Frontend Setup

## 6. Open New Terminal

Navigate to frontend folder:

```bash
cd Frontend
```

---

## 7. Install Frontend Dependencies

```bash
npm install
```

---

## 8. Create `.env` File

Inside the `Frontend` folder create a `.env` file and add:

```env
VITE_API_URL=http://localhost:5000
```

---

## 9. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```plaintext
http://localhost:5173
```

---

# Deployment

## Frontend Deployment
- Render Static Site

## Backend Deployment
- Render Web Service

## Database
- MongoDB Atlas

---

# Environment Variables

## Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Frontend

```env
VITE_API_URL=http://localhost:5000
```

---

# Important Notes

- Make sure backend server is running before starting frontend.
- MongoDB Atlas is used for database storage.
- `.env` files are not included for security reasons.
- Render free tier may take a few seconds to wake up after inactivity.
