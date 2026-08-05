# tripvault
# TripVault 🚀

A full-stack authentication system built using **React, Node.js, Express, and MongoDB**.

TripVault provides a secure user authentication workflow with registration, login, JWT-based authorization, and a protected dashboard.

## ✨ Features

* User registration
* Secure login authentication
* Password hashing using bcrypt
* JWT-based authentication
* Protected user dashboard
* Persistent login using local storage
* MongoDB Atlas database integration
* REST API architecture
* Responsive React frontend

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt.js
* dotenv

## 📁 Project Structure

```
TripVault/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│
├── server/                 # Express backend
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── index.js
│
└── README.md
```

## 🔐 Authentication Flow

1. User registers with name, email, and password.
2. Password is securely hashed using bcrypt.
3. User credentials are stored in MongoDB.
4. User logs in with valid credentials.
5. Server generates a JWT token.
6. Token is stored in the frontend.
7. Protected routes verify the token before providing access.

## 🌐 API Endpoints

### Register User

```
POST /api/auth/register
```

Request:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

---

### Login User

```
POST /api/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### Get Current User

```
GET /api/auth/me
```

Authentication:

```
Bearer JWT Token
```

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/uzmasamreen29/tripvault.git
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
npm start
```

### Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

Backend will run on:

```
http://localhost:5000
```

## 📸 Screenshots

(Add application screenshots here)

## 🚀 Future Enhancements

* User profile management
* Password reset functionality
* Social login integration
* Trip planning features
* Cloud deployment
* Role-based authentication

## 👩‍💻 Author

**Uzma Samreen**

Computer Science Engineering Student

---

⭐ If you find this project useful, consider giving it a star!
