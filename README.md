# TripVault

A full-stack travel management web application built using **React, Node.js, Express, MongoDB, and Cloudinary**.

## ✨ Features

- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected dashboard
- Create, view, edit and delete trips
- Trip ownership protection
- Delete confirmation
- Empty state for users with no trips
- Responsive travel-themed UI
- 📸 Upload trip photos using Cloudinary
- 🖼️ Trip cover images and photo galleries
- 👤 Public user profiles with username and bio
- 🌍 Public profiles accessible without login
- 🔐 Safe public API responses without email or password
- ✏️ Edit username and bio from the dashboard

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Axios, React Icons, CSS

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt.js

**Cloud Storage:** Cloudinary, Multer, multer-storage-cloudinary

## 📁 Project Structure

```text
TripVault/
├── client/          # React frontend
├── server/          # Node.js + Express backend
└── README.md

🌐 Trip API
Method	Endpoint	Description
POST	/api/trips	Create trip
GET	/api/trips	Get user's trips
GET	/api/trips/:id	Get single trip
PUT	/api/trips/:id	Update trip
DELETE	/api/trips/:id	Delete trip
POST	/api/trips/:id/upload	Upload trip photo

All Trip APIs are protected using JWT authentication and verify trip ownership where required.

👤 User & Profile API
Method	Endpoint	Description
GET	/api/users/:username/profile	View public profile
PUT	/api/users/profile	Update username and bio

The public profile API does not require authentication and only exposes safe user information such as name, username, bio, and trips. Email and password are never exposed.

☁️ Cloudinary

TripVault uses Cloudinary for cloud-based image storage.

Uploaded images are stored in Cloudinary and their URLs are saved in MongoDB.

⚙️ Setup
Backend
cd server
npm install
npm start

Create .env:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Never commit .env to GitHub.

Frontend
cd client
npm install
npm run dev

Frontend: http://localhost:5173

Backend: http://localhost:5000

👩‍💻 Author

Uzma Samreen

Computer Science Engineering Student

⭐ If you like the project, consider giving it a star!



Then:


```powershell
git add README.md
git commit -m "Update README with photo uploads and public profiles"
git push origin main

