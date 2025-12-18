# 🚚 LoadMitrra – Smart Truck & Load Management Platform

LoadMitrra is a **MERN-based logistics platform** designed to connect **Suppliers** and **Truck Drivers** efficiently.  
It enables load posting, nearby load discovery, real-time chat, earnings tracking, and route-based logistics management.

---

## 📌 Features

### 👤 Supplier
- Supplier authentication (Signup / Login)
- Create & manage loads
- Define pickup & drop locations
- Set price, vehicle type, and pickup time window
- Chat with interested drivers
- View active & completed loads

### 🚛 Driver
- Driver authentication (Signup / Login)
- Discover nearby loads
- View load details (route, price, weight, vehicle type)
- Accept loads
- Track earnings (daily / weekly / monthly)
- View load history
- Real-time chat with suppliers
- Location-based map view (with permission)

### 🌍 General
- JWT-based authentication
- Role-based access (Supplier / Driver)
- RESTful API
- Responsive UI (Web & Mobile friendly)
- Secure environment variable handling

---

## 🛠 Tech Stack

### Frontend
- React (Create React App)
- React Router DOM
- Axios
- Bootstrap & Google Material Icons
- Leaflet / Google Maps
- React Toastify

### Backend
- Node.js (18 LTS)
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools
- npm
- Git & GitHub
- Postman

---

## 📂 Project Structure
```
LoadMitrra/
│
├── loadmitrra/ # Frontend (React)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── .env
│
├── backend/ # Backend (Node + Express)
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── controllers/
│ ├── server.js
│ └── .env
└── README.md
```


---

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js **v18.x (LTS)**
- MongoDB (Local or Atlas)
- npm
- Git

Check Node version:
```bash
node -v
```
---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository
```
git clone https://github.com/asoleshubham0125/LoadMitrra.git
cd LoadMitrra
```

### 2️⃣ Backend Setup
```
cd backend
npm install
```

### Create .env in backend:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### Start backend:
```
npm start
```

### 3️⃣ Frontend Setup
```
cd ../loadmitrra
npm install
npm start
```
--- 
## 🔐 Environment Variables
### Backend
```
PORT
MONGO_URI
JWT_SECRET
```

### Frontend
- Create .env in loadmitrra/:
  ```
  REACT_APP_API_BASE_URL=http://localhost:5000/api
  ```
---

## 🧪 API Overview

| Method | Endpoint                     | Description        |
|--------|------------------------------|--------------------|
| POST   | /api/auth/login              | Login              |
| POST   | /api/auth/signup             | Signup             |
| POST   | /api/load                    | Create load        |
| GET    | /api/driver/nearby-loads     | Nearby loads       |
| GET    | /api/chat/:loadId            | Chat messages      |

--- 

## 🛡 Security

- JWT authentication
- Role-based authorization
- Password hashing
- Environment variable protection

---

## 📈 Future Enhancements

- Live GPS tracking
- Payment integration
- Push notifications
- Admin dashboard
- Mobile application
- Load bidding system

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---
## 👨‍💻 Author

**Shubham Asole**  
GitHub: https://github.com/asoleshubham0125  
Portfolio: https://shubhamasoleportfolio.vercel.app



