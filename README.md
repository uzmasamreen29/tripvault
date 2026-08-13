# ✈️ TripVault

A full-stack travel management web application built using **React, Node.js, Express, and MongoDB**.

## ✨ Features

* User registration and login
* JWT-based authentication
* Secure password hashing with bcrypt
* Protected dashboard
* Create, view, edit and delete trips
* Trip ownership protection
* Delete confirmation
* Empty state for users with no trips
* Responsive travel-themed UI

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Axios, React Icons, CSS

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt.js

## 📁 Project Structure

```text
TripVault/
├── client/          # React frontend
├── server/          # Node.js + Express backend
└── README.md
```

## 🌐 Trip API

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | `/api/trips`     | Create trip      |
| GET    | `/api/trips`     | Get user's trips |
| GET    | `/api/trips/:id` | Get single trip  |
| PUT    | `/api/trips/:id` | Update trip      |
| DELETE | `/api/trips/:id` | Delete trip      |

All Trip APIs are protected using JWT authentication and verify trip ownership where required.

## ⚙️ Setup

### Backend

```bash
cd server
npm install
npm start
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## 👩‍💻 Author

**Uzma Samreen**

Computer Science Engineering Student

---

⭐ If you like the project, consider giving it a star!
