# MERN Todo App

A simple Todo application built using the MERN stack.

## Features

- Add todos
- Delete todos
- Mark todos as completed
- Add deadlines to tasks
- Persistent storage using MongoDB
- Full frontend-backend integration

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

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
git clone https://github.com/YOUR_USERNAME/Todo-app-using-MERN.git
```

---

# Backend Setup

## 2. Navigate to Backend Folder

```bash
cd Backend
```

## 3. Install Backend Dependencies

```bash
npm install
```

## 4. Create `.env` File

Inside the `Backend` folder create a `.env` file and add:

```env
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

## 7. Install Frontend Dependencies

```bash
npm install
```

## 8. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```plaintext
http://localhost:5173
```

---

# Important Notes

- Make sure backend server is running before starting frontend.
- MongoDB Atlas is used for database storage.
- `.env` file is not included for security reasons.
