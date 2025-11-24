# 🌍 TripNest — Airbnb Clone (MERN Stack)

TripNest is a full-stack Airbnb clone built with the **MERN Stack**, featuring secure authentication, listing management, reviews, and Mapbox-powered location mapping.  
A modern, responsive, and aesthetically crafted travel-stay platform inspired by the real Airbnb experience.

---

## ✨ Features

### 🔐 Authentication
- Email + Password Login  
- Google OAuth  
- JWT Authentication using **HTTP-only Cookies**  
- Auto-login on refresh with `/auth/me`  
- Secure Logout

### 🏡 Listings
- Create, Read, Update & Delete properties  
- Upload images  
- Price, country, and description fields  
- Each listing linked to its owner  

### ⭐ Reviews System
- Add reviews with rating & comment  
- Only review author can delete their review  
- Instant UI update without page refresh  

### 🗺️ Mapbox Integration
- Interactive map on each listing page  
- Markers showing property coordinates  
- Geocoding (address → coordinates)  
- Mapbox GL with modern tile styles  

### 🎨 UI/UX
- React + TailwindCSS  
- Airbnb-inspired layout  
- Toast notifications  
- Responsive and smooth  
- Clean modern aesthetic  

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- React Router
- Axios (withCredentials enabled)
- Context API

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Auth (HTTP-only cookies)  
- Bcrypt  
- Mapbox SDK  
- CORS, Cookie-parser  

---

## 📂 Folder Structure
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── api/
│ │ └── App.jsx
│ ├── public/
│ └── index.html
│
└── server/ # Node Backend
├── controllers/
├── models/
├── middleware/
├── helpers/
├── routes/
├── utils/
├── .env
└── server.js


