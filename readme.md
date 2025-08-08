# Task Manager App

A full-stack Task Manager application built with Next.js (React) for the frontend and Node.js + Express + MongoDB for the backend.  
Users can register/login, create, update, and delete tasks. Tasks are associated with authenticated users.

---

## Features

- User authentication with JWT
- Create tasks linked to logged-in users
- Update task status (Pending / Done) via a popover menu
- Delete tasks
- Responsive UI using ShadCN UI components and Tailwind CSS

---

## Tech Stack

- Frontend: Next.js (React), ShadCN UI, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Authentication: JWT

---

## Prerequisites

- Node.js v16 or higher
- MongoDB installed locally or use a cloud MongoDB Atlas cluster

---

## Setup and Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app

# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# JWT secret key used for signing tokens
JWT_SECRET=your_jwt_secret_key

# Port number the backend server will listen on
PORT=5000

# URL for the backend API (used in frontend API calls)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# (Optional) Frontend port if you want to customize
NEXT_PUBLIC_FRONTEND_PORT=3000